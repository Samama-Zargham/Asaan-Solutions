import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, BackHandler, Animated, Dimensions, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constant/styles";
import BookingScreen from "../screens/booking/bookingScreen";
import ChatScreen from "../screens/chat/chatScreen";
import HomeScreen from "../screens/home/homeScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import WalletScreen from "../screens/wallet/walletScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import Map from "../screens/Map"
let { height } = Dimensions.get('window');

class BottomTabBarScreen extends Component {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
        this.focused = false
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.07 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    state = {
        backClickCount: 0,
    };

    currentIndex = this.props.navigation.getParam('index');

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                {this.currentIndex == 1 ?
                    <HomeScreen /> :
                    this.currentIndex == 2 ?
                        <BookingScreen /> :
                        this.currentIndex == 3 ?
                            <Map /> :
                            this.currentIndex == 4 ?
                                <ChatScreen />
                                :
                                <ProfileScreen />
                }
                <View style={styles.bottomTabBarStyle}>
                    {this.bottomTabBarItem({ index: 1, })}
                    {this.bottomTabBarItem({ index: 2, })}
                    {this.bottomTabBarItem({ index: 3, })}
                    {this.bottomTabBarItem({ index: 4, })}
                    {this.bottomTabBarItem({ index: 5, })}
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        press back again to exit the app
                    </Text>
                </Animated.View>
            </View>
        )
    }

    bottomTabBarItem({ index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.navigation.push('BottomTabBar', { index });
                    this.setState({ focused: true })
                }
                }
            >
                {
                    index == 1
                        ?
                        <Animated.View
                            style={this.currentIndex == index && styles.bottomIconView}
                        >
                            <MaterialCommunityIcons
                                name="home"
                                size={20}
                                color={this.currentIndex == index ? Colors.grayColor : Colors.whiteColor}
                            />
                        </Animated.View>

                        :
                        index == 2
                            ?
                            <Animated.View
                                style={this.currentIndex == index && styles.bottomIconView}
                            >
                                <MaterialCommunityIcons
                                    name="calendar-range" size={20}
                                    color={this.currentIndex == index ? Colors.grayColor : Colors.whiteColor}
                                />
                            </Animated.View>
                            :
                            index == 3
                                ?
                                <Animated.View
                                    style={this.currentIndex == index && styles.bottomIconView}
                                >
                                    <MaterialCommunityIcons
                                        name="map-marker-radius"
                                        size={20}
                                        color={this.currentIndex == index ? Colors.grayColor : Colors.whiteColor}
                                    />
                                </Animated.View>
                                :
                                index == 4
                                    ?
                                    <Animated.View
                                        style={this.currentIndex == index && styles.bottomIconView}
                                    >
                                        <MaterialIcons
                                            name="chat" size={20}
                                            color={this.currentIndex == index ? Colors.grayColor : Colors.whiteColor}
                                        />
                                    </Animated.View>

                                    :
                                    <Animated.View
                                        style={this.currentIndex == index && styles.bottomIconView}
                                    >
                                        <MaterialCommunityIcons
                                            name="account"
                                            size={20}
                                            color={this.currentIndex == index ? Colors.grayColor : Colors.whiteColor}
                                        />
                                    </Animated.View>
                }
            </TouchableOpacity >
        )
    }
}

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BottomTabBarScreen);

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
        borderRadius: 10,
        height: 50.0,
        position: "absolute",
        backgroundColor: "#ffc526",
        bottom: 5.0,
        left: 10.0,
        right: 10.0
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomIconView: {
        elevation: 1,
        backgroundColor: Colors.primaryColor,
        borderRadius: 100,
        padding: 5,
        borderColor: Colors.grayColor,
        borderWidth: 2,
        alignItems: "center"
    }
})

