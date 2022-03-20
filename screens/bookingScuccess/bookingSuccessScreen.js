import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, BackHandler, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';

const { width, height } = Dimensions.get('screen');

class BookingScccessScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.push('BottomTabBar', { index: 1 });
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginHorizontal: Sizes.fixPadding * 2.0
                }}>
                    {this.bookingSuccessImage()}
                    {this.bookingSuccessText()}
                    {this.okayButton()}
                </View>
            </SafeAreaView>
        )
    }

    okayButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('BottomTabBar', { index: 1 })}
                style={styles.okayButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Okay!
                </Text>
            </TouchableOpacity>
        )
    }

    bookingSuccessText() {
        return (
            <View>
                <Text style={{ ...Fonts.blackColor16Medium, textAlign: 'center', marginTop: Sizes.fixPadding - 5.0 }}>
                    BookingSuccess
                </Text>
                <Text style={{ ...Fonts.grayColor14Medium, textAlign: 'center', marginTop: Sizes.fixPadding * 2.0, }}>
                    Thank you for your booking! Our representative will contact you shortly.
                </Text>
            </View>
        )
    }

    bookingSuccessImage() {
        return (
            <Image
                source={require('../../assets/images/booking-success.png')}
                resizeMode="contain"
                style={{
                    width: width - 40.0,
                    alignSelf: 'center',
                    height: height / 2.0,
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    okayButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 5.0
    }
});

BookingScccessScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.ModalSlideFromBottomIOS,
    }
}

export default withNavigation(BookingScccessScreen);

