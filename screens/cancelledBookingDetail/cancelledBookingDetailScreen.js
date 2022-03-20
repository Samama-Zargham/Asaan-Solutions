import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, BackHandler, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

class CancelledBookingDetailScreen extends Component {

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
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.personDetail()}
                    {this.bookingStatusInfo()}
                    {this.okayButton()}
                </View>
            </SafeAreaView>
        )
    }

    okayButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.okayButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Okay!
                </Text>
            </TouchableOpacity>
        )
    }

    bookingStatusInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Bold, marginBottom: Sizes.fixPadding }}>
                    Booking Status
                </Text>
                {this.bookingStatus({
                    title: 'Booking request sent',
                    description: 'Requested on 15 March, 07:00 PM',
                })}
                {this.dashLine()}
                {this.bookingStatus({
                    title: 'Booking cancelled',
                    description: 'Booking cancelled on 15 March, 09:00 PM',
                })}
            </View>
        )
    }

    bookingStatus({ title, description, }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.bookingStatusTicMarkStyle}>
                    <MaterialIcons name="check" size={14} color={Colors.whiteColor} />
                </View>
                <View style={{ marginLeft: Sizes.fixPadding * 2.0 }}>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        {title}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        {description}
                    </Text>
                </View>
            </View>
        )
    }

    dashLine() {
        return (
            <View style={styles.dashlineStyle} />
        )
    }

    personDetail() {
        return (
            <View style={styles.personDetailWrapStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require('../../assets/images/provider/provider_7.jpg')}
                        style={{
                            height: 84.0,
                            width: 84.0,
                            borderRadius: Sizes.fixPadding
                        }}
                        resizeMode="cover"
                    />
                    <View style={{ justifyContent: 'space-between', marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.blackColor16Bold }}>
                            Ans Shakeel
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            Cleaner
                        </Text>
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            $16/hr
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Booking ID 1905
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    style={{ position: 'absolute', left: 20.0, }}
                    onPress={() => this.props.navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
    },
    personDetailWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
    },
    bookingStatusTicMarkStyle: {
        height: 20.0,
        width: 20.0,
        borderRadius: Sizes.fixPadding,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    dashlineStyle: {
        height: 40.0,
        width: 1.0,
        borderWidth: 0.70,
        borderStyle: "dashed",
        borderRadius: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding - 1.0,
        borderColor: Colors.primaryColor,
    },
    okayButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        left: 0.0,
        right: 0.0,
        justifyContent: 'center',
    },
});

CancelledBookingDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(CancelledBookingDetailScreen);

