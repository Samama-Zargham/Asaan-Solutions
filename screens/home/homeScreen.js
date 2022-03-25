import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, BackHandler, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-elements';
import Icon, { Icons } from '../../components/Icons';


const bestOffersList = [
    
    {
        id: '1',
        image: require('../../assets/images/best-offers/best-offers-2.jpg'),
        offerName: 'Salon for Men',
        offer: 'Upto 50% Off',
    },
    {
        id: '2',
        image: require('../../assets/images/best-offers/best-offers-3.jpeg'),
        offerName: 'Bathroom Cleaning',
        offer: 'Free Fan Cleaning & More',
    },
    {
        id: '3',
        image: require('../../assets/images/best-offers/best-offers-4.jpeg'),
        offerName: 'House Painters',
        offer: 'Upto 15% Off',
    }
];

const servicesList = [
    {
        id: '1',
        backColor: '#FFA500',
        type: Icons.MaterialCommunityIcons, iname: "broom",
        serviceType: 'Cleaning'
    },
    {
        id: '2',
        backColor: Colors.primaryColor,
        type: Icons.MaterialIcons, iname: "plumbing",
        serviceType: 'Plumber'
    },
    {
        id: '3',
        backColor: '#FF0000',
        type: Icons.MaterialIcons, iname: "electrical-services",
        serviceType: 'Electrician'
    },
    {
        id: '4',
        backColor: '#FFA500',
        type: Icons.MaterialIcons, iname: "handyman",
        serviceType: 'Painter'
    },
    {
        id: '5',
        backColor: '#FF0000',
        type: Icons.MaterialIcons, iname: "handyman",
        serviceType: 'Beautician'
    },
];

const customerReviewsList = [
    {
        id: '1',
        serviceName: 'Home Cleaning',
        review: 'Sofia is as amazing as her reviews. Very through job, takes the time to get into the details. Will be booking again.',
        customerName: 'Ans',
    },
    {
        id: '2',
        serviceName: 'Home Cleaning',
        review: 'Hotel style cleaning. Beyond perfection. Will definitely hope he accepts future bookings.',
        customerName: 'Mohsin',
    },
    {
        id: '3',
        serviceName: 'Handyman',
        review: 'Michael was very nice and provided a very efficient service. Highly recommended.',
        customerName: 'Samama',
    },
    {
        id: '4',
        serviceName: 'Home Cleaning',
        review: 'On time and accurate. Clean work. John is cooperative and polite. Will be happy to have them again for next service.',
        customerName: 'Uzair',
    },
    {
        id: '5',
        serviceName: 'Home Cleaning',
        review: 'Carla did a fantastic job. Cleaning our place and was very easy to communicate with.',
        customerName: 'Mohsin',
    },
];

class HomeScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    state = {
        showBottomSheet: false,
        currentCityIndex: 1,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {this.userImageAndLocationInfo()}
                                {this.searchTextField()}
                                {this.servicesInfo()}
                                {this.todaysOfferBanner()}
                                {this.title({ title: 'Best offers' })}
                            </>
                        }
                        data={bestOffersList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <>
                                {this.title({ title: 'Customer reviews' })}
                                {this.customerReviews()}
                                {this.chooseCity()}
                            </>
                        }
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.push('ServiceProviderList')}
            style={styles.bestOffersInfoWrapStyle}>
            <Image
                source={item.image}
                style={{
                    height: 225.0,
                    width: '100%',
                    borderTopLeftRadius: Sizes.fixPadding, borderTopRightRadius: Sizes.fixPadding
                }}
                resizeMode="cover"
            />
            <View style={{ padding: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    {item.offerName}
                </Text>
                <Text style={{ ...Fonts.grayColor12Medium, marginTop: Sizes.fixPadding - 7.0 }}>
                    {item.offer}
                </Text>
            </View>
        </TouchableOpacity>
    )

    chooseCity() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        paddingTop: Sizes.fixPadding + 5.0,
                        paddingBottom: Sizes.fixPadding,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor16Bold, textAlign: 'center' }}>
                        Select City
                    </Text>
                    <View
                        style={{
                            backgroundColor: Colors.grayColor, height: 1.0,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                            marginVertical: Sizes.fixPadding + 7.0,
                        }}
                    />
                    {this.city({ city: 'Islamabad', index: 1 })}
                    {this.city({ city: 'Karachi', index: 2 })}
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    city({ city, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentCityIndex: index })}
                style={styles.cityInfoWrapStyle}>
                <View style={{
                    borderColor: this.state.currentCityIndex == index ? Colors.primaryColor : Colors.blackColor,
                    ...styles.selectCityRadioButtonStyle,
                }}>
                    {this.state.currentCityIndex == index
                        ?
                        <View style={{ height: 10.0, width: 10.0, borderRadius: 5.0, backgroundColor: Colors.primaryColor }} />
                        :
                        null
                    }
                </View>
                <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                    {city}
                </Text>
            </TouchableOpacity>
        )
    }

    customerReviews() {
        const renderItem = ({ item }) => (
            <View style={styles.customerReviewsWrapStyle}>
                <Text style={{ ...Fonts.blackColor12Regular }}>
                    {item.serviceName}
                </Text>
                <Text numberOfLines={4} style={{ ...Fonts.blackColor12Regular }}>
                    {item.review}
                </Text>
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    {item.customerName}
                </Text>
            </View>
        )
        return (
            <FlatList
                data={customerReviewsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding - 5.0
                }}
            />
        )
    }

    title({ title }) {
        return (
            <Text style={{ ...Fonts.blackColor16Bold, marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                {title}
            </Text>
        )
    }

    todaysOfferBanner() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Image
                    source={require('../../assets/images/todays-offer-banner.png')}
                    style={{
                        width: '100%',
                    }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    servicesInfo() {

        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                onPress={() => this.props.navigation.push('ProfessionalServices')}
                style={{
                    marginRight: Sizes.fixPadding + 10.0,
                    height: 90,
                    width: 90,
                    backgroundColor: "#fff4e6",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    elevation: 1,
                    margin:1
                }}>
                <Icon type={item.type}
                    style={{
                        backgroundColor: Colors.primaryColor,
                        borderRadius: 100,
                        padding: 4
                    }}
                    name={item.iname}
                    color={Colors.whiteColor} />
                <Text style={{ ...Fonts.blackColor14Medium, textAlign: 'center', marginTop: Sizes.fixPadding - 5.0 }}>
                    {item.serviceType}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        Select Service
                    </Text>
                    <Text style={{ ...Fonts.redColor14Medium }}>
                        See all
                    </Text>
                </View>
                <View style={styles.servicesInfoWrapStyle}>
                    <FlatList
                        data={servicesList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
                    />
                </View>
            </View>
        )
    }

    searchTextField() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('Search')}
                style={styles.searchTextFieldWrapStyle}>
                <MaterialIcons name="search" size={24}
                    style={{ marginRight: Sizes.fixPadding }}
                    color={Colors.primaryColor} />
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Search for a service
                </Text>
            </TouchableOpacity>
        )
    }

    userImageAndLocationInfo() {
        return (
            <View style={styles.userImageAndLocationInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: true })}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="location-on" size={24} color={Colors.grayColor} />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Location
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            Rahim yar khan
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('BottomTabBar', { index: 5 })}
                >
                    <Image
                        source={require('../../assets/images/user/user_5.jpg')}
                        style={styles.userImageStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userImageAndLocationInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: Sizes.fixPadding * 2.0,
    },
    userImageStyle: {
        height: 60.0,
        width: 60.0,
        borderRadius: 30.0,
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
    },
    searchTextFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        height: 40.0,
        paddingHorizontal: Sizes.fixPadding
    },
    servicesWrapStyle: {
        height: 80.0,
        width: 80.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding,
    },
    servicesInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: Sizes.fixPadding * 2.0
    },
    selectCityRadioButtonStyle: {
        height: 16.0,
        width: 16.0,
        borderRadius: 8.0,
        backgroundColor: Colors.whiteColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cityInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    },
    bestOffersInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    customerReviewsWrapStyle: {
        backgroundColor: '#DCDFD8',
        borderRadius: Sizes.fixPadding,
        elevation: 2.0,
        justifyContent: 'space-between',
        width: 243.0,
        height: 127.0,
        padding: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
    }
});

export default withNavigation(HomeScreen);

