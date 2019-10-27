import json
import aws
import boto3

# logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# executes upon API event
def lambda_handler(event, context):
   # get the stringified json body
    body = event.get('body')
    
    # deserialize back into a json object
    body = json.loads(body)
    
    # get the file name and base64 encoded image from the body
    filename = str(body['filename'])+'.jpeg'
    response = json.loads(body['response'])
    
    # save the response and filename in the db
    boto3.client('lambda').invoke(
        FunctionName: 'SQLCommunicate',
        Payload: json.dumps({ 'event': event, 'filename': filename, 'response': response, 'verb': 'PUT' })
    )
    
    # send the response back through the gateway
    return {
        'statusCode': 200,
        'body': 'success'
    }