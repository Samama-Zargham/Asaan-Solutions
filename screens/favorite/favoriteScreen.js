import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Animated,
    BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';

const favoriteServiceProviderList = [
    {
        key: '1',
        image: require('../../assets/images/provider/provider_2.jpg'),
        name: 'Ans Shakeel',
        jobCount: 205,
        ratePerHour: 12,
        rating: 4.6,
    },
    {
        key: '2',
        image: require('../../assets/images/provider/provider_4.jpg'),
        name: 'Samama Zargham',
        jobCount: 297,
        ratePerHour: 17,
        rating: 4.9,
    },
    {
        key: '3',
        image: require('../../assets/images/provider/provider_6.jpg'),
        name: 'Uzair Jalil',
        jobCount: 150,
        ratePerHour: 13,
        rating: 4.2,
    },
];

class FavoriteScreen extends Component {

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
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                {this.header()}
                <FavoriteList navigation={this.props.navigation} />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Favorite
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    style={{ position: 'absolute', left: 20.0 }}
                    onPress={() => this.props.navigation.pop()}
                />
            </View>
        )
    }
}

const rowSwipeAnimatedValues = {};

Array(favoriteServiceProviderList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const FavoriteList = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(favoriteServiceProviderList);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.bodyBackColor }}
            activeOpacity={0.9}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('ServiceProvider', { item: data.item })}
                style={styles.serviceProvidersWrapStyle}>
                <Image
                    source={data.item.image}
                    style={{
                        height: 100.0, width: 100.0,
                        borderRadius: Sizes.fixPadding,
                    }}
                    resizeMode="cover"
                />
                <View style={{ justifyContent: 'space-between', flex: 1, marginLeft: Sizes.fixPadding }}>
                    <View>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {data.item.name}
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
                                {data.item.jobCount}
                            </Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...Fonts.grayColor12Bold }}>
                                Rate
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Bold }}>
                                ${data.item.ratePerHour}/hr
                            </Text>
                        </View>

                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ ...Fonts.grayColor12Bold }}>
                                Rating
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="star" size={15} color={Colors.orangeColor} />
                                <Text style={{ ...Fonts.blackColor14Bold }}>
                                    {data.item.rating.toFixed(1)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.backDeleteWrapStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }}
                    />
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Delete
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {
                listData.length == 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="favorite-border" size={46} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor16Bold, marginTop: Sizes.fixPadding + 5.0 }}>
                            No item in favorite
                        </Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-100}
                            onSwipeValueChange={onSwipeValueChange}
                            contentContainerStyle={{
                                paddingVertical: Sizes.fixPadding * 2.0,
                            }}
                        />
                    </View>
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor12Medium }}>
                    Service provider removed from favorite
                </Text>
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 56.0,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
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
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    },
    backDeleteWrapStyle: {
        alignItems: 'center',
        bottom: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: -2,
        width: 90,
        backgroundColor: Colors.redColor,
        right: 0,
    },
})

FavoriteScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(FavoriteScreen);