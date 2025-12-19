import { 
    DynamoDBClient 
} from '@aws-sdk/client-dynamodb';
import { 
    DynamoDBDocumentClient, 
    UpdateCommand 
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Update the off-chain Asset table
 * @param {*} assetId Asset Identifier
 * @param {*} policyId on-chain policy id
 * @param {*} assetName on-chain asset name
 * @param {*} status minting status
 * @param {*} txHash minting transaction hash
 * @param {*} result minting result
 * @returns 
 */
export async function updateAsset(assetId, policyId, assetName, status, txHash, result) {
    const input = {
        TableName: process.env.ASSET_TABLE,
        Key: {
            id: assetId,
        },
        UpdateExpression: 'SET #policyId = :policyId, #assetName = :assetName, #assetId = :assetId, #mintingStatus = :mintingStatus, #mintingTxHash = :mintingTxHash, #mintingResult = :mintingResult',
        ExpressionAttributeNames: {
            '#policyId': 'assetPolicyId',
            '#assetName': 'assetName',
            '#assetId': 'assetId',
            '#mintingStatus': 'mintingStatus',
            '#mintingTxHash': 'mintingTxHash',
            '#mintingResult': 'mintingResult',
        },
        ExpressionAttributeValues: {
            ':policyId': policyId,
            ':assetName': assetName,
            ':assetId': policyId + assetName,
            ':mintingStatus': status,
            ':mintingTxHash': txHash,
            ':mintingResult': result
        },
    }
    const command = new UpdateCommand(input);
    const response = await docClient.send(command);
    return response;
}
