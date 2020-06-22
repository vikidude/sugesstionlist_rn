import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontScale from '../../fontSize/FontScale';

const Loader = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <ActivityIndicator color={props.loader_color} size='large' />
            <Text style={{ marginVertical: hp('2%'), fontSize: FontScale(16) }}>{props.loader_text}</Text>
        </View>
    );
}
export default Loader;