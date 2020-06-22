import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { StatusBar, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Login from './app/scenes/Login';
import SignUp from './app/scenes/SignUp';
import SugesstionList from './app/scenes/SuggesstionList';

console.disableYellowBox = true;

const FadeTransition = (index, position) => {
    const sceneRange = [index - 1, index];
    const outputOpacity = [0, 1];
    let transition = position.interpolate({
        inputRage: sceneRange,
        outputRange: outputOpacity,
    });
    return {
        opacity: transition,
    };
};

const AppNavigation = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
        SignUp: {
            screen: SignUp
        },
        SugesstionList: {
            screen: SugesstionList,
        },
    },

    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            headerShown: false,
            ...TransitionPresets.NavigationOptions,
        },
    },
);

let Navigation = createAppContainer(AppNavigation);

class AppNavigator extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Navigation />
        );
    }
}

const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? hp('5.5%') : hp('1%');

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
});

export default AppNavigator;