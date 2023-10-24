import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import COLOR from '../consts/colors';
import usrIcon from '../../assets/images/usr.png';
import flagIcon from '../../assets/images/flag.png';
import {Auth} from '../services'
import PushNotification from "react-native-push-notification";


const Settings = ({navigation}) => {
  
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={{
          flex: 1,
          flexDirection:'row',
          justifyContent:'center',
          }}>
            <View style={{
              flex:1,
              alignItems:'flex-start',
              justifyContent:'center',
              }}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                    <Image source={usrIcon}style={{
                    height:30,
                    width:30,
                    resizeMode: 'contain',
                    tintColor:COLOR.white,
                  }}/>
                </TouchableOpacity>
              </View>
              <View style={{
                marginRight:140,
                }}>
              <Text style={{
                fontSize: 28,
                color: 'white',
                fontWeight: 'bold',
              }}>Settings</Text>
            </View>
        </View>    
      </View>
      {/* header closed */}
      <View style={{
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        borderBottomWidth: 0.5,
        marginBottom:8,
      }}>
        <Image source={flagIcon} style={{
            width:40,
            height:30,
            borderWidth:2,
            borderRadius:5,
            borderColor:'grey',
        }} />
        <Text style={{
            fontWeight: 'bold',
            paddingLeft:10,
            fontSize:20,
            color: 'black',
        }}>Your current country is Pakistan</Text>
      </View>
      {Buttons('Account Information',navigation)}
      {Buttons('Messages',navigation)}
      {Buttons('Languages',navigation)}
      {Buttons('General')}
      {Buttons('Policies')}
      {Buttons('Help')}

      <TouchableOpacity onPress={() => Auth.signOut()}>
        <View style={{
            marginTop:20,
            backgroundColor:COLOR.green,
            margin:10,
            padding:10,
            borderRadius:10,
            alignItems: 'center',
        }}>
            <Text style={{
                color:'white',
                fontWeight: 'bold',
                fontSize:20,
            }}>LogOut</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
const CreateChannels = () => {
  PushNotification.createChannel({
    channelId: "Flower House",
    title: "Flower Notification" ,
    message: "Heloowww"
  })
}
const Buttons = (title,navigation) => {
  const ButtonNavi = () => {
    if (title == 'Account Information') {
      navigation.navigate('Accountinfo')
    }
    else if (title == 'Messages') {
      navigation.navigate('Notifications')
    }
    else if (title == 'Languages') {
      navigation.navigate('Testing')
    }
    else{
      CreateChannels()
    }
  }
    return (
        <View>
            <TouchableOpacity onPress={() => ButtonNavi(title)}>
                <View style={{
                    marginLeft:10,
                    marginRight:10,
                    marginTop:3,
                    borderBottomWidth:0.2,
                    borderColor:'silver',
                    padding: 15,
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize:15,
                        fontWeight: 'bold',
                        paddingLeft:5,
                    }}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    )
}

export default Settings

const styles = StyleSheet.create({
    root:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container:{
        backgroundColor: COLOR.green,
        padding:11,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
    },
})