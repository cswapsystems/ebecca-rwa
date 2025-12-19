import {
    Lucid,
    Blockfrost,
    scriptFromNative,
    getAddressDetails,
    mintingPolicyToId,
    fromText,
} from "@lucid-evolution/lucid";
import { 
    findPendingJobs, 
    updateJob
} from "./dynamodb.mjs";
import { updateAsset } from "./appsync-dynamodb.mjs";

const lucid = await Lucid(
    new Blockfrost(process.env.BLOCKFROST_URL, process.env.BLOCKFROST_PROJECT_ID),
    process.env.NETWORK);

/**
 * Lambda which checks for pending mint jobs and mints the assets.
 * @param {*} event 
 */
export async function mintApprovedAssets(event) {
    let pendingJobs = await findPendingJobs();
    for (let job of pendingJobs) {
        console.log(job);

        // Sign Key is tied to the Job
        lucid.selectWallet.fromPrivateKey(job.SignKey);
        let address = await lucid.wallet().address();
        let addressDetails = getAddressDetails(address);

        // Native Script Minting for the Base RWA Asset
        const mintingScript = scriptFromNative({
            type: "all",
            scripts: [
                { type: "sig", keyHash: addressDetails.paymentCredential.hash }
            ]
        });

        const policyId = mintingPolicyToId(mintingScript);

        // switch to minter wallet (w/ fees)
        // Fees will be charged to the minter
        lucid.selectWallet.fromPrivateKey(process.env.SIGN_KEY);

        const assetNameHext = fromText(job.AssetName);

        const metadata721 = {
            [policyId]: {
                [assetNameHext]: {
                    name: job.AssetName,
                    image: getMetadata(job.Metadata, "image"),
                    mediaType: getMetadata(job.Metadata, "mediaType"),
                    description: getMetadata(job.Metadata, "description"),
                    files: getFiles(job.Files),
                    attributes: getAttributes(job.Metadata)
                },
            },
            version: 2,
        };

        let assetName = fromText(job.AssetName);

        const tx = await lucid
            .newTx()
            .mintAssets({
                [policyId + assetName]: 1n,
            })
            .attachMetadata(721, metadata721)
            .validTo(Date.now() + 900000)
            .attach.MintingPolicy(mintingScript)
            .complete();

        const signed = await tx
            .sign.withWallet()
            .sign.withPrivateKey(job.SignKey)
            .complete();

        const txHash = await signed.submit();

        console.log(`txHash = ${txHash}`);

        // Update the off-chain tables

        await updateJob(job.JobId, 'Minted', policyId, txHash);

        await updateAsset(job.AssetId, policyId, assetName, 'Success', txHash, `Minted on ${new Date().toISOString()}.`);
    }
}

function getFiles(filesArray) {
    let files = [];
    for (let f of filesArray) {
        let chunks = splitToChunks64(f.src);
        chunks = (chunks.length == 1) ? chunks[0] : chunks;
        files.push({
            mediaType: f.mediaType,
            name: f.name,
            src: splitToChunks64(f.src),
        });
    }
    return files;
}

function getAttributes(metadataArray) {
    let attributes = {};
    let excluded = [ "image", "description", "mediaType" ];
    for (let a of metadataArray) {
        if (excluded.includes(a.k)) continue;
        let chunks = splitToChunks64(a.v);
        chunks = (chunks.length == 1) ? chunks[0] : chunks;
        attributes[a.k] = chunks;
    }
    return attributes;
}

function getMetadata(metadataArray, key) {
    let metadata = metadataArray.find(item => item.k == key);
    if (metadata) {
        let chunks = splitToChunks64(metadata.v);
        return (chunks.length == 1) ? chunks[0] : chunks;
    }
    return "";
}

function splitToChunks64(str) {
  const maxLen = 64;
  const chunks = [];

  for (let i = 0; i < str.length; i += maxLen) {
    chunks.push(str.slice(i, i + maxLen));
  }

  return chunks;
}
