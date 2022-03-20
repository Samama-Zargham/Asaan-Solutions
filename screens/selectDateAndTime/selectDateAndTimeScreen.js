import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, BackHandler, Text, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import CalendarStrip from 'react-native-calendar-strip';

const slots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

class SelectDateAndTimeScreen extends Component {

    componentDidMount() {
        this.calender();
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
        selectedSlot: slots[0],
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.calender()}
                    {this.divider()}
                    {this.slotInfo()}
                    {this.continueButton()}
                </View>
            </SafeAreaView>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('SelectAddress')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    slotInfo() {
        return (
            <View>
                <Text style={{
                    ...Fonts.blackColor16Bold,
                    marginVertical: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0
                }}>
                    {slots.length} Slots
                </Text>
                <FlatList
                    data={slots}
                    keyExtractor={(index) => `${index}`}
                    renderItem={this.renderItem}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0
                    }}
                />
            </View>
        )
    }

    divider() {
        return (
            <View style={styles.dividerStyle} />
        )
    }

    calender() {
        return (
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: Colors.primaryColor, }}
                style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                calendarHeaderStyle={{ color: Colors.blackColor, marginBottom: Sizes.fixPadding + 5.0 }}
                calendarColor={'transparent'}
                dateNumberStyle={{ ...Fonts.blackColor14Medium }}
                dateNameStyle={{ ...Fonts.blackColor14Medium }}
                highlightDateNumberStyle={{ ...Fonts.whiteColor14Medium }}
                highlightDateNameStyle={{ ...Fonts.whiteColor14Medium }}
                scrollable={true}
                upperCaseDays={false}
                datesBlacklist={this.datesBlacklistFunc}
                disabledDateNameStyle={{ ...Fonts.grayColor14Medium }}
                disabledDateNumberStyle={{ ...Fonts.grayColor14Medium }}
                useIsoWeekday={false}
            />
        )
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => { this.setState({ selectedSlot: item }) }} >
                <View style={{
                    backgroundColor: this.state.selectedSlot == item ? Colors.primaryColor : Colors.whiteColor,
                    borderColor: this.state.selectedSlot == item ? Colors.primaryColor : Colors.grayColor,
                    ...styles.slotWrapStyle,
                }}>
                    <Text style={
                        (this.state.selectedSlot == item) ?
                            { ...Fonts.whiteColor14Medium }
                            :
                            { ...Fonts.primaryColor14Medium }}
                    >
                        {item}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    datesBlacklistFunc = date => {
        return date.isoWeekday() === 7;
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.pop()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Select date & time
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
    slotWrapStyle: {
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding * 2.0,
        height: 40.0,
        flex: 1
    },
    dividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        marginVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    continueButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

SelectDateAndTimeScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SelectDateAndTimeScreen);

