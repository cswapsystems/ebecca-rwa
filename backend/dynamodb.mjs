import { 
    DynamoDBClient 
} from '@aws-sdk/client-dynamodb';
import { 
    DynamoDBDocumentClient, 
    ScanCommand,
    PutCommand, 
    GetCommand,
    UpdateCommand 
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export async function findPendingJobs() {
    const input = {
        TableName: 'EbeccaMintJob',
        FilterExpression: '#s = :s',
        ExpressionAttributeNames: {
            "#s": "Status",
        },
        ExpressionAttributeValues: {
            ':s': 'Pending',
        },
    }
    const command = new ScanCommand(input);
    const response = await docClient.send(command);
    return response.Items;
}

export async function updateJob(jobId, status, policyId, txHash) {
    const input = {
        TableName: 'EbeccaMintJob',
        Key: {
            JobId: jobId,
        },
        UpdateExpression: 'SET #s = :s, #p = :p, #t = :t',
        ExpressionAttributeNames: {
            '#s': 'Status',
            '#p': 'PolicyId',
            '#t': 'TxHash',
        },
        ExpressionAttributeValues: {
            ':s': status,
            ':p': policyId,
            ':t': txHash,
        },
    }
    const command = new UpdateCommand(input);
    const response = await docClient.send(command);
    return response.Items;
}

export async function insertJob(data) {
    const input = {
        TableName: 'EbeccaMintJob',
        Item: data,
    }
    const command = new PutCommand(input);
    const response = await docClient.send(command);
    return response;
}

export async function getJob(jobId) {
    const input = {
        TableName: 'EbeccaMintJob',
        Key: {
            JobId: jobId,
        }
    }
    const command = new GetCommand(input);
    const response = await docClient.send(command);
    return response.Item;
}
