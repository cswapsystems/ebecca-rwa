
import {  
  Constr,
  Data,
  applyParamsToScript,
  applyDoubleCborEncoding,
  mintingPolicyToId,
  fromText,
} from "@lucid-evolution/lucid";
import {
  readFile
} from 'node:fs/promises';

export const SttRedeemer = Data.Enum([
    Data.Literal("Mint"),
    Data.Literal("Burn"),
]);

function findCompiledCode(bp, predicate) {
    const v = bp.validators.find((x) => predicate(x.title));
    if (!v) {
        const titles = bp.validators.map((x) => x.title).join("\n  - ");
        throw new Error(`Validator not found.\nAvailable titles:\n  - ${titles}`);
    }
    return v.compiledCode;
}

/**
 * Converts OutputReference to Plutus Data (script parameter)
 * @param {*} outRef 
 * @returns 
 */
function outRefToPlutusData(outRef) {
    return new Constr(0, [outRef.txHash, BigInt(outRef.outputIndex)]);
}

/**
 * Builds the minting script from plutus.json
 * @param {*} seedRef 
 * @param {*} sttNameText 
 * @returns 
 */
export async function buildSttPolicy(seedRef, sttNameText) {
    const bp = JSON.parse(await readFile('./plutus.json'));

    const compiled = findCompiledCode(bp, (t) => t.includes("stt_one_shot") && t.endsWith(".mint"));

    const applied = applyParamsToScript(compiled, [
        outRefToPlutusData(seedRef),
        fromText(sttNameText),
    ]);

    const script = {
        type: "PlutusV3",
        script: applyDoubleCborEncoding(applied),
    };

    const policyId = mintingPolicyToId(script);

    const unit = policyId + fromText(sttNameText);
    return { policy: script, policyId, unit };
}
