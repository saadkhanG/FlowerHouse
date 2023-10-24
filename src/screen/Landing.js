import { View, Text, Image,ScrollView, StyleSheet, Button,  useWindowDimensions, ImageBackground, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import BgImg from 'C:/Users/saad/Desktop/zynatyApp/assets/images/bgg.jpg';
import Logo from 'C:/Users/saad/Desktop/zynatyApp/assets/images/flogo.png';
import COLOR from '../consts/colors';

const Landing = ({navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.root}>
        <ImageBackground source={BgImg} style={styles.background}></ImageBackground>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.brandView}>
            <View style={styles.brand}>
              <Text style={[styles.TitleText]}>Flower House</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Login')}
              >
              <Text style={[styles.StrtTxt]}>Get Started</Text> 
              </TouchableOpacity>
            </View>

          </View>
      </View>
      </View>
  )
}

export default Landing

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    width: '100%',
  },
  background:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,

  },
  logo: {
    width: '50%',
    height: '20%',
    tintColor:'green',
},
  brandView:{
    width: '100%',
    bottom: 1,
    marginTop:'70%',
  },
  brand:{
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: Dimensions.get('window').height,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    
  },
  button:{
    marginTop:80,
    marginLeft: 250,
    backgroundColor: COLOR.green,
    padding: 10,
    borderRadius: 10,
  },
  StrtTxt:{
    color: 'white',
  },
  TitleText:{
    color: COLOR.white,
    marginTop: 40,
    fontSize:40,
    fontWeight: 'bold',
    fontFamily:'sans-serif-condensed',
  },
  container:{
    alignItems: 'center',
    flex: 1,
  },
});