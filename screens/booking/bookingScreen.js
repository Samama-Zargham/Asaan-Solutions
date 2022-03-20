import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, useWindowDimensions, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts } from "../../constant/styles";
import { TabView, TabBar } from 'react-native-tab-view';
import { UpcomingDataList, CancelledDataList, PastDataList } from "../../components/bookingDataList";
import UpcomingBookingScreen from "../../screens/upcomingBooking/upcomingBookingScreen";
import CancelledBookingScreen from "../../screens/cancelledBooking/cancelledBookingScreen";
import PastBookingScreen from "../../screens/pastBooking/pastBookingScreen";

class BookingScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.header()}
                    <Bookings navigation={this.props.navigation} />
                </View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Bookings
                </Text>
            </View>
        )
    }
}

const Bookings = ({ navigation }) => {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'first', title: 'Upcoming', },
        { key: 'second', title: 'Past' },
        { key: 'third', title: 'Cancelled', },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <UpcomingBookingScreen jumpTo={jumpTo} navigation={navigation} />;
            case 'second':
                return <PastBookingScreen jumpTo={jumpTo} navigation={navigation} />;
            case 'third':
                return <CancelledBookingScreen jumpTo={jumpTo} navigation={navigation} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.primaryColor, height: 3.0 }}
                    tabStyle={{ width: layout.width / 3, }}
                    style={{ backgroundColor: 'white' }}
                    renderLabel={({ route }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ ...Fonts.blackColor14Bold, marginRight: 5.0 }}>
                                {route.title}
                            </Text>
                            <View style={styles.listItemCountWrapStyle}>
                                {route.title == 'Upcoming' ?
                                    <Text style={{ ...Fonts.whiteColor14Medium }}>{UpcomingDataList.length}</Text> :
                                    route.title == 'Past' ?
                                        <Text style={{ ...Fonts.whiteColor14Medium }}>{PastDataList.length}</Text> :
                                        <Text style={{ ...Fonts.whiteColor14Medium }}>{CancelledDataList.length}</Text>
                                }
                            </View>
                        </View>
                    )}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 56.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItemCountWrapStyle: {
        width: 24.0,
        height: 24.0,
        borderRadius: 12.5,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default withNavigation(BookingScreen);

