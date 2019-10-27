import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../colors';
import Modal from 'react-native-modal';

const response = {
    "Labels": [
        {
            "Name": "Wood",
            "Confidence": 99.08756256103516,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Mobile Phone",
            "Confidence": 93.08698272705078,
            "Instances": [
                {
                    "BoundingBox": {
                        "Width": 0.33584317564964294,
                        "Height": 0.12494483590126038,
                        "Left": 0.5009456276893616,
                        "Top": 0.4177166819572449
                    },
                    "Confidence": 93.08698272705078
                }
            ],
            "Parents": [
                {
                    "Name": "Electronics"
                },
                {
                    "Name": "Phone"
                }
            ]
        },
        {
            "Name": "Cell Phone",
            "Confidence": 93.08698272705078,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Electronics"
                },
                {
                    "Name": "Phone"
                }
            ]
        },
        {
            "Name": "Electronics",
            "Confidence": 93.08698272705078,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Phone",
            "Confidence": 93.08698272705078,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Electronics"
                }
            ]
        },
        {
            "Name": "Hardwood",
            "Confidence": 91.72553253173828,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Wood"
                }
            ]
        },
        {
            "Name": "Accessories",
            "Confidence": 90.87628936767578,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Accessory",
            "Confidence": 90.87628936767578,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Wallet",
            "Confidence": 90.87628936767578,
            "Instances": [
                {
                    "BoundingBox": {
                        "Width": 0.48304682970046997,
                        "Height": 0.29965585470199585,
                        "Left": 0.09068495780229568,
                        "Top": 0.526699423789978
                    },
                    "Confidence": 90.87628936767578
                }
            ],
            "Parents": [
                {
                    "Name": "Accessories"
                }
            ]
        },
        {
            "Name": "Flooring",
            "Confidence": 71.26310729980469,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Furniture",
            "Confidence": 70.08087921142578,
            "Instances": [],
            "Parents": []
        },
        {
            "Name": "Plywood",
            "Confidence": 69.87727355957031,
            "Instances": [],
            "Parents": [
                {
                    "Name": "Wood"
                }
            ]
        }
    ],
    "LabelModelVersion": "2.0"
};

const phone = response.Labels[1];
const phoneBoundingBox = phone.Instances[0].BoundingBox;

getBoundingBoxes = (response) => {
    const objects = response.Labels;
    let boundingBoxes = [];
    let id = 0;
    for (i = 0; i < objects.length; i++) {
        if (objects[i].Instances.length > 0) {
            for (j = 0; j < objects[i].Instances.length; j++) {
                boundingBoxes.push({ Label: objects[i].Name, BoundingBox: objects[i].Instances[j].BoundingBox, id, price: null })
            }
            id++;
        }
    }
    return boundingBoxes.sort((a, b) => a.BoundingBox.Left - b.BoundingBox.Left);
}

class ResultsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            boundingBoxes: getBoundingBoxes(response),
            modalOpen: false
        }
    }

    setPriceById = (id, price) => {
        this.setState(prevState => {
            const updatedBoundingBoxes = prevState.boundingBoxes;
            this.state.boundingBoxes.find(boundingBox => boundingBox.id === id).price = price;
            return {
                boundingBoxes: updatedBoundingBoxes
            }
        })
    }

    setLabelById = (id, label) => {
        this.setState(prevState => {
            const updatedBoundingBoxes = prevState.boundingBoxes;
            updatedBoundingBoxes.find(boundingBox => boundingBox.id === id).Label = label;
            return {
                boundingBoxes: updatedBoundingBoxes
            }
        })
    }

    deleteBoundingBoxById = (id) => {
        const index = this.state.boundingBoxes.findIndex((element, index, array) => element.id === id);
        this.setState(prevState => ({
            boundingBoxes: prevState.boundingBoxes.splice(index, 1)
        }, () => {}))
    }

    render() {
        const image = require('../../../assets/images/rekognitionTest.jpg');
        const source = Image.resolveAssetSource(image);
        const heightToWidthRatio = source.height / source.width;
        const screenWidth = Dimensions.get('window').width;
        const scaledHeight = screenWidth * heightToWidthRatio;

        console.log(this.props.navigation.getParam('body'))

        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 40, marginVertical: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Select boxes to enter item names and values or delete items</Text>
                </View>
                <ImageBackground
                    source={{uri: this.props.navigation.getParam('body').base64.uri}}
                    style={{ width: screenWidth, height: scaledHeight }}
                    resizeMode='cover'
                >
                    <View>
                        {this.state.boundingBoxes.map(boundingBox => (
                            <BoundingBox 
                                label={boundingBox.Label}
                                price={boundingBox.price}
                                key={boundingBox.BoundingBox.Top} 
                                BoundingBox={boundingBox.BoundingBox} 
                                imageHeight={scaledHeight} 
                                imageWidth={screenWidth} 
                                id={boundingBox.id}
                                deleteItem={this.deleteBoundingBoxById}
                                setLabelById={this.setLabelById}
                                setPriceById={this.setPriceById}
                            />
                        ))}
                    </View>
                </ImageBackground>
                <View style={{alignItems: 'flex-end', marginRight: 20, marginTop: 20}}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('DashboardScreen')
                    }}>
                        <Icon size={60} name='ios-arrow-dropright-circle' color={colors.orange} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class BoundingBox extends React.Component {
    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }))
    }

    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            price: '',
            modalOpen: false
        }
    }

    render() {
        const { BoundingBox, imageHeight, imageWidth, label } = this.props;
        const top = BoundingBox.Top * imageHeight;
        const left = BoundingBox.Left * imageWidth;
        const width = BoundingBox.Width * imageWidth;
        const height = BoundingBox.Height * imageHeight;
        return (
            <View>
                <Modal isVisible={this.state.modalOpen} onBackdropPress={() => {
                }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View width={'100%'} backgroundColor='white' style={{ borderRadius: 5, flexDirection: 'column', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{marginBottom: 5, marginTop: 10}}>
                            <Text>Item Name</Text>
                        </View>
                        <TextInput style={{height: 40, width: '80%', borderWidth: 1, borderColor: 'black', paddingVertical: 5, paddingLeft: 10}} value={this.state.label} onChangeText={text => {
                            this.setState({label: text})
                        }}/>
                        <View style={{ marginBottom: 5, marginTop: 10 }}>
                            <Text>Price</Text>
                        </View>
                        <TextInput keyboardType='number-pad' style={{height: 40, width: '80%', borderWidth: 1, borderColor: 'black', paddingVertical: 5, paddingLeft: 10}} value={this.state.price} onChangeText={text => {
                            this.setState({price: text})
                        }}/>
                        <TouchableOpacity style={{ height: 40, width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 10, backgroundColor: colors.red }} onPress={() => {
                            this.props.deleteItem(this.props.id);
                            this.toggleModal();
                        }}>
                            <Text style={{ color: 'white' }}>Delete Item</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            {/* <TouchableOpacity style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginBottom: 10, marginTop: 10, marginLeft: 20 }} onPress={() => {
                                this.toggleModal();
                            }}>
                                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <Icon size={40} name='ios-close-circle' color={colors.blue} />
                                    <Text>Cancel</Text>
                                </View>
                            </TouchableOpacity> */}
                            <View style={{ marginTop: 10, flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 20, marginBottom: 10 }} onPress={() => {
                                this.props.deleteItem(this.props.id);
                                this.toggleModal();
                            }}>
                                <Icon size={40} name='ios-arrow-dropright-circle' color={colors.orange} onPress={() => {
                                    this.props.setLabelById(this.props.id, this.state.label);
                                    this.props.setPriceById(this.props.id, this.state.price);
                                    this.toggleModal();
                                }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={{ position: 'absolute', top, left, width, height, borderWidth: 2, borderRadius: 5, borderColor: 'white' }} zIndex={1} onPress={this.toggleModal}>
                    {this.props.price !== null && (<View style={{position: 'absolute', right: 6, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon size={30} name='ios-checkmark-circle' color='green' />
                    </View>)}
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: top + height, left, backgroundColor: 'white', alignItems: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, zIndex: 100 }}>
                    <Text>{label}</Text>
                </View>
            </View>
        )
    }
}

export default ResultsScreen;