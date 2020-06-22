import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
const EllipticalButton = (props) => {

  return (
    <View>
      <TouchableHighlight onPress={() => props.ellipfunc()} style={{
        width: props.width,
        height: props.height,
        backgroundColor: props.color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: props.borderWidth || 0,
        borderColor: props.borderColor || 'black'
      }}
        disabled={props.disabled || false}
      >
        <Text
          style={{
            fontWeight: props.fontWeight,
            textAlign: 'center',
            color: props.fontColor || 'white',
            fontSize: props.fontSize,
            textDecorationLine: props.textDecorationLine || 'none'
          }}>
          {props.ellipbuttontext}
        </Text>
      </TouchableHighlight>
    </View>
  );

}
export default EllipticalButton;