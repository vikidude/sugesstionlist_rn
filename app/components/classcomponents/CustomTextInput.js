import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');

export default class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  setBorder = () => {
    this.text.setNativeProps({
      borderColor: '#FF752C',
      borderWidth: 2

    });
    this.text1.setNativeProps({
      style: { color: '#FF752C' }
    });
  }
  onoutFocus = () => {
    this.text.setNativeProps({
      borderColor: "black",
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    });
    this.text1.setNativeProps({
      style: { color: this.props.textColor || "#10153D"}
    });
  }
  render() {
    return (
      <View style={{ marginTop: 8 }}>
        <Text
          ref={component => (this.text1 = component)}
          style={{
            color: this.props.textColor || "#10153D",
            fontWeight: this.props.fontWeight,
            fontSize: this.props.fontSize,
          }}>
          {this.props.labeltitle}
        </Text>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            ref={component => (this.text = component)}
            spellCheck={false}
            autoCorrect={false}
            style={{
              height: this.props.height || 45,
              width: this.props.width || width / 1 - 10,
              borderColor: this.props.borderColor,
              borderWidth: 1,
              textTransform:this.props.textTransform || 'none',
            }}
            placeholder={this.props.placeHolderTitle}
            onChangeText={text => this.props.onTextChanged(text)}
            value={this.props.textInputValue}
            keyboardType={this.props.keyboardtype}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            maxLength={this.props.maxLength}
            secureTextEntry={this.props.secureTextEntry}
            multiline={this.props.multiline || false}
            textAlignVertical='top'
            onFocus={() => {
              if (this.props.showHighlight) {
                this.setBorder();
              }
            }
            }
            onBlur={() => {
              if (this.props.showHighlight) {
                this.onoutFocus();
              }
              if (this.props.secureTextEntry) {
                this.props.validate();
              }
            }
            }
          />
        </View>
      </View>
    );
  }

}