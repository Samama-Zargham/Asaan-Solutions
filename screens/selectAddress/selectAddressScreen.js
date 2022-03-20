import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, BackHandler, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

const addressList = [
    {
        id: '1',
        isHome: true,
        address: '120, Yogi Villa, Opera Street, New York.',
    },
    {
        id: '2',
        address: 'G-12, ABc MArt, Opera Street, New York.',
        isHome: false,
    },
];

class SelectAddressScreen extends Component {

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
        selectedAddressId: addressList[0].id,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.addresses()}
                    {this.addAddressButton()}
                    {this.continueButton()}
                </View>
            </SafeAreaView>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('BookingSuccess')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    addAddressButton() {
        return (
            <View style={styles.addAddressButtonWrapStyle}>
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    Add new address
                </Text>
            </View>
        )
    }

    addresses() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ selectedAddressId: item.id })}
                style={{
                    ...styles.addressWrapStyle,
                    marginBottom: index == addressList.length - 1 ? 0.0 : Sizes.fixPadding * 2.0,
                    borderColor: this.state.selectedAddressId == item.id ? Colors.primaryColor : '#d3d3d3'
                }}>
                <View style={{
                    ...styles.addressIconWrapStyle,
                    backgroundColor: this.state.selectedAddressId == item.id ? Colors.primaryColor : 'rgba(128, 128, 128, 0.5)',
                }}>
                    <MaterialIcons
                        name={item.isHome ? "home" : "work"}
                        size={24}
                        color={this.state.selectedAddressId == item.id ? Colors.whiteColor : Colors.primaryColor}
                    />
                </View>
                <Text style={{
                    ...Fonts.blackColor14Medium,
                    marginLeft: Sizes.fixPadding,
                    width: width - 135,
                }}>
                    {item.address}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    data={addressList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.pop()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Select address
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
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    continueButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding + 5.0,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
    },
    addressIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAddressButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderStyle: "dashed",
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
    },
    continueButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

SelectAddressScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SelectAddressScreen);

