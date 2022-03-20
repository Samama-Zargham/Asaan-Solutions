import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, BackHandler, Image, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

const servicesList = [
    {
        id: '1',
        image: require('../../assets/images/service-image/full-home-cleaning.jpg'),
        serviceName: 'Full Home Cleaning',
    },
    {
        id: '2',
        image: require('../../assets/images/service-image/car-cleaning.jpg'),
        serviceName: 'Car Cleaning',
    },
    {
        id: '3',
        image: require('../../assets/images/service-image/bathroom-cleaning.jpg'),
        serviceName: 'Bathroom Cleaning',
    },
    {
        id: '4',
        image: require('../../assets/images/service-image/kitchen-cleaning.jpg'),
        serviceName: 'Kitchen Cleaning',
    },
    {
        id: '5',
        image: require('../../assets/images/service-image/carpet-cleaning.jpg'),
        serviceName: 'Carpet Cleaning',
    },
    {
        id: '6',
        image: require('../../assets/images/service-image/sofa-cleaning.jpg'),
        serviceName: 'Sofa Cleaning',
    },
    {
        id: '7',
        image: require('../../assets/images/service-image/home-disinfection.jpg'),
        serviceName: 'Home Disinfection',
    },
];

class ProfessionalServicesScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View>
                    {this.header()}
                    {this.services()}
                </View>
            </SafeAreaView>
        )
    }

    services() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ServiceProviderList')}
                style={styles.servicesWrapStyle}>
                <Image
                    source={item.image}
                    style={{
                        width: 60.0,
                        height: 60.0,
                        borderRadius: Sizes.fixPadding * 2.0,
                    }}
                    resizeMode="contain"
                />
                <Text style={{ ...Fonts.blackColor14Bold, marginLeft: Sizes.fixPadding }}>
                    {item.serviceName}
                </Text>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={servicesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 7.0,
                }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold, marginHorizontal: Sizes.fixPadding + 5.0, }}>
                    Professional Cleaning Services sddsf
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 56.0,
        elevation: 3.0,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    servicesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    }
});

ProfessionalServicesScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ProfessionalServicesScreen);

