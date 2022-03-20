import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, BackHandler, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { TransitionPresets } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

class RateProviderScreen extends Component {

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
        rate1: false,
        rate2: false,
        rate3: false,
        rate4: false,
        rate5: false,
        review: '',
        isReviewFocus: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
                    >
                        {this.personDetail()}
                        {this.rating()}
                        {this.reviewField()}
                    </ScrollView>
                    {this.submitButton()}
                </View>
            </SafeAreaView>
        )
    }

    reviewField() {
        return (
            <TextInput
                placeholder="Write your review here"
                value={this.state.review}
                onChangeText={value => this.setState({ review: value })}
                style={{
                    ...styles.textFieldWrapStyle,
                    borderColor: this.state.isReviewFocus ? Colors.primaryColor : Colors.grayColor,
                }}
                multiline={true}
                numberOfLines={7}
                selectionColor={Colors.primaryColor}
                textAlignVertical = "top"
                padding= {Sizes.fixPadding}
                onFocus={() => this.setState({ isReviewFocus: true })}
                onBlur={() => this.setState({ isReviewFocus: false })}
            />
        )
    }

    rating() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <MaterialIcons
                    name={this.state.rate1 ? "star" : "star-border"}
                    size={33}
                    color={Colors.orangeColor}
                    onPress={() => {
                        if (this.state.rate1) {
                            this.setState({
                                rate2: false,
                                rate3: false,
                                rate4: false,
                                rate5: false,
                            })
                        }
                        else {
                            this.setState({ rate1: true })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate2 ? "star" : "star-border"}
                    size={33}
                    color={Colors.orangeColor}
                    onPress={() => {
                        if (this.state.rate2) {
                            this.setState({
                                rate1: true,
                                rate3: false,
                                rate4: false,
                                rate5: false,
                            })
                        }
                        else {
                            this.setState({
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate3 ? "star" : "star-border"}
                    size={33}
                    color={Colors.orangeColor}
                    onPress={() => {
                        if (this.state.rate3) {
                            this.setState({
                                rate4: false,
                                rate5: false,
                                rate2: true,
                            })
                        }
                        else {
                            this.setState({
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate4 ? "star" : "star-border"}
                    size={33}
                    color={Colors.orangeColor}
                    onPress={() => {
                        if (this.state.rate4) {
                            this.setState({
                                rate5: false,
                                rate3: true,
                            })
                        }
                        else {
                            this.setState({
                                rate4: true,
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={this.state.rate5 ? "star" : "star-border"}
                    size={33}
                    color={Colors.orangeColor}
                    onPress={() => {
                        if (this.state.rate5) {
                            this.setState({
                                rate4: true,
                            })
                        }
                        else {
                            this.setState({
                                rate5: true,
                                rate4: true,
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
            </View>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.submitButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    Submit
                </Text>
            </TouchableOpacity>
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
                            Amara Smith
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
                    Rate Provider
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
    submitButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        left: 0.0,
        right: 0.0,
        justifyContent: 'center',
    },
    textFieldWrapStyle: {
        ...Fonts.blackColor14Medium,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
    }
});

RateProviderScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RateProviderScreen);

