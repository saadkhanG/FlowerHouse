import { StyleSheet, View, Image, Pressable,TextInput, Text,ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import React, {useState} from 'react'
import Logo from 'C:/Users/saad/Desktop/zynatyApp/assets/images/flogo.png';
import BG from 'C:/Users/saad/Desktop/zynatyApp/assets/images/bgg.jpg';
import CustomButton from '../component/CustomButton';
import Oeye from '../../assets/images/oeye.png';
import Ceye from '../../assets/images/ceye.png';
import COLORS from '../consts/colors';
import {Auth} from '../services';

const Login = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onForgotPressed = () => {
        alert('Check Your Email');
    }
    const onGooglePressed = () => {
        alert('Logged In with Google');
    }
    const onFacebookPressed = () => {
        alert('Logged In with Facebook');
    }


  return (
    <View style={styles.root}>
        <ImageBackground source={BG} style={styles.root}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <TextInput 
            placeholder={'username'}
            style={styles.input}
            value={email}
            onChangeText = {text=> setEmail(text)}
            />
            <View style={styles.textView}>
                <TextInput 
                    placeholder={'password'}
                    style={{width: '90%'}}
                    secureTextEntry = {true}
                    value={password}
                    onChangeText = {text=> setPassword(text)}
                />
                <TouchableOpacity>
                    <Image source={Ceye} style={{
                        flex:1,
                        flexDirection: 'row',
                        width:25,
                        height:25,
                        resizeMode: 'contain',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        
                    }} 
                    />
                </TouchableOpacity>
                
            </View>
            <CustomButton
                onPress={() => Auth.signIn(email,password)}
                text="Login"
            />
            <Pressable onPress={onForgotPressed} style={styles.forgottext}>
                <Text style={{color: 'black', fontWeight:'bold',
                    paddingTop: 10,
                    paddingBottom: 10,}}>Forgot Password?</Text>
            </Pressable>
            <CustomButton
                text="Sign In with Google"
                onPress={onGooglePressed}
                bgColor="#db4a39"
                fgColor="white"
            />
            <CustomButton
                text="Sign In with Facebook"
                bgColor="#4267B2"
                fgColor="white"
                onPress={onFacebookPressed}
            />

            <Pressable 
                onPress={() => navigation.navigate('SignUp')}
                style={styles.forgottext}>
                <Text style={{paddingTop: 10,
                    fontWeight: 'bold',
                    color: 'black',}}
                    >Dont have an account? Create one</Text>
            </Pressable>
        </ImageBackground>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
        paddingTop: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    logo: {
        width: '50%',
        height: '40%',
        tintColor:'green',
    },
    forgottext: {
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
    },
    input:{
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth:1,
        borderRadius:20,
        paddingHorizontal:10,
        marginVertical: 5,
        shadowOpacity: 1.1,
        shadowRadius: 4.65,
        shadowColor: "000#",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        elevation: 4,
    },
    textView:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#e8e8e8',
        borderWidth:1,
        borderRadius:20,
        paddingHorizontal:10,
        marginVertical: 5,
        shadowOpacity: 1.1,
        shadowRadius: 4.65,
        shadowColor: "000#",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        elevation: 4,
    }
});