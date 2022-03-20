import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, BackHandler, Text, TextInput, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

const recentSearchesList = [
    {
        id: '1',
        search: 'Home cleaning service',
    },
    {
        id: '2',
        search: 'Electrician',
    },
];

const trendingSearchesList = [
    {
        id: '1',
        search: 'Sofa cleaning services',
    },
    {
        id: '2',
        search: 'Head massage services',
    },
    {
        id: '3',
        search: 'Plumber',
    },
    {
        id: '4',
        search: 'Hair cutting at home',
    },
    {
        id: '5',
        search: 'Ac repair services',
    },
    {
        id: '6',
        search: 'Home sanitizing',
    },
];

class SearchScreen extends Component {

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
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.backArrow()}
                    {this.searchTextField()}
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {this.recentSearches()}
                        {this.trendingSearches()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    trendingSearches() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.blackColor16Bold, marginBottom: Sizes.fixPadding, }}>
                    Trending around you
                </Text>
                {
                    trendingSearchesList.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: Sizes.fixPadding - 5.0
                            }}>
                                <MaterialIcons name="trending-up" size={21} color={Colors.grayColor} />
                                <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                                    {item.search}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    recentSearches() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Bold, marginBottom: Sizes.fixPadding, }}>
                    Your recent searches
                </Text>
                {
                    recentSearchesList.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: Sizes.fixPadding - 5.0
                            }}>
                                <MaterialIcons name="history" size={21} color={Colors.grayColor} />
                                <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding }}>
                                    {item.search}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color="black"
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding
                }}
                onPress={() => this.props.navigation.pop()}
            />
        )
    }

    searchTextField() {
        return (
            <View style={styles.searchTextFieldWrapStyle}>
                <MaterialIcons name="search" size={24}
                    style={{ marginRight: Sizes.fixPadding }}
                    color={Colors.grayColor} />
                <TextInput
                    placeholder=" Search for a service"
                    style={{
                        ...Fonts.blackColor16Medium,
                        flex: 1,
                    }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchTextFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#d3d3d3',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        height: 40.0,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0
    },
});

SearchScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.ModalSlideFromBottomIOS,
    }
}

export default withNavigation(SearchScreen);

