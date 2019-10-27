import json
import boto3
import logging

# logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# executes upon API event
def lambda_handler(event, context):
    
    try:
        filename = event['filename']
    except:
        return {
            'statusCode' : 400,
            'body' : 'Invalid parameters, must included filename'
        }
    
    # save the response and filename in the db
    response = boto3.client('lambda').invoke(
        FunctionName: 'SQLCommunicate',
        InvocationType: 'RequestResponse',
        Payload: json.dumps({ 'event': event, 'filename': filename, 'verb': 'GET' })
    )
    
    # send the response back through the gateway
    return {
        'statusCode': 200,
        'body': response
    }