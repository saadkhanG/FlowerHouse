import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import database from '@react-native-firebase/database';

const signUp = (fullName,email,password) => {
    
    if (!fullName || !email || !password) {
        alert('Please enter all fiels')
    }
    else{
        return auth().createUserWithEmailAndPassword(email.trim(),password)
        .then( cred => {
            const {uid} = cred.user;
            const add = database().ref('users/'+ auth().currentUser.uid).set({
                name: fullName,
                email:email.trim(),
                number:'',
                gender:'',
                address:'',
                image : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
            });
            auth().currentUser.updateProfile({
                displayName: fullName
            })
            return uid
        })
        .catch(
            err => Alert.alert(err.code, err.message)
        )
    }
        
}

const signIn = (email,password) => {
    if(!email || !password){
        Alert.alert('Error','Please enter all fields')
    }
    else{
        return auth().signInWithEmailAndPassword(email.trim(),password)
        .then(() => {
            console.log(auth().currentUser.uid)
        })
        .catch(
            err => Alert.alert(err.code, err.message)
        )
    }
    
}

const signOut = () => {
    return auth().signOut()
}

const Auth = {
    signUp,
    signIn,
    signOut
}

export default Auth