import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, BackHandler, Image, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import CollapsingToolbar from "../../components/sliverAppBarScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const serviceIncludeList = [
    {
        id: 'service1',
        image: require('../../assets/images/service-include/service-include-1.jpg'),
        title: 'Deep Cleaning',
        description: 'Intensive cleaning for 3-4 hours of the entire house',
    },
    {
        id: 'service2',
        image: require('../../assets/images/service-include/service-include-2.jpg'),
        title: 'Professional Equipment',
        description: 'Industrial grade machines & chemicals used',
    },
    {
        id: 'service3',
        image: require('../../assets/images/service-include/service-include-3.jpg'),
        title: 'Safe and Hygienic',
        description: 'Professionals maintain social distancing, carry PPE kits & follow WHO guidelines on hygiene',
    },
];

const reviewsList = [
    {
        id: 'review1',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'Mohsin',
        rating: 5.0,
        review: 'Really Good Service. Book again.',
    },
    {
        id: 'review2',
        image: require('../../assets/images/user/user_3.jpg'),
        name: 'Ali',
        rating: 5.0,
        review: 'Best service ever seen.',
    },
    {
        id: 'review3',
        image: require('../../assets/images/user/user_4.jpg'),
        name: 'Samama',
        rating: 4.0,
        review: 'Decent work. Speed are amazing.',
    },
    {
        id: 'review4',
        image: require('../../assets/images/user/user_7.jpg'),
        name: 'Ahmad',
        rating: 5.0,
        review: 'Nice experience. Book again.',
    },
];

class ServiceProviderScreen extends Component {

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

    item = this.props.navigation.getParam('item');
    title = this.props.navigation.getParam('title');
    state = {
        showSnackBar: false,
        isFavorite: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <CollapsingToolbar
                        leftItem={
                            <View style={styles.backAndFavoriteButtonWrapStyle}>
                                <MaterialIcons
                                    name="arrow-back"
                                    size={24}
                                    color={Colors.blackColor}
                                    onPress={() => this.props.navigation.pop()}
                                />
                            </View>
                        }
                        rightItem={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ ...styles.backAndFavoriteButtonWrapStyle, marginRight: Sizes.fixPadding }}>
                                    <MaterialCommunityIcons name="message-outline" size={22}
                                        color={Colors.blackColor}
                                        onPress={() => this.props.navigation.push('Message', { name: this.item.name  })}
                                    />
                                </View>
                                <View style={styles.backAndFavoriteButtonWrapStyle}>
                                    <MaterialIcons
                                        name={this.state.isFavorite ? 'favorite' : "favorite-border"}
                                        size={24} color={Colors.blackColor}
                                        onPress={() => this.setState({ isFavorite: !this.state.isFavorite, showSnackBar: true })}
                                    />
                                </View>
                            </View>
                        }
                        toolbarColor={Colors.whiteColor}
                        toolBarMinHeight={40}
                        toolbarMaxHeight={414}
                        src={this.item.image}>
                        <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
                            {this.userInfo()}
                            {this.serviceIncludeInfo()}
                            {this.reviewsInfo()}
                            {this.viewAllReviewButton()}
                        </View>
                    </CollapsingToolbar>
                    {this.bookNowButton()}
                    <Snackbar
                        visible={this.state.showSnackBar}
                        onDismiss={() => this.setState({ showSnackBar: false })}
                        style={styles.snackBarStyle}
                    >
                        {
                            this.state.isFavorite
                                ?
                                'Added to favorite'
                                :
                                'Remove from favorite'
                        }
                    </Snackbar>
                </View>
            </SafeAreaView>
        )
    }

    bookNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('SelectDateAndTime')}
                style={styles.bookNowButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Book now
                </Text>
            </TouchableOpacity>
        )
    }

    viewAllReviewButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('AllReviews')}
                style={styles.viewAllReviewsButtonStyle}>
                <Text style={{ ...Fonts.primaryColor16Bold }}>
                    View all reviews
                </Text>
            </TouchableOpacity>
        )
    }

    reviewsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Bold, marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding + 5.0 }}>
                    Reviews
                </Text>
                {reviewsList.map((item, index) => (
                    <View key={`${item.id}`}>
                        <View style={styles.reviewWrapStyle}>
                            <Image
                                source={item.image}
                                style={{
                                    height: 60.0,
                                    width: 60.0,
                                    borderRadius: 30.0,
                                }}
                            />
                            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                                <View style={styles.userNameAndRatingWrapStyle}>
                                    <Text style={{ ...Fonts.blackColor14Bold }}>
                                        {item.name}
                                    </Text>
                                    {this.showRating({ number: item.rating })}
                                </View>
                                <Text style={{ ...Fonts.blackColor14Regular }}>
                                    {item.review}
                                </Text>
                            </View>
                        </View>
                    </View>
                )
                )}
            </View>
        )
    }

    showRating({ number }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.orangeColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.orangeColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.orangeColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.orangeColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0) ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.orangeColor}
                        />
                        :
                        null
                }
            </View>
        )
    }

    serviceIncludeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Bold, marginBottom: Sizes.fixPadding }}>
                    What does this service include?
                </Text>
                {
                    serviceIncludeList.map((item, index) => (
                        <View key={`${item.id}`}>
                            <View>
                                {index % 2 == 0
                                    ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image
                                            source={item.image}
                                            style={{
                                                height: 100.0,
                                                width: 100.0,
                                                borderRadius: Sizes.fixPadding,
                                            }}
                                        />
                                        <View style={{ marginLeft: Sizes.fixPadding, width: width - 150 }}>
                                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                                {item.title}
                                            </Text>
                                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                                {item.description}
                                            </Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ marginLeft: Sizes.fixPadding, width: width - 150 }}>
                                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                                {item.title}
                                            </Text>
                                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                                {item.description}
                                            </Text>
                                        </View>
                                        <Image
                                            source={item.image}
                                            style={{
                                                height: 100.0,
                                                width: 100.0,
                                                borderRadius: Sizes.fixPadding,
                                            }}
                                        />
                                    </View>
                                }
                                <View
                                    style={{
                                        backgroundColor: Colors.grayColor,
                                        height: 0.7,
                                        marginVertical: Sizes.fixPadding
                                    }}
                                />
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    userInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    {this.title ? this.title : this.item.name}
                </Text>
                <Text style={{
                    ...Fonts.grayColor14Medium
                }}>
                    Cleaner
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium, textAlign: 'justify', marginVertical: Sizes.fixPadding + 7.0 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus enim tellus ut mauris tristique ut odio massa. Vestibulum egestas fringilla et orci. Magna eget sed eu vel vitae mauris eget. Pulvinar maecenas aliquet scelerisque aliquam a iaculis.
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Bold, marginBottom: Sizes.fixPadding - 7.0 }}>
                            Jobs
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Bold }}>
                            {this.item.jobCount}
                        </Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Bold, marginBottom: Sizes.fixPadding - 7.0 }}>
                            Rate
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Bold }}>
                            ${this.item.ratePerHour}/hr
                        </Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Bold, marginBottom: Sizes.fixPadding - 7.0 }}>
                            Rating
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="star" size={15} color={Colors.orangeColor} />
                            <Text style={{ ...Fonts.blackColor14Bold }}>
                                {this.item.rating.toFixed(1)}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                {` (190)`}
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

ServiceProviderScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

const styles = StyleSheet.create({
    backAndFavoriteButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        flexDirection: 'row',
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0
    },
    userNameAndRatingWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding - 3.0
    },
    viewAllReviewsButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
    },
    snackBarStyle: {
        backgroundColor: '#333333',
        position: 'absolute',
        bottom: 40.0,
        left: -10.0,
        right: -10.0,
        elevation: 0.0
    },
    bookNowButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 50.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default withNavigation(ServiceProviderScreen);

