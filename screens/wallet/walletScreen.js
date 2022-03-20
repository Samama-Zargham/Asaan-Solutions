import React from "react";
import { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, BackHandler, Image, ScrollView } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';

class WalletScreen extends Component {

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
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.cashInfo()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{
                            backgroundColor: 'rgba(128, 128, 128, 0.2)',
                            paddingTop: Sizes.fixPadding * 2.0
                        }}>
                            {this.shareCodeInfo()}
                            {this.referralCodeInfo()}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    referralCodeInfo() {
        return (
            <View style={{ padding: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Your referral code
                    </Text>
                    <View style={styles.referralCodeWrapStyle}>
                        <Text style={{
                            ...Fonts.orangeColor14Medium,
                            marginRight: Sizes.fixPadding * 6.0
                        }}>
                            UBCC015
                        </Text>
                        <MaterialIcons name="content-copy" size={22} color={Colors.orangeColor} />
                    </View>
                </View>
                <View style={styles.shareOptionsWrapStyle}>
                    <View style={styles.shareWithWhatsAppWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            Whatsapp
                        </Text>
                        <MaterialCommunityIcons name="whatsapp" size={24} color={Colors.whiteColor} />
                    </View>
                    <View style={styles.shareWithMoreOptionsWrapStyle}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            More Options
                        </Text>
                        <MaterialIcons name="share" size={24} color="black" />
                    </View>
                </View>
            </View>
        )
    }

    shareCodeInfo() {
        return (
            <View style={{ backgroundColor: Colors.bodyBackColor, paddingHorizontal: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16Bold, marginBottom: Sizes.fixPadding - 5.0 }}>
                    Share code & save at least 25%
                </Text>
                <Text style={{ ...Fonts.grayColor14Medium, textAlign: 'justify' }}>
                    Your friend gets $5 UrbanHome cash on sign up. You get $5when they complete a booking of $15 or more within 21 days. You can earn upto $20 UrbanHome Cash.                </Text>
            </View>
        )
    }

    cashInfo() {
        return (
            <View style={{
                backgroundColor: '#100495',
                height: 160.0,
                paddingHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text
                    style={{
                        ...Fonts.yellowColor35Bold,
                        paddingTop: Sizes.fixPadding * 2.0,
                    }}
                >
                    $15
                </Text>
                <Image
                    source={require('../../assets/images/coin.png')}
                    style={styles.coinImageWrapStyle}
                    resizeMode="cover"
                />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    UrbanHome Cash
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56.0,
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
    },
    referralCodeWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding - 1.0,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding + 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding
    },
    shareWithWhatsAppWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2AB640',
        borderRadius: Sizes.fixPadding,
        flex: 0.47,
        paddingVertical: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding,
    },
    shareWithMoreOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        flex: 0.47,
        paddingVertical: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
    },
    shareOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding
    },
    coinImageWrapStyle: {
        height: 135.0,
        width: 170.0,
        position: 'absolute',
        right: 20.0,
        bottom: 0.0,
    }
})

export default withNavigation(WalletScreen);