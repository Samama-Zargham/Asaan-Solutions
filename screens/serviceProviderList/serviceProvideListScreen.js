import React, { Component, useCallback, useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, BackHandler, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import MenuDrawer from 'react-native-side-drawer';
import RangeSlider from 'rn-range-slider';

const serviceProviderList = [
    {
        id: '1',
        image: require('../../assets/images/provider/provider_1.jpg'),
        name: 'Samama ',
        jobCount: 197,
        ratePerHour: 15,
        rating: 4.9,
    },
    {
        id: '2',
        image: require('../../assets/images/provider/provider_2.jpg'),
        name: 'Ali',
        jobCount: 205,
        ratePerHour: 12,
        rating: 4.6,
    },
    {
        id: '3',
        image: require('../../assets/images/provider/provider_3.jpg'),
        name: 'Ahmed',
        jobCount: 158,
        ratePerHour: 10,
        rating: 4.5,
    },
    {
        id: '4',
        image: require('../../assets/images/provider/provider_4.jpg'),
        name: 'Osama',
        jobCount: 297,
        ratePerHour: 17,
        rating: 4.9,
    },
    {
        id: '5',
        image: require('../../assets/images/provider/provider_5.jpg'),
        name: 'Mohsin',
        jobCount: 199,
        ratePerHour: 16,
        rating: 5.0,
    },
    {
        id: '6',
        image: require('../../assets/images/provider/provider_6.jpg'),
        name: 'Ans',
        jobCount: 150,
        ratePerHour: 13,
        rating: 4.2,
    },
    {
        id: '7',
        image: require('../../assets/images/provider/provider_7.jpg'),
        name: 'Fazal',
        jobCount: 259,
        ratePerHour: 19,
        rating: 5.0,
    },
    {
        id: '8',
        image: require('../../assets/images/provider/provider_8.jpg'),
        name: 'Uzair',
        jobCount: 139,
        ratePerHour: 17,
        rating: 4.8,
    },
    {
        id: '9',
        image: require('../../assets/images/provider/provider_9.jpg'),
        name: 'Zamaan',
        jobCount: 297,
        ratePerHour: 23,
        rating: 5.0,
    },
];

class ServiceProviderListScreen extends Component {

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

    state = {
        isDrawerOpen: false,
        currentSortIndex: 1,
        currentGenderIndex: 1,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View>
                    <MenuDrawer
                        open={this.state.isDrawerOpen}
                        drawerContent={this.drawerContent()}
                        drawerPercentage={75}
                        animationTime={250}
                        opacity={0.9}
                        position="right"
                    >
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ isDrawerOpen: false })} >
                            {this.header()}
                            {this.serviceProviders()}
                        </TouchableOpacity>
                    </MenuDrawer>
                </View>
            </SafeAreaView>
        )
    }

    drawerContent = () => {
        return (
            <View style={styles.drawerStyle}>
                {this.drawerHeader()}
                {this.sortByInfo()}
                {this.priceRangeInfo()}
            </View>
        );
    };

    drawerHeader() {
        return (
            <View style={styles.drawerHeaderWrapStyle}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    Sort & Filters
                </Text>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                    Reset
                </Text>
            </View>
        )
    }

    priceRangeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Price Range
                </Text>
                <SliderValue />
                {this.genderInfo()}
                {this.applyButton()}
            </View>
        )
    }

    applyButton() {
        return (
            <View style={styles.applyButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Apply
                </Text>
            </View>
        )
    }

    genderInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding + 5.0 }}>
                    Gender
                </Text>
                {this.genderType({ index: 1, gender: 'Female' })}
                {this.genderType({ index: 2, gender: 'Male' })}
                {this.genderType({ index: 3, gender: 'Any' })}
            </View>
        )
    }

    genderType({ index, gender }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentGenderIndex: index })}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding }}>
                <View style={{
                    borderColor: this.state.currentGenderIndex == index ? Colors.primaryColor : Colors.blackColor,
                    ...styles.radioButtonStyle,
                }}>
                    {
                        this.state.currentGenderIndex == index
                            ?
                            <View
                                style={{
                                    height: 10.0,
                                    width: 10.0,
                                    borderRadius: 5.0,
                                    backgroundColor: Colors.primaryColor
                                }}
                            />
                            :
                            null
                    }
                </View>
                <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                    {gender}
                </Text>
            </TouchableOpacity>
        )
    }

    sortByInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor14Medium, marginBottom: Sizes.fixPadding + 5.0 }}>
                    Sort by
                </Text>
                {this.sortType({ index: 1, type: 'Job Completed' })}
                {this.sortType({ index: 2, type: 'Rate High to Low' })}
                {this.sortType({ index: 3, type: 'Rate Low to High' })}
                {this.sortType({ index: 4, type: 'Rating' })}
            </View>
        )
    }

    sortType({ index, type }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentSortIndex: index })}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding }}>
                <View style={{
                    borderColor: this.state.currentSortIndex == index ? Colors.primaryColor : Colors.blackColor,
                    ...styles.radioButtonStyle,
                }}>
                    {
                        this.state.currentSortIndex == index
                            ?
                            <View
                                style={{
                                    height: 10.0,
                                    width: 10.0,
                                    borderRadius: 5.0,
                                    backgroundColor: Colors.primaryColor
                                }}
                            />
                            :
                            null
                    }
                </View>
                <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                    {type}
                </Text>
            </TouchableOpacity>
        )
    }

    serviceProviders() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('ServiceProvider', { item })}
                style={styles.serviceProvidersWrapStyle}>
                <Image
                    source={item.image}
                    style={{
                        height: 100.0, width: 100.0,
                        borderRadius: Sizes.fixPadding,
                    }}
                    resizeMode="cover"
                />
                <View style={{ justifyContent: 'space-between', flex: 1, marginLeft: Sizes.fixPadding }}>
                    <View>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.name}
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Bold }}>
                            Cleaner
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...Fonts.grayColor12Bold }}>
                                Jobs
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Bold }}>
                                {item.jobCount}
                            </Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...Fonts.grayColor12Bold }}>
                                Rate
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Bold }}>
                                ${item.ratePerHour}/hr
                            </Text>
                        </View>

                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ ...Fonts.grayColor12Bold }}>
                                Rating
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="star" size={15} color={Colors.orangeColor} />
                                <Text style={{ ...Fonts.blackColor14Bold }}>
                                    {item.rating.toFixed(1)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={serviceProviderList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 9.0
                }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => this.props.navigation.pop()}
                    />
                    <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Full Home Cleaning
                    </Text>
                </View>
                <MaterialCommunityIcons
                    name="map-marker-radius"
                    size={20}
                    color={Colors.primaryColor}
                    onPress={() => this.props.navigation.push("MyMap") }

               />
                {/* <MaterialIcons
                    name="filter-list"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => this.setState({ isDrawerOpen: true })}
                /> */}
            </View>
        )
    }
}

const SliderValue = () => {

    const [lowValue, setLowValue] = useState(25);
    const [highValue, setHighValue] = useState(75);
    const renderThumb = useCallback(() => <View style={styles.sliderThumbStyle} />, []);
    const renderRail = useCallback(() => <View style={styles.inactiveSliderStyle} />, []);
    const renderRailSelected = useCallback(() => <View style={styles.selectedSliderStyle} />, []);
    const renderLabel = useCallback(value =>
        <Text style={{ ...Fonts.blackColor14Medium, marginBottom: Sizes.fixPadding }}>
            ${value}
        </Text>
        , []);
    const handleValueChange = useCallback((low, high) => {
        setLowValue(low);
        setHighValue(high);
    }, []);

    return (
        <RangeSlider
            style={{ marginTop: Sizes.fixPadding }}
            min={0}
            max={100}
            step={1}
            low={lowValue}
            high={highValue}
            floatingLabel={false}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            onValueChanged={handleValueChange}
        />
    )
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 56.0,
        elevation: 3.0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    drawerStyle: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        padding: Sizes.fixPadding * 2.0,
    },
    serviceProvidersWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    sliderThumbStyle: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: Colors.primaryColor,
    },
    drawerHeaderWrapStyle: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    applyButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 2.0
    },
    radioButtonStyle: {
        height: 16.0,
        width: 16.0,
        borderRadius: 8.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inactiveSliderStyle: {
        flex: 1,
        height: 1.5,
        borderRadius: 2,
        backgroundColor: '#C4C4C4',
    },
    selectedSliderStyle: {
        height: 2.5,
        backgroundColor: Colors.primaryColor,
        borderRadius: 2,
    }
});

ServiceProviderListScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ServiceProviderListScreen);

