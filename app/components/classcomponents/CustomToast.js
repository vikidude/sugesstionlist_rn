'use strict';
import {
  StyleSheet,
  Easing,
  Text,
  View,
  Animated,
} from 'react-native';
import React, { Component } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class CustomToast extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.animation = this.animatedValue.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [-350, -10, 0],
    });
  }

  callToast = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(this.closeToast());
  };

  closeToast = () => {
    setTimeout(() => {
      Animated.timing(this.animatedValue, {
        toValue: -70,
        duration: 650,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }, 2000);
  };
  componentDidMount() { }
  render() {
    if (this.props.showToast == true) {
      this.callToast();
    }
    return (
      <View style={{}}>
        {this.props.showToast == true ? (
          <Animated.View
            style={{
              transform: [{ translateY: this.animation }],
              height: hp('9%'),
              width: wp('100%'),
              backgroundColor: this.props.toastColor || 'black',
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginLeft: 10,
                color: this.props.toastTextcolor || 'white',
                fontSize: 16,
                fontFamily: 'Europa-Bold',
                paddingVertical: hp('1%'),
                textAlign: 'center',
              }}>
              {this.props.message}
            </Text>
          </Animated.View>
        ) : []}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
