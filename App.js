import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import allReviewsScreen from "./screens/allReviews/allReviewsScreen";
import upcomingBookingDetailScreen from "./screens/upcomingBookingDetail/upcomingBookingDetailScreen";
import bookingSuccessScreen from "./screens/bookingScuccess/bookingSuccessScreen";
import professionalServicesScreen from "./screens/professionalServices/professionalServicesScreen";
import searchScreen from "./screens/search/searchScreen";
import selectAddressScreen from "./screens/selectAddress/selectAddressScreen";
import selectDateAndTimeScreen from "./screens/selectDateAndTime/selectDateAndTimeScreen";
import serviceProviderScreen from "./screens/serviceProvider/serviceProviderScreen";
import serviceProvideListScreen from "./screens/serviceProviderList/serviceProvideListScreen";
import pastBookingDetailScreen from "./screens/pastBookingDetail/pastBookingDetailScreen";
import rateProviderScreen from "./screens/rateProvider/rateProviderScreen";
import cancelledBookingDetailScreen from "./screens/cancelledBookingDetail/cancelledBookingDetailScreen";
import messageScreen from "./screens/message/messageScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import favoriteScreen from "./screens/favorite/favoriteScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import privacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import termsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import supportScreen from "./screens/support/supportScreen";
import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
import otpScreen from "./screens/auth/otpScreen";
import splashScreen from "./screens/splashScreen";
import Map from "./screens/Map";
const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Splash: splashScreen,
  mainFlow: createStackNavigator({
    Login: loginScreen,
    Register: registerScreen,
    Otp: otpScreen,
    BottomTabBar: bottomTabBarScreen,
    ProfessionalServices: professionalServicesScreen,
    ServiceProviderList: serviceProvideListScreen,
    ServiceProvider: serviceProviderScreen,
    AllReviews: allReviewsScreen,
    SelectDateAndTime: selectDateAndTimeScreen,
    SelectAddress: selectAddressScreen,
    BookingSuccess: bookingSuccessScreen,
    Search: searchScreen,
    UpcomingBookingDetail: upcomingBookingDetailScreen,
    PastBookingDetail: pastBookingDetailScreen,
    RateProvider: rateProviderScreen,
    CancelledBookingDetail: cancelledBookingDetailScreen,
    Message: messageScreen,
    EditProfile: editProfileScreen,
    Favorite: favoriteScreen,
    Notifications: notificationsScreen,
    PrivacyPolicy: privacyPolicyScreen,
    TermsOfUse: termsOfUseScreen,
    Support: supportScreen,
    Map: Map,
  }),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
