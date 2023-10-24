import {
  View, Text, StyleSheet, SafeAreaView, Image,
  TouchableOpacity, Animated, Dimensions, ImageBackground
} from 'react-native'
import React, { useEffect, useState } from 'react';
import profileimg from '../../assets/images/profile.jpg';
import homeicon from '../../assets/images/home.png';
import searchicon from '../../assets/images/search.png';
import notiicon from '../../assets/images/noti.png';
import settingicon from '../../assets/images/setting.png';
import logouticon from '../../assets/images/logout.png';
import navicon from '../../assets/images/nav.png';
import closeicon from '../../assets/images/close.png';
import COLOR from '../consts/colors';
import flwrBG from '../../assets/images/flower.jpg';
import orderIcon from '../../assets/images/order.png';
import reviewIcon from '../../assets/images/review.png';
import pIcon from '../../assets/images/payment.png';
import hIcon from '../../assets/images/help.jpg';
import vIcon from '../../assets/images/van.png';
import cIcon from '../../assets/images/carton.png';
import CustomFooter from '../component/CustomFooter';
import {Auth} from '../services'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


const UserProfile = ({ navigation }) => {
  const [currentTab, setCurrentTab] = React.useState("User Profile");
  const [showMenu, setShowMenu] = React.useState(false);

  // Fetching Firebase............................................
  const [myData, setMyData] = useState('Loading');
  const [loading, setLoading] = useState(true);
  const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 100);
   };
  useEffect(() => {
      startLoading()
      getDatabase()
  },[])
  const getDatabase = async () => {
      try {
          const data = await database().ref('users/'+ auth().currentUser.uid).once("value");
          setMyData(data?.val());
      }
      catch (err) {
          console.log(err);
      }
  }
  // Fetching ends here................................................

  // animation
  const offsetValue = React.useRef(new Animated.Value(0)).current;
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const closeButtonOffset = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
      {loading ? (
        <Text>Loading</Text>
        ) : (
        <>
          <Image source={{uri : myData.image ? myData.image : 'https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg'}}
            style={{ width: 60, height: 60, borderRadius: 10, marginTop: 8 }}
          ></Image>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20
          }}>{myData.name}</Text>
        </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Accountinfo')}>
          <Text style={{
            marginTop: 6,
            color: 'white',
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {/* tab bars buttons */}
          {TabButtons(currentTab, "Home", homeicon, navigation)}
          {TabButtons(currentTab, "Search", searchicon, navigation)}
          {TabButtons(currentTab, "Notifications", notiicon, navigation)}
          {TabButtons(currentTab, "Settings", settingicon, navigation)}
        </View>
        <View>
          {TabButtons(currentTab, "LogOut", logouticon, navigation)}
        </View>
      </View>
      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'rgb(240, 240, 240)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: showMenu ? 15 : 0,
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset

          }]
        }}>
          <ImageBackground source={flwrBG} style={{
            width: Dimensions.get('window').width,
            resizeMode: 'contain',
            height: 270,
          }}>
            <View style={{
              paddingHorizontal: 15, paddingVertical: 20,

            }}>
              <TouchableOpacity onPress={() => {
                Animated.timing(scaleValue, {
                  toValue: showMenu ? 1 : 0.88,
                  duration: 300,
                  useNativeDriver: true
                })
                  .start();
                Animated.timing(offsetValue, {
                  toValue: showMenu ? 0 : 220,
                  duration: 300,
                  useNativeDriver: true
                })
                  .start();

                Animated.timing(closeButtonOffset, {
                  toValue: showMenu ? 0 : 0,
                  duration: 900,
                  useNativeDriver: true
                })
                  .start();

                setShowMenu(!showMenu);
              }}>
                <Image source={showMenu ? closeicon : navicon} style={{
                  width: 30,
                  height: 30,
                  tintColor: 'white',
                  marginTop: 40
                }}></Image>

              </TouchableOpacity>
              <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                paddingTop: 20
              }}>{currentTab}</Text>
              <View style={{
                alignItems: 'center',
              }}>
                {loading ? (
                <Text style={{
                  marginTop:252,
                }}>Loading</Text>
                ) : (
                <>
                  <Image source={{uri : myData.image ? myData.image : 'https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg'}} style={{
                    width: '47%',
                    height: 185,
                    borderRadius: 200,
                    marginTop: 20,
                    borderWidth: 4,
                    borderColor: 'white',
                  }}></Image>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingTop: 15,
                    paddingBottom: 5,
                    color: 'black',

                  }}>{myData.name}</Text>
                </>
                )}
              </View>
              <View>
                <View style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  marginBottom: 5,

                }}>
                  <Text style={{ color: 'black' }}>Flower House Wallet</Text>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      paddingTop: 10,
                      alignItems: 'center',
                      width: '50%',
                      borderRightWidth: 0.18,
                    }}>
                      <Text style={{ color: 'black' }}>PKR</Text>
                      <Text style={{ color: 'black' }}>0</Text>
                      <TouchableOpacity onPress={() => alert('Activated')}>
                        <Text style={{
                          borderWidth: 0.5,
                          paddingLeft: 8,
                          paddingRight: 8,
                          borderRadius: 5,
                        }}>
                          Activate Now</Text>
                      </TouchableOpacity>
                    </View>
                    {/* Voucher */}
                    <View style={{
                      marginBottom: 12,
                      alignItems: 'center',
                      width: '50%',
                    }}>
                      <Text style={{ color: 'black' }}>Vouchers</Text>
                      <Text style={{ color: 'black' }}>0</Text>
                    </View>
                  </View>
                </View>

              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  {UserButtons(orderIcon, 'Order History', navigation)}
                  {UserButtons(reviewIcon, 'My Reviews', navigation)}
                  {UserButtons(pIcon, 'Payments', navigation)}
                  {UserButtons(hIcon, 'Help', navigation)}
                </View>
                
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                marginTop: 5,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal:35,
                }}>
                  {UserButtons(pIcon, 'Paid',navigation, '0')}
                  {UserButtons(cIcon, 'To Pay',navigation, '1')}
                  {UserButtons(vIcon, 'Pending',navigation, '2')}
                  {UserButtons(orderIcon, 'Review',navigation, '3')}
                </View>
              </View>
            </View>
            
          </ImageBackground>

        </Animated.View>
      </ Animated.View>
      <View style={{
        position:'absolute',
        bottom:0,
        width:'100%',
      }}>
        <CustomFooter
          t1={() => navigation.navigate('HomeScreen')}
          t2={() => navigation.navigate('Notifications')}
          t3={() => navigation.navigate('Settings')}
          t4={() => Auth.signOut()}
        />
      </View>          
    </SafeAreaView>
  )
}

const UserButtons = (img, title,navigation, index) => {
  const ButtonNavi = () => {
    if (title == 'Order History') {
      navigation.navigate('PreviousOrders')
    }
    else if (title == 'My Reviews') {
      navigation.navigate('MyAllReviews')
    }
    else if (title == 'Payments') {
      navigation.navigate('Images')
    }
    else if (title == 'Help') {
      alert('Home --> Product --> Order --> Billing')
    }
    else if (title == 'Paid'){
      navigation.navigate('OrderHistory',{paramKey: index,})
    }
    else if (title == 'To Pay'){
      navigation.navigate('OrderHistory',{paramKey: index,})
    }
    else if (title == 'Pending'){
      navigation.navigate('OrderHistory',{paramKey: index,})
    }
    else if (title == 'Review'){
      navigation.navigate('AddReview')
    }
  }
  return (
    <View style={styles.usrbtn}>
      <TouchableOpacity 
      onPress={ButtonNavi}
      list ={index}
      style={{ alignItems: 'center' }}>
        <Image source={img} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
        <Text style={styles.usrbtnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const TabButtons = (currentTab, title, image, navigation) => {
  const Loginpage = () => {
    // () => navigation.navigate('Login')
    if (title == 'LogOut') {
      Auth.signOut()
    }
    else if (title == 'Home') {
      navigation.navigate('HomeScreen')
    }
    else if (title == 'Search') {
      navigation.navigate('HomeScreen')
    }
    else if (title == 'Notifications') {
      navigation.navigate('Notifications')
    }
    else if (title == 'Settings') {
      navigation.navigate('Settings')
    }
  }
  return (
    <TouchableOpacity onPress={Loginpage}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>
        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? COLOR.green : 'white'
        }}></Image>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? COLOR.green : 'white'
        }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.green,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  usrbtn: {
    borderRadius: 20,
    alignItems: 'center',
    paddingRight: 38,
  },
  usrbtnText: {
    color: 'black',
    fontWeight: 'bold',
  },
})