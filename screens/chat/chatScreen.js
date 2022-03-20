import React from "react";
import { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";

const userList = [
    {
        id: '1',
        image: require('../../assets/images/provider/provider_1.jpg'),
        name: 'Ali',
        about: 'Hello, How can i help you?',
        seen: '1d ago',
        isReadable: true,
    },
    {
        id: '2',
        image: require('../../assets/images/provider/provider_2.jpg'),
        name: 'Behroz Khan',
        about: 'Okay',
        seen: '1d ago',
        isReadable: false,
    },
    {
        id: '3',
        image: require('../../assets/images/provider/provider_3.jpg'),
        name: 'Shan ali',
        about: 'Good',
        seen: '5d ago',
        isReadable: false,
    },
    {
        id: '4',
        image: require('../../assets/images/provider/provider_4.jpg'),
        name: 'Bilal khan',
        about: 'Thank you.',
        seen: '1w ago',
        isReadable: false,
    },
    {
        id: '5',
        image: require('../../assets/images/provider/provider_5.jpg'),
        name: 'Samama Zargham',
        about: 'Hello, How can i help you?',
        seen: '1d ago',
        isReadable: true,
    },
    {
        id: '6',
        image: require('../../assets/images/provider/provider_6.jpg'),
        name: 'Mohsin Wajid',
        about: 'Okay',
        seen: '1d ago',
        isReadable: false,
    },
    {
        id: '7',
        image: require('../../assets/images/provider/provider_7.jpg'),
        name: 'Osama',
        about: 'Nice work.',
        seen: '5d ago',
        isReadable: false,
    },
    {
        id: '8',
        image: require('../../assets/images/provider/provider_8.jpg'),
        name: 'Sani ali',
        about: 'Come fast.',
        seen: '1w ago',
        isReadable: false,
    },
    {
        id: '9',
        image: require('../../assets/images/provider/provider_9.jpg'),
        name: 'Koshan kumaar',
        about: 'Okay.',
        seen: '1w ago',
        isReadable: false,
    },
];

const { width } = Dimensions.get('screen');

class ChatsScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View>
                    {this.header()}
                    {this.users()}
                </View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Chats
                </Text>
            </View>
        )
    }

    users() {
        const renderItem = ({ item }) => (
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('Message', { name: item.name })}
                    style={styles.userInfoWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={item.image}
                            style={styles.userImageStyle}
                            resizeMode="cover"
                        />
                        <View style={{
                            width: width - 190,
                            marginLeft: Sizes.fixPadding,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...Fonts.blackColor16Medium }}>
                                    {item.name}
                                </Text>
                                {item.isReadable ?
                                    <View style={styles.isReadableUserHintStyle}>
                                    </View> : null
                                }
                            </View>

                            <Text numberOfLines={1}
                                style={{
                                    ...Fonts.grayColor14Medium,
                                    marginTop: Sizes.fixPadding - 3.0
                                }}
                            >
                                {item.about}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ ...Fonts.grayColor14Medium }}>
                        {item.seen}
                    </Text>
                </TouchableOpacity>
                <View style={styles.dividerStyle}>
                </View>
            </View>
        )
        return (
            <FlatList
                data={userList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 10.0
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 56.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 40.0,
        alignSelf: 'center',
        alignItems: 'center'
    },
    isReadableUserHintStyle: {
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
        backgroundColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding - 7.0,
    },
    userImageStyle: {
        height: 70.0,
        width: 70.0,
        borderRadius: 40.0,
        borderColor: 'rgba(70, 103, 213, 0.5)',
        borderWidth: 1.0,
    },
    dividerStyle: {
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        height: 0.8,
        marginVertical: Sizes.fixPadding + 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
})

export default withNavigation(ChatsScreen);