import {
    Lucid,
    Blockfrost,
    Data,
    fromText,
} from "@lucid-evolution/lucid";
import {
    findPendingJobs,
    updateJob
} from "./dynamodb.mjs";
import { updateAsset } from "./appsync-dynamodb.mjs";
import { buildSttPolicy, SttRedeemer } from "./blueprint.mjs";

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

        lucid.selectWallet.fromPrivateKey(process.env.SIGN_KEY);

        // New implementation - using Plutus (one shot state thread token)

        let walletUtxos = await lucid.wallet().getUtxos();

        let policy = await buildSttPolicy(walletUtxos[0], job.AssetName);

        let policyId = policy.policyId;

        let assetName = fromText(job.AssetName);

        const metadata721 = {
            [policyId]: {
                [job.AssetName]: {
                    name: job.AssetName,
                    image: getMetadata(job.Metadata, "image"),
                    mediaType: getMetadata(job.Metadata, "mediaType"),
                    description: getMetadata(job.Metadata, "description"),
                    files: getFiles(job.Files),
                    attributes: getAttributes(job.Metadata)
                },
            },
            version: 1,
        };

        // for now we will use the minter address
        // but in the production version we should be using the user wallet address
        let address = await lucid.wallet().address();

        const tx = await lucid
            .newTx()
            .collectFrom([walletUtxos[0]])
            .mintAssets({ [policy.unit]: 1n }, Data.to('Mint', SttRedeemer))
            .attachMetadata(721, metadata721)
            .pay.ToAddress(address, { [policy.unit]: 1n })
            .attach.MintingPolicy(policy.policy)
            .complete();

        const signed = await tx.sign.withWallet().complete();
        const txHash = await signed.submit();

        console.log(txHash);

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
    let excluded = ["image", "description", "mediaType"];
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
