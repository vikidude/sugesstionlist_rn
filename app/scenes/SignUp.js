import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import EllipticalButton from '../components/functionalcomponents/EllipticalButton';
import CustomTextInput from '../components/classcomponents/CustomTextInput';
import CustomToast from '../components/classcomponents/CustomToast';
import { Dropdown } from 'react-native-material-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontScale from '../fontSize/FontScale';
import Loader from '../components/functionalcomponents/Loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      emailId: "",
      password: "",
      dateOfBirth: new Date(),
      dobPrivacy: "Choose One",
      gender: "Choose One",
      os: Platform.OS,
      showtoast: false,
      toastMessage: "",
      showDatepicker: false,
      onbehalf: 'ChooseOne',
      modalVisible: false,
    };

  }

  onTextChanged = (txt, field) => {
    switch (field) {
      case "fullName":
        this.setState({ fullName: txt });
        break;
      case "emailId":
        this.setState({ emailId: txt });
        break;
      case "password":
        this.setState({ password: txt });
        break;
      case "dateOfBirth":
        this.setState({ dateOfBirth: txt });
        break;
      case "dobPrivacy":
        this.setState({ dobPrivacy: true });
        break;
      case "gender":
        this.setState({ gender: txt });
        break;
      default:
        break;
    }
  }

  userRegister = () => {
    var registerData = {
      fullName: this.state.fullName,
      emailId: this.state.emailId,
      password: this.state.password,
      dateOfBirth: this.state.dateOfBirth,
      dobPrivacy: this.state.dobPrivacy,
      gender: this.state.gender,
      os: this.state.os,
    }
    console.log(registerData)
    axios.post('https://devapi.mocialface.com/api/v1.0/users/signup', registerData).then((response) => {
      console.log('User Signup response: ', response.data.msg);
      this.setState({showtoast:true,toastMessage:'User Registered Successfully!'});
    }).catch(error => {
      console.log('User Signup fail : ', error.response);
    })
  }

  getDropdown = (value, index, data) => {
    this.setState({ dobPrivacy: value });
  }
  getGender = (value, index, data) => {
    this.setState({ gender: value });
  }

  onDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      let date = new Date(selectedDate);
      let dateValue = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getUTCDate();
      this.setState({
        showDatepicker: false,
        dateOfBirth: dateValue
      });
      Keyboard.dismiss();
      this.setState({ showDatepicker: false });
    }
  };

  pickerFocus(type) {
    this.DateRef.setNativeProps({
      borderWidth: 2,
      borderColor: '#fc8102'
    });
    this.textDateRef.setNativeProps({
      style: { color: '#fc8102' }
    });
    this.setState({ showDatepicker: true });
  }

  pickerBlur(type) {
    this.DateRef.setNativeProps({
      borderWidth: 1,
      borderColor: 'grey'
    })
    this.textDateRef.setNativeProps({
      style: { color: '#10153D' }
    })
    this.setState({ showDatepicker: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} enableOnAndroid={true} extraHeight={hp('16%')}>
          <View
            style={{
              width: wp('91%'),
              backgroundColor: 'white',
              height: null,
              marginTop: hp('3%'),
              alignItems: 'center',
              alignSelf: 'center',
              paddingBottom: hp("3%")
            }}>
            {/* top box */}
            <View
              style={{
                flexDirection: 'column',
                marginTop: hp('3%'),
                paddingLeft: wp('1%'),
                width: wp('80%'),

              }}>
              <Text
                style={{
                  color: '#10153D',
                  fontSize: FontScale(24),
                  fontFamily: 'Europa-Bold',
                  marginBottom: '2%',

                }}>
                Registration
                </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>

              <View style={{ paddingTop: hp('.5%') }}>
                <CustomTextInput
                  height={hp('5.5%')}
                  type="default"
                  width={wp('80%')}
                  onTextChanged={text =>
                    this.onTextChanged(text, 'fullName')
                  }
                  labeltitle="Full Name"
                  textInputValue={this.state.fullName}
                  placeHolderTitle={"Full Name"}
                  color="#BEBEBE"
                  textColor="#10153D"
                  fontWeight="900"
                  showHighlight={true}
                  borderColor={'grey'}
                  fontSize={FontScale(16)}
                  fontFamily={'Europa-Regular'}

                  keyboardtype={'email-address'}
                />
              </View>
              <View style={{ paddingTop: hp('0.5%') }}>
                <CustomTextInput
                  height={hp('5.5%')}
                  type="default"
                  width={wp('80%')}
                  onTextChanged={text =>
                    this.onTextChanged(text, 'emailId')
                  }
                  labeltitle="Email"
                  textInputValue={this.state.emailId}
                  color="#BEBEBE"
                  textColor="#10153D"
                  placeHolderTitle={"Email"}
                  fontWeight="900"
                  showHighlight={true}
                  borderColor={'grey'}
                  fontSize={FontScale(16)}
                  fontFamily={'Europa-Regular'}
                  keyboardtype={'email-address'}
                />
              </View>

              <View style={{ paddingTop: hp('.5%') }}>
                <CustomTextInput
                  height={hp('5.5%')}
                  type="default"
                  width={wp('80%')}
                  onTextChanged={text =>
                    this.onTextChanged(text, 'password')
                  }
                  labeltitle="Password"
                  textInputValue={this.state.password}
                  placeHolderTitle={"Password"}
                  color="#BEBEBE"
                  textColor="#10153D"
                  fontWeight="900"
                  showHighlight={true}
                  borderColor={'grey'}
                  fontSize={FontScale(16)}
                  fontFamily={'Europa-Regular'}

                  keyboardtype={'email-address'}
                />
              </View>

              <View style={{ marginVertical: hp('1.5%') }}>
                <Text
                  ref={component => (this.textDateRef = component)}
                  style={{
                    color: '#10153D',
                    fontWeight: '800',
                    fontSize: FontScale(16)
                  }}>
                  Date of Birth
                    </Text>
                <TextInput
                  ref={(component) => (this.DateRef = component)}
                  showSoftInputOnFocus={false}
                  onFocus={() => this.pickerFocus('DateRef')}
                  onBlur={() => this.pickerBlur('DateRef')}
                  value={(this.state.dateOfBirth).toString()}
                  placeholder='Enter date to pick one'
                  style={{
                    borderWidth: 1, borderColor: 'grey', textColor: '#10153D',
                    fontSize: FontScale(16), width: wp('75%'), height: hp('5.5%'), marginTop: hp('1.5%')
                  }}
                />
              </View>
              {this.state.showDatepicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={new Date(new Date(Date.now()))}
                  mode={'date'}
                  is24Hour={false}
                  display="calendar"
                  style={{ flex: 1, display: this.state.showDatepicker == false ? 'none' : 'show' }}
                  onChange={(event, selectedDate) => this.onDateChange(event, selectedDate)}
                />
              ) : null}

              <View style={{ paddingTop: hp('0.5%'), paddingBottom: hp('1%') }}>
                <View >
                  <Text style={{ color: '#10153D', fontSize: FontScale(16), fontFamily: 'Europa-Bold', paddingVertical: 10 }}>dobPrivacy</Text>
                </View>
                <Dropdown
                  dropdownOffset={{ top: 0 }}
                  data={[{ value: 'public' }, { value: 'private' }]}
                  containerStyle={{
                    width: wp('80%'),
                    height: hp('5.5%'),
                  }}
                  inputContainerStyle={{
                    height: null,
                    alignSelf: 'stretch',
                    paddingTop: hp('1%'),
                    paddingHorizontal: wp('2%'),
                    borderWidth: 1,
                    borderColor: 'grey',
                  }}
                  itemTextStyle={{
                    fontFamily: 'Europa-Regular'
                  }}
                  selectedItemColor={'#000033'}
                  itemColor={'black'}
                  rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  rippleOpacity={1}
                  pickerStyle={{
                    width: wp('92%'),
                    marginHorizontal: wp('2%'),
                    paddingHorizontal: wp('4%'),
                  }}
                  overlayStyle={{
                  }}
                  fontSize={FontScale(15)}
                  value={this.state.dobPrivacy}
                  baseColor="black"
                  onChangeText={(value, index, data) => this.getDropdown(value, index, data)}
                />
              </View>

              <View style={{ paddingTop: hp('0.5%'), paddingBottom: hp('1%') }}>
                <View >
                  <Text style={{ color: '#10153D', fontSize: FontScale(16), fontFamily: 'Europa-Bold', paddingVertical: 10 }}>Gender</Text>
                </View>
                <Dropdown
                  dropdownOffset={{ top: 0 }}
                  data={[{ value: 'male' }, { value: 'female' }, { value: 'other' }]}
                  containerStyle={{
                    width: wp('80%'),
                    height: hp('5.5%'),
                  }}
                  inputContainerStyle={{
                    height: null,
                    alignSelf: 'stretch',
                    paddingTop: hp('1%'),
                    paddingHorizontal: wp('2%'),
                    borderWidth: 1,
                    borderColor: 'grey',
                  }}
                  itemTextStyle={{
                    fontFamily: 'Europa-Regular'
                  }}
                  selectedItemColor={'#000033'}
                  itemColor={'black'}
                  rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  rippleOpacity={1}
                  pickerStyle={{
                    width: wp('92%'),
                    marginHorizontal: wp('2%'),
                    paddingHorizontal: wp('4%'),
                  }}
                  overlayStyle={{
                  }}
                  fontSize={FontScale(15)}
                  value={this.state.gender}
                  baseColor="black"
                  onChangeText={(value, index, data) => this.getGender(value, index, data)}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", paddingTop: hp('0.5%'), paddingBottom: hp('2%') }}>
              <EllipticalButton
                disabled={false}
                ellipfunc={() => this.userRegister()}
                height={hp('6%')}
                ellipbuttontext="SignUp"
                width={wp('80%')}
                color="#FF752C"
                fontColor={'white'}
                fontSize={FontScale(18)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingLeft: wp('5%') }}>
          <CustomToast
            toastColor={"#e1e1ea"}
            toastTextcolor={"#000033"}
            message={this.state.toastMessage}
            showToast={this.state.showtoast} style={{ position: "absolute" }} />
        </View>
      </View>
    );
  }
}
