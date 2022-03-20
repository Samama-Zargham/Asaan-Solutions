import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { CancelledDataList } from "../../components/bookingDataList";
import { Colors, Sizes, Fonts } from "../../constant/styles";

const BookingCancelledScreen = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('CancelledBookingDetail')}
                style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding * 2.0 }}>
                <View style={styles.circleStyle}>
                    <Text style={{ textAlign: 'center', ...Fonts.redColor14Medium }}>
                        {item.date}
                    </Text>
                </View>
                <View style={{ marginLeft: Sizes.fixPadding, justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {item.time}
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        {item.person}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor14Regular }}>
                        {item.profession}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ backgroundColor: Colors.grayColor, height: 1.0, }} />
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <FlatList
                data={CancelledDataList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    circleStyle: {
        height: 90.0,
        width: 90.0,
        borderRadius: 45.0,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: Colors.redColor,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10.0,
    },
})

export default BookingCancelledScreen;