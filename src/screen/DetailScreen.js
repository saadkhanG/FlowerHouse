import { View, Text, SafeAreaView, StyleSheet, Image,TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLOR from '../consts/colors';
import backIcon from '../../assets/images/back.png';
import cartIcon from '../../assets/images/cart.png';
import CustomFooter from '../component/CustomFooter';
import orders from '../consts/orders';
import database from '@react-native-firebase/database';
import {Auth} from '../services';
import auth from '@react-native-firebase/auth';

const DetailScreen = ({navigation, route}) => {
  const plant = route.params;
  const [number, setNumber] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(null);
  const [ndate, setDate] = useState(null);
  const [Oid, setOID] = useState(null)

  //getting values
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  //Till here

  const Increment = () => {
    setNumber(number + 1)
    console.log(number)
  }
  const Decrement = () => {
    if (number === 1) {
      alert('Minimum 1')
    }
    else if (number > 1){
      setNumber(number - 1)
    }
  }

  //useeffects
  useEffect(() => {
    getDate()
    generating()
  }, [])
  React.useEffect(() => {
    setTotalPrice(plant.price * number)
    
  })
  //till here
  const getDate = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setDate(
      date + '/' + month + '/' + year
    )
  }  
  const Show = () =>{
    getDate()
  }
  const generating = async () => {
    const datas = await database().ref('idgenerator/').once("value");
    setOID(datas?.val())
    console.log(Oid)
  }
  const orderno = async () => {
      
    try {
      const idgenerator = await database().ref('idgenerator/').update({
        orderID : Oid.orderID + 1,
        
      })
    }
    catch (err) {
        console.log(err);
    }
  }

  const handleData = async () => {
    Show()
    orderno()
    try {
      const response = await database().ref('orders/'+ Oid.orderID).set(
      {
        userID: auth().currentUser.uid,
        name: plant.name,
        price: totalPrice,
        status: 'Pending',
        date: ndate,
        orderID: Oid.orderID,
        quantity: number,
        review: 'Review',
        image: plant.image
      });
      
    } catch (err) {
      console.log(err);
    }
  }
  const CreateTotalPrice = () => {
    handleData()
    console.log(totalPrice)
    alert('Your order is in pending and waiting to get accepted by our representative')
    navigation.navigate('OrderHistory',{paramKey: 2,})
    setNumber(1)
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLOR.white}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Image source={backIcon} resizeMode='contain' style={{height:20, width:20}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: plant.image}} resizeMode='contain' style={{width:'100%',height:'100%'}}/>
      </View>
      <View style={styles.detailsConatiner}>
        <View style={{
          marginLeft:20,
          flexDirection: 'row',
          alignItems:'flex-end',
        }}>
          <TouchableOpacity onPress={() => navigation.navigate("ViewUserReviews", plant)}>
              <Text style={{
              fontSize:18, 
              fontWeight:'bold', 
              color:COLOR.green,
              borderBottomColor:COLOR.green,
              borderBottomWidth:1,
              }}>View Reviews</Text>
          </TouchableOpacity>
            
        </View>
        <View style={{
          marginLeft:20,
          marginTop:20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize:20,
            fontWeight:'bold',
            color:COLOR.dark,
          }}>{plant.name}</Text>
          <View style={styles.priceTag}>
            <Text style={{
              marginLeft:15,
              color:COLOR.white,
              fontWeight:'bold',
              fontSize:16,
            }}>Rs : {plant.price}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal:20, marginTop:10}}>
            <Text style={{fontSize:20, fontWeight:'bold', color:COLOR.dark}}>
              About
            </Text>
            <Text style={{
              color:'grey',
              fontSize:16,
              lineHeight:22,
              marginTop:10,
            }}>{plant.about}</Text>
            <View style={{
              marginTop:20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <TouchableOpacity style={styles.borderBtn} onPress={Decrement}>
                   <Text style={styles.borderBtnText}>-</Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                    marginHorizontal:10,
                    borderWidth:1,
                    height:40,
                    width:40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius:5,
                  }}>
                  <Text style={{
                    fontWeight: 'bold',
                    fontSize:20,
                    color:'black',
                  }}>{number}</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.borderBtn} onPress={Increment}>
                    <Text style={styles.borderBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={CreateTotalPrice}>
                <View style={styles.buyBtn}>
                  <Text style={{
                    color:COLOR.white,
                    fontSize:18,
                    fontWeight:'bold',
                  }}>Buy</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      <View style={{width: Dimensions.get('window').width}}>
        <CustomFooter
            t1= {() => navigation.navigate('HomeScreen')}
            t2= {() => navigation.navigate('Notifications')}
            t3= {() => navigation.navigate('Settings')}
            t4= {() => Auth.signOut()}
        />
      </View>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  header:{
    paddingHorizontal:20,
    marginTop:20,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  imageContainer:{
    flex: 0.45,
    marginTop:20,
    justifyContent: 'center',
    alignItems:'center',
  },
  detailsConatiner:{
    flex: 0.55,
    backgroundColor: COLOR.light,
    marginHorizontal:7,
    marginBottom:7,
    borderRadius:20,
    marginTop:30,
    paddingTop:30,
  },
  priceTag:{
    backgroundColor: COLOR.green,
    width:120,
    height:40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
  },
  borderBtn:{
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius:5,
    height:40, 
    width:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.green,
  },
  borderBtnText:{
    fontWeight: 'bold',
    fontSize:28,
    color:COLOR.white,    
  },
  buyBtn:{
    width:150,
    height:50,
    backgroundColor: COLOR.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
  },
})