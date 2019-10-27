import boto3
import asyncio

# calls the rekognition api to run analysis on an image in our s3 bucket
def sendRekognition(bucketname, imagename):
 
    # get the rekognition client from the aws sdk
    rekognition = boto3.client('rekognition')

    # calls rekognition to detect labels on the corresponding image in s3
    response = rekognition.detect_labels(Image={'S3Object':{'Bucket':bucketname,'Name':imagename}}, MaxLabels=10)
        
    # send the analysis provided from 
    return response