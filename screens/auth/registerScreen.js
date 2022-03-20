import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, BackHandler, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

class RegisterScreen extends Component {

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
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.backArrow()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                        {this.appLogo()}
                        {this.registerInfo()}
                        {this.userNameTextField()}
                        {this.emailTextField()}
                        {this.passwordTextField()}
                        {this.confirmPasswordTextField()}
                        {this.continueButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color="black"
                onPress={() => this.props.navigation.goBack()}
                style={{ left: 20.0, top: 10.0 }}
            />
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('Otp')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor14Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    confirmPasswordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.confirmPassword}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    placeholder="Confirm Password"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    passwordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder="Password"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    emailTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder="Email"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    userNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={this.state.userName}
                    onChangeText={(text) => this.setState({ userName: text })}
                    placeholder="Username"
                    style={{ ...Fonts.blackColor14Medium }}
                    placeholderTextColor={Colors.blackColor}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    registerInfo() {
        return (
            <Text style={{ ...Fonts.grayColor14Bold, textAlign: 'center', marginBottom: Sizes.fixPadding + 5.0 }}>
                Register your account
            </Text>
        )
    }

    appLogo() {
        return (
            <Image
                source={require('../../assets/images/icon.jpg')}
                style={styles.appLogoStyle}
                resizeMode="cover"
            />
        )
    }
}

const styles = StyleSheet.create({
    appLogoStyle: {
        width: 290.0,
        height: 150.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderColor: 'rgba(128,128,128,0.12)',
        borderWidth: 1.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0
    },

})

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RegisterScreen);