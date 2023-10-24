import { StyleSheet, Text, View, TouchableOpacity,Image,TextInput,ActivityIndicator } from 'react-native'
import React, { useState, useEffect }  from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import COLOR from '../consts/colors';
import backicon from '../../assets/images/back.png';

const Editinfo = ({navigation, route}) => {
  const title = route.params;
  const [info, setInfo] = useState();
  const [show, setShow] = useState(true);
  const [type, setType] = useState('default');
  const [multi, setMulti] = useState(false);
  const Keytype = () =>{
    if (title == 'number') {
      console.log('select number')
      setType('phone-pad')
    }
    else if (title == 'gender') {
      console.log('select gender')
    }
    else if (title == 'address') {
      setMulti(true)
    }
    else if (title == 'email') {
      setType('email-address')
    }
  }
  // Fetching Firebase............................................
  const [myData, setMyData] = useState('Loading');
  const [loading, setLoading] = useState(true);
  const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 1000);
   };
  useEffect(() => {
      startLoading()
      getDatabase()
      Keytype()
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
  const Update = async () => {
    setShow(true)
    setTimeout(() => {
      getDatabase()
     }, 1000);
    try {
      const data = await database().ref('users/'+ auth().currentUser.uid)
      .update({
        [title] :info,
      })
      .then(()=> alert('Completed'))
    } catch (err) {
      console.log(err);
    }
  }
  const sett = () => {
    setShow(false)
  }

  // Fetching ends here................................................
  return (
    <View>
      <View style={{
        backgroundColor: COLOR.green,
        flexDirection: 'row',
        alignItems:'center',
      }}>
        <TouchableOpacity onPress={()=> navigation.navigate('Accountinfo')}>
          <View style={{
            padding:15,
            paddingRight:30,
          }}>
            <Image
              source={backicon}
              style={{
                height:25,
                width:25,
                tintColor:'white',
                resizeMode:'contain'
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={{
          marginLeft:'20%'
        }}>
          <Text style={{
            fontSize: 28,
            color: 'white',
            fontWeight: 'bold',
          }}>Edit {title}</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
        ) : (
        <>
          <Text style={{
            padding:5,
            margin:15,
            fontSize:18,
            color:'black',
            borderBottomWidth:0.5,
            }}>{title} : {myData[title] ? myData[title] : 'Click on add button' }</Text>
            
            {show ? (
              <>
                <TouchableOpacity onPress={sett}>
                  <View style={{
                    padding:10,
                    backgroundColor:COLOR.green,
                    width:'20%',
                    borderRadius:20,
                    alignItems:'center',
                    marginLeft:15,
                  }}>
                    <Text style={{
                      fontSize:15,
                      color:'white',
                      fontWeight:'bold',
                    }}>{myData[title] ? 'Edit' : 'Add'}</Text>
                  </View>
                </TouchableOpacity>    
              </>
            ) : (
              <>
                <TextInput
                  defaultValue={myData[title] ? myData[title] : 'Enter'}
                  numberOfLines={multi ? 4 : 1}
                  style={styles.input}
                  keyboardType={type}
                  multiline={multi}
                  value={info}
                  onChangeText = {text=> setInfo(text)}
                />
                <TouchableOpacity onPress={Update}>
                  <View style={{
                    backgroundColor: COLOR.green,
                    borderColor: '#e8e8e8',
                    borderWidth:1,
                    borderRadius:20,
                    padding:8,
                    margin:20,
                    alignItems:'center'
                  }}>
                    <Text style={{
                      fontSize:20,
                      color:'white'
                      }}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}  
        </>
        )}
      
    </View>
  )
}

export default Editinfo

const styles = StyleSheet.create({

  input:{
    backgroundColor: 'white',
    borderColor: '#e8e8e8',
    borderWidth:1,
    borderRadius:20,
    shadowOpacity: 1.1,
    shadowRadius: 4.65,
    shadowColor: "000#",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    elevation: 4,
    marginLeft:20,
    marginRight:20,
    marginTop:20
},
})