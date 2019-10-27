import json

# sorts through the list of object recognized by the rekognition api
def format(response):
    # creates a new object to store the objects we want to send to the front end
    formatobject = []
    # takes the first object in the response and adds it into our data to send back
    formatobject.append(response['Labels'][0])
    exist = 0 # 0 is false, 1 is true
    
    # loop through each of the entries in the data provided from rekognition
    for label in response['Labels']:
        # compare each entry to one we have chosen for sending through
        for object in formatobject:
            if str(label['Confidence']) in str(object['Confidence']):
                # if confidence levels match, we know the object is already in our response object
                exist = 1
                print(str(label['Instances']))
                if label['Instances']:
                    # determine if a new object that we will not add into our response has bounding box information we can take
                    print('object has instance')
                    instances = label['Instances']
                    if instances[0]:
                        print('instance has an element')
                        boundingbox = instances[0]
                        if boundingbox:
                            object['Instances'][0] = boundingbox
                            print(str(label['Name']))
        if exist is 0:
            # if the object was not found to be in the response, we will add it in
            formatobject.append(label)
        exist = 0
    
    # removes the fields the front end will not use and add an additional field not included by rekognition
    for object in formatobject:
        del object['Parents']
        del object['Confidence']
        object['Price'] = ''
    
    return formatobject