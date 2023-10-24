import React from 'react';
import {createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';
import Landing from '../src/screen/Landing';
import Login from '../src/screen/Login';
import SignUp from '../src/screen/SignUp';
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
const AuthNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Landing'
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
            <Stack.Screen name="Landing" component={Landing}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            
        </Stack.Navigator>
    )
}

export default AuthNavigator;