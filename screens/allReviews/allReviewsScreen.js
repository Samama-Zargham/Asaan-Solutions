import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, FlatList, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

const reviewsList = [
    {
        id: 'review1',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'Samama',
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
        name: 'Mohsin',
        rating: 4.0,
        review: 'Decent work. Speed are amazing.',
    },
    {
        id: 'review4',
        image: require('../../assets/images/user/user_7.jpg'),
        name: 'Ahmed',
        rating: 5.0,
        review: 'Nice experience. Book again.',
    },
    {
        id: 'review5',
        image: require('../../assets/images/user/user_8.jpg'),
        name: 'Ans',
        rating: 5.0,
        review: 'Fantastic service.',
    },
    {
        id: 'review6',
        image: require('../../assets/images/user/user_5.jpg'),
        name: 'Fazal',
        rating: 3.0,
        review: 'Decent service.',
    },
    {
        id: 'review7',
        image: require('../../assets/images/user/user_6.jpg'),
        name: 'Osama',
        rating: 5.0,
        review: 'Amazing work.',
    },
    {
        id: 'review8',
        image: require('../../assets/images/user/user_6.jpg'),
        name: 'Ali imran',
        rating: 5.0,
        review: 'Amazing work.',
    },
    {
        id: 'review9',
        image: require('../../assets/images/user/user_2.jpg'),
        name: 'Bilal khan',
        rating: 5.0,
        review: 'Nice work. Clean and super fast.',
    },
];

class AllReviewsScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.reviews()}
                </View>
            </SafeAreaView>
        )
    }

    reviews() {
        const renderItem = ({ item }) => (
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
        )
        return (
            <FlatList
                data={reviewsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            />
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

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.pop()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    All Reviews
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
    reviewWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        flexDirection: 'row',
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    userNameAndRatingWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding - 3.0
    },
});

AllReviewsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(AllReviewsScreen);

