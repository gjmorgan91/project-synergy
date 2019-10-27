import logging
import boto3
import base64

from botocore.exceptions import ClientError

# takes in a base64 encoded image and filename, decodes the images, and stores it in the corresponding bucket
def upload(bucketname, filename, source):
    
    # decodes the image
    source = base64.b64decode(str(source))
    
     # determines that the decoded image is the correct type
    if isinstance(source, bytes):
        object_data = source

    # gets the s3 client from the aws sdk
    s3 = boto3.client('s3')
    try:
        # send the decoded image to the bucket
        response = s3.put_object(Bucket=bucketname, Key=filename, Body=object_data, ContentEncoding='base64', ContentType='image/jpeg', ACL='public-read')
    except ClientError as e:
        # AllAccessDisabled error == bucket not found
        # NoSuchKey or InvalidRequest error == (dest bucket/obj == src bucket/obj)
        logging.error(e)
        return 'not working'
    finally:
        if isinstance(source, str):
            object_data.close()
    # returns the s3 response for confirmation
    return response