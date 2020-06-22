/*
custom header component
params -> left, right and center icon
search input field
*/

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import IconNew from 'react-native-vector-icons/dist/Feather';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontScale from '../../fontsize/FontScale';

const { height } = Dimensions.get('window');

const Header = props => {
    function leftIconHandler() {
        props.onBackIconPressed();
    }

    return (
        <View style={{ ...styles.headerContainer, height: null, paddingVertical: 4 }}>
            <View style={{ marginVertical: '1%', flexDirection: 'row' }}>
                {props.data.leftIconVisible === true ? (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: '1%',
                            justifyContent: 'flex-start',
                        }}
                        onPress={() => leftIconHandler()}>
                        <IconNew
                            name={props.data.leftIconName}
                            size={27}
                            color={
                                props.data.leftIconColor != undefined
                                    ? props.data.leftIconColor
                                    : '#FF752C'
                            }
                        />
                        <Text
                            style={{
                                color: 'white',
                                marginLeft: '1%',
                                fontSize: 14,
                                fontFamily: 'Europa-Regular',
                            }}>
                            {props.data.leftIconText}
                        </Text>
                    </TouchableOpacity>
                ) : []}


                {props.data.centerIconVisible === true ? (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {props.data.showRightBellIcon == true || props.data.leftIconVisible == true ? (
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: FontScale(18),
                                    textAlign: 'center',
                                    fontFamily: 'Europa-Bold',
                                    marginLeft: '13%',

                                }}>
                                Kongumalai
                            </Text>
                        ) : (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: FontScale(18),
                                            textAlign: 'center',
                                            fontFamily: 'Europa-Bold',
                                        }}>
                                        Kongumalai
                                </Text>
                                </View>
                            )}
                        <Image
                            width={wp('4%')}
                            height={hp('4%')}
                            source={require('../../assets/images/app_icon.png')}
                            resizeMode={'contain'}
                            style={{ marginLeft: '2%' }}
                        />
                    </View>
                ) : (
                        []
                    )}


                {props.data.searchVisible === true ? (
                    <View
                        style={{
                            flex: 1,
                            marginRight: '4%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TextInput
                            placeholder={props.placeholder}
                            placeholderTextColor="black"
                            value={props.searchText}
                            style={{
                                paddingVertical: 8,
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: 30,
                                width: '100%',
                                color: 'black',
                                backgroundColor: 'white',
                                paddingLeft: '6%',
                                paddingRight: '12%',
                                textAlign: 'auto',
                                fontSize: 14,
                                fontFamily: 'Europa-Regular',
                                alignSelf: 'center',
                            }}
                            onChangeText={text => props.searchBox(text)}
                            onSubmitEditing={() => props.searchBox2()}
                        />
                        <Icon
                            onPress={() => {
                                console.log('clicked');
                                props.onSeachClicked();
                            }}
                            name="search"
                            size={20}
                            color="#FF752C"
                            solid={true}

                            style={{ marginLeft: '-12%' }}
                        />
                    </View>
                ) : (
                        []
                    )}


                {props.data.showRightBellIcon === true ? (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: '3%',
                            }}
                            onPress={() => props.rightIconHandler()}>
                            {props.data.showBellsolid == true ? (
                                <Icon
                                    name="bell"
                                    size={25}
                                    color="#EC0080"
                                    style={{ marginTop: height / 195 }}
                                />
                            ) : (
                                    <Icon
                                        name="bell"
                                        size={25}
                                        color="white"
                                        style={{ marginTop: height / 195 }}
                                    />
                                )}
                        </TouchableOpacity>
                        <View>
                            {props.data.alertShowbasket == true ? (
                                <View style={{ left: -7.5, top: 0 }}>
                                    <View
                                        style={{
                                            borderRadius: 500,
                                            width: wp('2%'),
                                            height: wp('2%'),
                                            backgroundColor: '#EC0080',
                                        }}></View>
                                </View>
                            ) : (
                                    []
                                )}
                        </View>
                    </View>
                ) : (
                        []
                    )}


                {props.data.showRightStoreIcon === true ? (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: '3%',
                            }}
                            onPress={() => props.rightLastIconHandler()}>
                            <Icon
                                name="shopping-basket"
                                size={25}
                                color="white"
                                style={{ marginTop: height / 195 }}
                            />
                        </TouchableOpacity>
                        {props.data.alertShowbasket == true ? (
                            <View style={{ left: -9.5, top: 2 }}>
                                <View
                                    style={{
                                        borderRadius: 500,
                                        width: wp('2%'),
                                        height: wp('2%'),
                                        backgroundColor: '#EC0080',
                                    }}></View>
                            </View>
                        ) : (
                                []
                            )}
                    </View>
                ) : (
                        []
                    )}

                {props.data.rightSideTextVisible === true ? (
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 15,
                                marginLeft: '75%',
                                fontFamily: 'Europa-Regular',
                            }}>
                            {props.data.rightSideText}
                        </Text>
                    </View>
                ) : (
                        []
                    )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#000033',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingLeft: '3%',
        justifyContent: 'space-between',
    },
});
export default Header;