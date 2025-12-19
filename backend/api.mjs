import { getJob, insertJob } from "./dynamodb.mjs";
import { generatePrivateKey } from "@lucid-evolution/lucid";

/**
 * API Gateway Lambda handler for Job submissions
 * @param {*} event 
 * @returns 
 */
export async function submitMintJob(event) {
    const pk = generatePrivateKey();
    if (event.body) {
        console.log(event.body);
        const body = JSON.parse(event.body);
        body['SignKey'] = pk;
        body['Status'] = 'Pending';
        await insertJob(body);

        const response = {
            message: 'Mint job scheduled'
        }
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response)
        };        
    }

    return {
        statusCode: 500,
        headers: {
                'Content-Type': 'application/json',
        },
        body: 'Missing request body'
    }    
}

export async function getMintJob(event) {
    const JobId = event.pathParameters ? event.pathParameters.JobId : null;
    if (!JobId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing JobId in path parameters' }),
        };
    }

    const response = await getJob(JobId);
    if (response) {
        delete response.SignKey;
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response)
        };        
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid JobId' }),
    };
}
