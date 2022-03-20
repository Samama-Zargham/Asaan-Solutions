import React, { useState, useRef, Component } from 'react';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
    BackHandler
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

const notificationsList = [
    {
        key: '1',
        name: 'Booking Confirm',
        description: 'Congratulation... Your booking has been confirmed',

    },
    {
        key: '2',
        name: 'Invite your friend and earn upto $20',
        description: 'Share your referral code with your friends and earn upto $20.',
    },
];

class NotificationsScreen extends Component {

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
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <Notification navigation={this.props.navigation} />
            </SafeAreaView>
        )
    }
}

const rowTranslateAnimatedValues = {};

const Notification = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.name} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <MaterialIcons name="notifications" size={24} color={Colors.whiteColor} />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding + 5.0, width: width - 125 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Bold }}>
                            {data.item.name}
                        </Text>
                        <Text numberOfLines={2} style={{ ...Fonts.blackColor14Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24}
                    color="black"
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    Notifications
                </Text>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.bodyBackColor, flex: 1 }}>
            {header()}
            {listData.length == 0 ?
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <MaterialIcons name="notifications-off" size={46} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.grayColor16Bold, marginTop: Sizes.fixPadding + 5.0 }}>
                        No new notifications
                    </Text>
                </View>
                :
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 2.0 }}
                />
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor12Medium }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
    },
    notificationWrapStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'rgba(128, 128, 128, 0.05)',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 2.0,
        padding: Sizes.fixPadding,
    },
    notificationIconWrapStyle: {
        height: 40.0,
        width: 40.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 20.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.redColor,
        flex: 1,
        marginTop: Sizes.fixPadding - 3.0,
        marginBottom: Sizes.fixPadding + 3.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    }
});

NotificationsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(NotificationsScreen);