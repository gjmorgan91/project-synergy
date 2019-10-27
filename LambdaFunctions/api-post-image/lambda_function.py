import boto3
import json

# import functions from other files
from upload_s3 import upload
from rekognition import sendRekognition
from format_rekognition import format

# name of the s3 bucket to send images to
bucket='rekognition-image-drop'

def lambda_handler(event, context):
    
    # get the stringified json body
    body = event.get('body')
    
    # deserialize back into a json object
    body = json.loads(body)
    
    # get the file name and base64 encoded image from the body
    filename = str(body['filename'])+'.jpeg'
    img = body['base64']
    
    # call method to decode the image and send to s3
    s3response = upload(bucket, filename, img)
    
    # call rekognition to get the image from the bucket and run an analysis
    rekognitionresponse = sendRekognition(bucket, filename)
    
    # edit the response from rekognition
    formattedresponse = format(rekognitionresponse)
    
    # save the response and filename in the db
    #boto3.client('lambda').invoke(
    #    FunctionName: 'SQLCommunicate',
    #    Payload: json.dumps({ 'event': event, 'filename': filename, 'response': formattedresponse, 'verb': 'POST' })
    #)
    
    # serialize the response object
    formattedresponse = json.dumps(formattedresponse)
    
    # send the response back through the gateway
    return {
        'statusCode': 200,
        'body': formattedresponse
    }