import React from 'react';
import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontScale from '../fontSize/FontScale';
import global from '../const/index';
import axios from 'axios';
import Loader from '../components/functionalcomponents/Loader';
import AsyncStorage from '@react-native-community/async-storage';

export default class SugesstionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sugesstionList: [],
            loading: true,
            refreshList: false,
            user: '',
            index: 10,
        }
    }

    async componentDidMount() {
        this.setState({ user: await AsyncStorage.getItem('userdata') });
        // console.log('async',await AsyncStorage.getItem('userdata'))
        this.getSugesstionList();
    }

    getSugesstionList() {
        console.log(JSON.parse(this.state.user));
        var id = JSON.parse(this.state.user)._id;
        var token = JSON.parse(this.state.user).token;
        axios.post('https://devapi.mocialface.com/api/v1.0/users/friendSuggestions',
            {
                userId: id
            },
            {
                headers: {
                    Authorization: token
                }
            }).then((response) => {
                console.log('data response: ', response.data.data);
                this.setState({ sugesstionList: response.data.data, loading: false });
            }).catch((error) => {
                console.error('Error getting data: ', error);
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loading ? (
                    <Loader loader_color={global.loader_color} loader_text='' />
                ) : (
                        <FlatList
                            data={this.state.sugesstionList}
                            ListHeaderComponent={()=>(
                                <View style={{ marginVertical: hp('2%') }}>
                                    <Text style={{ fontSize: FontScale(25), textAlign: 'center', fontWeight: 'bold' }}>
                                        SUGESSTION LIST
                                    </Text>
                                    {/* <View style={{marginLeft:wp('80%')}}>
                                    <TextInput
                                        value={(this.state.index).toString()}
                                        onChangeText={(text)=>this.setState({index:text})}
                                        placeholder='Enter index to be rendered'
                                        style={{borderWidth:2,borderColor:'black',
                                                width:wp('15%'),height:hp('6%'),margin:hp('1%'),textAlign:'center'}}
                                    />
                                    </View> */}
                                </View>
                            )}
                            renderItem={({ item, index }) => {
                                if (index < this.state.index) {
                                    return (
                                        <SugesstionCard
                                            apiImageAvailable={item.userImage === null ? false : true}
                                            imageurl={item.userImage}
                                            username={item.fullName}
                                            local_imageurl={require('../assets/images/blog_dp.jpg')}
                                            leftHandler={() => alert('Add :)')}
                                            rightHandler={() => alert('Remove :(')}
                                        />
                                    )
                                }
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    )}
            </View>
        );
    }
}

const SugesstionCard = (props) => {
    return (
        <View style={{ flexDirection: 'row', padding: wp('2%') }}>
            {props.apiImageAvailable ? (
                <Image source={{ uri: props.imageurl }} style={{ width: wp('20%'), height: wp('20%'), borderRadius: wp('2%') }} />
            ) : (
                    <Image source={props.local_imageurl} style={{ width: wp('20%'), height: wp('20%'), borderRadius: wp('2%') }} />
                )}
            <View style={{ flexDirection: 'column', marginHorizontal: wp('4%'), justifyContent: 'space-around' }}>
                <Text style={{ fontSize: FontScale(20), textTransform: 'capitalize' }}>{props.username}</Text>
                <View style={{ flexDirection: 'row', width: wp('80%'), }}>
                    <TouchableOpacity onPress={() => props.leftHandler()}
                        style={{ backgroundColor: global.primary_color, borderWidth: 1, borderColor: global.primary_color, borderRadius: wp('2%') }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', paddingVertical: hp('0.7%'), fontSize: FontScale(17), paddingHorizontal: wp('4.8%') }}>
                            Add Friend
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.rightHandler()} style={{ marginLeft: wp('4%'), backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: wp('2%') }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: FontScale(17), paddingVertical: hp('0.7%'), paddingHorizontal: wp('6%') }}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}