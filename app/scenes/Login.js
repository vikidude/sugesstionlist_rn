import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import EllipticalButton from '../components/functionalcomponents/EllipticalButton';
import CustomTextInput from '../components/classcomponents/CustomTextInput';
import CustomToast from '../components/classcomponents/CustomToast';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import global from '../const/index';
import Loader from '../components/functionalcomponents/Loader';
import FontScale from '../fontSize/FontScale';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",//"viki@gmail.com",
      passwrd: "",//"viki@123",
      showtoast: false,
      toastMessage: "",
      initialCheck:false,
      disable: true,
    };
  }


  onTextChanged = (txt, field) => {
    switch (field) {
      case "username":
        this.setState({ username: txt });
        this.checkValidation();
        break;
      case "passwrd":
        this.setState({ passwrd: txt });
        this.checkValidation();
        break;
      default:
        break;
    }
  }

  checkValidation(){
    console.log((this.state.username).trim());
    if((this.state.username).trim() !== "" && (this.state.passwrd).trim() !== ""){
      // this.setState({showtoast:true,toastMessage:"Fill all the fields and continue"});
      this.setState({disable:false});
    }
  }

  async componentDidMount(){
    // if(await )
  }

  loginCall(){
    var data = {
      username: this.state.username,
      passwrd: this.state.passwrd
    }
    var self = this;
    axios.post('https://devapi.mocialface.com/api/v1.0/users/login', 
    {
      username: this.state.username,
      passwrd: this.state.passwrd
    })
    .then((response) => {
      self.setState({showtoast:true,toastMessage:'User Login Success :)'});
      AsyncStorage.setItem("userdata",JSON.stringify(response.data.data));
      self.props.navigation.navigate('SugesstionList');
    })
    .catch((error) => {
      console.log('Fail Login: ', error.response);
    });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.initialCheck==true?(
          <Loader loader_color={global.loader_color} loader_text='Fetching Previous Login Details' />
        ):(
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} enableOnAndroid={true} extraHeight={hp('16%')}
          keyboardShouldPersistTaps='always'>
          <View
            style={{
              width: wp('91%'),
              backgroundColor: 'white',
              height: null,
              marginTop: hp('15%'),
              alignItems: 'center',
              alignSelf: 'center',
              paddingBottom: hp("3%"),
              flex: 1,
              justifyContent: 'center',
            }}>
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
                Login to Your Account
                </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
              }}>
              <View style={{ paddingTop: hp('0.5%'), paddingBottom: hp('1%') }}>
                <CustomTextInput
                  height={hp('5.5%')}
                  type="default"
                  width={wp('80%')}
                  onTextChanged={text =>
                    this.onTextChanged(text, 'username')
                  }
                  labeltitle="Email Id"
                  placeHolderTitle={""}
                  textInputValue={this.state.username}
                  color="#BEBEBE"
                  textColor="#10153D"
                  fontWeight="900"
                  showHighlight={true}
                  borderColor={'grey'}
                  fontSize={FontScale(18)}
                  fontFamily={'Europa-Regular'}
                  keyboardtype={"email-address"}
                />
              </View>

              <View style={{ paddingTop: hp('0.5%'), paddingBottom: hp('1%') }}>
                <CustomTextInput
                  height={hp('5.5%')}
                  type="default"
                  width={wp('80%')}
                  onTextChanged={text =>
                    this.onTextChanged(text, 'passwrd')
                  }
                  labeltitle="Password"
                  placeHolderTitle={""}
                  textInputValue={this.state.passwrd}
                  color="#BEBEBE"
                  textColor="#10153D"
                  fontWeight="900"
                  showHighlight={true}
                  borderColor={'grey'}
                  fontSize={FontScale(18)}
                  fontFamily={'Europa-Regular'}
                  keyboardtype={'aadharno-address'}
                  textTransform='lowercase'
                />
              </View>

            </View>
            <View style={{ alignItems: "center", paddingTop: hp('0.5%'), paddingBottom: hp('2%') }}>
              <EllipticalButton
                disabled={this.state.disable}
                ellipfunc={() => this.loginCall()}
                height={hp('6%')}
                ellipbuttontext="Login"
                width={wp('80%')}
                color={this.state.disable? "grey":"#FF752C"}
                fontColor={'white'}
                fontSize={FontScale(18)}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} >
                <Text style={{ color: "#FF752C", fontSize: FontScale(16) }}>Didn't Have an Account?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        )}
          <CustomToast
            toastColor={"#e1e1ea"}
            toastTextcolor={"#000033"}
            message={this.state.toastMessage}
            showToast={this.state.showtoast} style={{ position: "absolute" }} />
      </View>
    );
  }
}