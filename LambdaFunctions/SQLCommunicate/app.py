import sys
import logging
import rds_config
import pymysql
import json
#rds settings

rds_host  = "image-reko.cdfdfar00d89.us-east-2.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()
    
logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
    
def lambda_handler(event, context):
    with conn.cursor() as cur:
        cur.execute("create table if not exists Images (ImgID INT NOT NULL, Name VARCHAR(255), Response JSON, PRIMARY KEY(ImgID))")
        conn.commit()
        
        try:
            filename = event['filename']
            data = json.dumps(event['response'])
            verb = event['verb']
        except:
            return{
                'statusCode': 400,
                'body': 'Missing Paramter: Must included filename, response, verb'
            }
        
        if 'POST' in verb:
            # POST
            index = cur.execute("select ImgID from Images ORDER BY ImgID DESC LIMIT 1")
            if index != None:
                index += 1
            else:
                index = 0
            cur.execute("""INSERT INTO Images (ImgID, Name, Response) VALUES (%s, %s, %s)""", (str(index), filename, data))
            conn.commit()
            logger.info("Inserted information into table successfully")
            response = 'Successfully added to db'
        
        if 'GET' in verb:
            # GET
            response = cur.execute("""SELECT * FROM Images WHERE Name = %s""", (filename))
            logger.info('Successfully retrieved all data for %s', filename)
            conn.commit()
        
        if 'PUT' in verb:
            # PUT
            index = cur.execute("""UPDATE Images SET Response = %s WHERE Name = %s""", (data, filename))
            logger.info('Successfully updated all data for %s', filename)
            response = 'Successfully amended db'
            
    conn.commit()

    logger.info("Exiting the function..")
    return {
        'statusCode': 200,
        'body': response
    }