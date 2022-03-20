import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, BackHandler, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class UpcomingBookingDetailScreen extends Component {

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
        showCancelBookingDialog: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.personDetail()}
                    {this.bookingStatusInfo()}
                    {this.cancelBookingButton()}
                    {this.bookingCancelDialog()}
                </View>
            </SafeAreaView>
        )
    }

    bookingCancelDialog() {
        return (
            <Dialog.Container
                visible={this.state.showCancelBookingDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0, padding: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold, paddingVertical: Sizes.fixPadding - 5.0, }}>
                        You sure cancel this booking?
                    </Text>
                    <View style={styles.cancelAndYesButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showCancelBookingDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ showCancelBookingDialog: false })
                                this.props.navigation.pop()
                            }}
                            style={styles.yesButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor14Medium }}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    cancelBookingButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showCancelBookingDialog: true })}
                style={styles.cancelBookingButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Cancel booking
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
                    isDone: true,
                })}
                {this.dashLine({ dashColor: Colors.primaryColor })}
                {this.bookingStatus({
                    title: 'Booking confirmed',
                    description: 'Booking confirmed on 16 March, 09:00 AM',
                    isDone: true,
                })}
                {this.dashLine({ dashColor: Colors.grayColor })}
                {this.bookingStatus({
                    title: 'Job started',
                    description: 'Schedule on 17 March, 10:00 AM',
                    isDone: false,
                })}
                {this.dashLine({ dashColor: Colors.grayColor })}
                {this.bookingStatus({
                    title: 'Job Completed',
                    description: 'Average time 02:00 hours',
                    isDone: false,
                })}
            </View>
        )
    }

    bookingStatus({ title, description, isDone }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    ...styles.bookingStatusTicMarkStyle,
                    backgroundColor: isDone ? Colors.primaryColor : 'transparent',
                    borderColor: isDone ? Colors.primaryColor : Colors.grayColor,
                }}>
                    {isDone
                        ?
                        <MaterialIcons name="check" size={14} color={Colors.whiteColor} />
                        :
                        null
                    }
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

    dashLine({ dashColor }) {
        return (
            <View style={{
                borderColor: dashColor,
                ...styles.dashlineStyle,
            }} />
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
                            Samama Zargham
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            Cleaner
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="call" size={18} color={Colors.primaryColor} />
                            <Text style={{ ...Fonts.primaryColor16Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                                Call now
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Booking ID 2097
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
        borderWidth: 1.0,
    },
    dashlineStyle: {
        height: 40.0,
        width: 1.0,
        borderWidth: 0.70,
        borderStyle: "dashed",
        borderRadius: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding - 1.0,
    },
    cancelBookingButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        left: 0.0,
        right: 0.0,
        justifyContent: 'center',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 6.0,
    },
    yesButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 6.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    cancelAndYesButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    }
});

UpcomingBookingDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(UpcomingBookingDetailScreen);

