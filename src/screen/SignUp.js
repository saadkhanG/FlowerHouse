import { View, Text, StyleSheet, Dimensions, Pressable, ImageBackground,TextInput} from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import BG from 'C:/Users/saad/Desktop/zynatyApp/assets/images/bgg.jpg';
import COLOR from '../consts/colors';
import {Auth} from '../services';


const onSignPressed = () => {
    alert('Logged In');
}
const onGooglePressed = () => {
    alert('Logged In with Google');
}
const onFacebookPressed = () => {
    alert('Logged In with Facebook');
}

const SignUp = ({navigation}) => {
    const [userName, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  return (
    <View style={styles.root}>
        <ImageBackground source={BG} style={styles.root}>
            <Text style={styles.mainText}>SignUp</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Fullname" 
                value={userName}
                onChangeText={e => setUsername(e)}
            /> 
            <TextInput 
                placeholder={'Email'}
                style={styles.input}
                value={email}
                onChangeText = {text=> setEmail(text)}
            />
            <TextInput 
                style={styles.input}
                placeholder="Enter Password" 
                value={password}
                onChangeText={e => setPassword(e)}
            /> 
            <CustomButton
                text="Sign Up"
                // navigation.navigate('HomeScreen')
                onPress={() => Auth.signUp(userName, email, password)}
            />
            <Text style={styles.socialtext}>Sign Up with social account</Text>
            <CustomButton
                text="Sign In with Google"
                onPress={onGooglePressed}
                bgColor = "#db4a39"
                fgColor= "white"
            />
            <CustomButton
                text="Sign In with Facebook"
                onPress={onFacebookPressed}
                bgColor = "#4267B2"
                fgColor= "white"
            />
            <Pressable 
                onPress={() => navigation.navigate('Login')}
                style={styles.forgottext}>
                <Text style={styles.socialtext}>Already have an account? Login</Text> 
            </Pressable>  
        </ImageBackground>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
    root:{
        alignItems: "center",
        padding: 20,
        paddingTop:0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
    },
    mainText:{
        fontWeight:'bold',
        fontSize: 59,
        color : COLOR.green,
        paddingTop: 40,
        paddingBottom: 40,
        marginBottom:52,
    },
    socialtext:{
        marginTop:20,
        marginBottom:20,
        fontWeight:'bold',
        color : 'black',
        backgroundColor:'rgba(255, 255, 255, 0.80)',
        padding: 5,
        borderRadius:10,
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
})