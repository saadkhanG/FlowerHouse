import React from 'react';
import {createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';

import HomeScreen from '../src/screen/HomeScreen';
import DetailScreen from '../src/screen/DetailScreen';
import UserProfile from '../src/screen/UserProfile';
import Notifications from '../src/screen/Notifications';
import OrderHistory from '../src/screen/OrderHistory';
import Settings from '../src/screen/Settings';
import PreviousOrders from '../src/screen/PreviousOrders';
import Testing from '../src/screen/Testing';
import Accountinfo from '../src/screen/Accountinfo';
import Editinfo from '../src/screen/Editinfo';
import AddReview from '../src/screen/AddReview';
import OrderDetails from '../src/screen/OrderDetails';
import SubmitReview from '../src/screen/SubmitReview';
import ViewUserReviews from '../src/screen/ViewUserReviews';
import MyAllReviews from '../src/screen/MyAllReviews';
import CancelOrder from '../src/screen/CancelOrder';
import Images from '../src/screen/Images';
import { Easing } from 'react-native'


const Stack = createStackNavigator();

const config ={
    animation: 'spring',
    config:{
        stiffness: 1000,
        damping:50,
        mass:3,
        overshootClamping:false,
        restDisplacementThreshold:0.01,
        restSpeedThreshold:0.01,
    },
};
const closeConfig = {
    animation : 'timing',
    config:{
        duration:250,
        easing: Easing.linear,
    }
}
const Mainnav = () => {
    return(
        <Stack.Navigator 
        screenOptions={{
            headerShown : false ,
            gestureEnabled:true,
            gestureDirection: "horizontal",
            cardStyleInterpolator :CardStyleInterpolators.forHorizontalIOS,
            transitionSpec:{
                open: closeConfig,
                close: closeConfig
            }
            }} >
            
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="DetailScreen" component={DetailScreen}/>
            <Stack.Screen name="UserProfile" component={UserProfile}/>
            <Stack.Screen name="Notifications" component={Notifications}/>
            <Stack.Screen name="OrderHistory" component={OrderHistory}/>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="PreviousOrders" component={PreviousOrders}/>
            <Stack.Screen name="Testing" component={Testing}/>
            <Stack.Screen name="Accountinfo" component={Accountinfo}/>
            <Stack.Screen name="Editinfo" component={Editinfo}/>
            <Stack.Screen name="AddReview" component={AddReview}/>
            <Stack.Screen name="OrderDetails" component={OrderDetails}/>
            <Stack.Screen name="SubmitReview" component={SubmitReview}/>
            <Stack.Screen name="ViewUserReviews" component={ViewUserReviews}/>
            <Stack.Screen name="MyAllReviews" component={MyAllReviews}/>
            <Stack.Screen name="CancelOrder" component={CancelOrder}/>
            <Stack.Screen name="Images" component={Images}/>
        </Stack.Navigator>
    )
}

export default Mainnav;