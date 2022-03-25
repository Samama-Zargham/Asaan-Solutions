import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constant/styles';
const markers = [
    { latlng: { latitude: 28.4, longitude: 70.293 }, title: "Uzair", description: 'Uzair jaleel IS Cleaner' },
    { latlng: { latitude: 28.429, longitude: 70.31 }, title: "Moshin", description: 'Mohsin Wajid IS Cleaner' },
    { latlng: { latitude: 28.41, longitude: 70.309 }, title: "Ans", description: 'Ans Shakeel IS Electrition' },
    { latlng: { latitude: 28.425, longitude: 70.289 }, title: "Samama", description: 'Samama  IS Painter' },
]
const item = {
    id: '5',
    image: require('../assets/images/provider/provider_5.jpg'),
    name: 'Mohsin',
    jobCount: 199,
    ratePerHour: 16,
    rating: 5.0,
}


import React, { Component } from 'react'

class MyMap extends Component {
    render() {
        return (
            <View style={styles.container}>

                <MapView
                    initialRegion={{
                        latitude: 28.4212,
                        longitude: 70.2989,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map} >

                    {markers.map((marker, index) => (
                        <Marker
                            onPress={() => this.props.navigation.navigate('ServiceProvider', {
                                item: item,
                                title: marker.title
                            })}
                            key={index}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        >
                            <Image source={require('../assets/1.jpg')} style={{ height: 55, width: 55 }} />
                        </Marker>
                    ))}
                </MapView>
                {/* <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => this.props.navigation.pop()}
                    style={{
                        position: "absolute",
                        backgroundColor: Colors.primaryColor,
                        borderRadius:20,
                        padding:8,
                        top:1,
                        left:1
                    }}
                /> */}
            </View>
        );
    }
}


MyMap.navigationOptions = () => {
    return {
        header: () => null,
    }
}
export default withNavigation(MyMap);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});