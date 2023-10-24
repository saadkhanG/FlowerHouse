import {
    View, Text, SafeAreaView,
    StyleSheet, Image, ActivityIndicator,
    TouchableOpacity, FlatList,
    Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../consts/colors';
import srchiconn from '../../assets/images/search.png';
import orders from '../consts/orders';
import usericon from '../../assets/images/usr.png';
import CustomFooter from '../component/CustomFooter';
const width = Dimensions.get("screen").width / 2 - 30
import database from '@react-native-firebase/database';
import {Auth} from '../services';
import auth from '@react-native-firebase/auth';


const OrderHistory = ({ navigation, route }) => {

    const [loading, setLoading] = React.useState(true);
    const [activityloader, setActivityloader] = useState(true);
    const startLoading = () => {
        setActivityloader(true);
        setTimeout(() => {
            setActivityloader(false);
        }, 2000);
    };
    const Refreshh = () => {
        startLoading()
        getDatabase();
        setLoading(false)
    }
    // Fetching Firebase............................................
    const [myData, setMyData] = useState(null);
    useEffect(() => {
      startLoading()
      Refreshh()
    }, [])
    const getDatabase = async () => {
        try {
            const data = await database().ref('orders/').once("value");
            setMyData(data?.val());
        }
        catch (err) {
            console.log(err);
        }
    }
    // Fetching ends here................................................



    const categories = ['Paid', 'To Pay', 'Pending'];
    const [search, Setsearch] = useState('')
    const [categoryIndex, setCategoryIndex] = useState(0)
    if (route.params.paramKey == route.params.paramKey) {
        useEffect(() => {
            setCategoryIndex(route.params.paramKey)
        },[])

    }
    const abc = (index) => {
        console.log(index)
        return(
            setCategoryIndex((index))
        )
    }
    const CategoryList = () => {

        return (
            <View style={styles.categoryContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setCategoryIndex(index)}>
                        <Text style={[styles.categoryText, categoryIndex == index && styles.categoryTextSelected]}>
                            {item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    };

    const Card = ({ order }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", order)}>
                <View style={styles.card}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Order No. : {order.orderID}</Text>
                    <View style={{ alignItems: 'center' }}>
                    </View>
                    <View style={{flexDirection:'row',}}>
                        <View style={{alignItems: 'center' }}>
                            <Image style={{ width:120, height: 120,resizeMode: 'contain' }} 
                                    source={{uri: order.image}} />
                        </View>
                        <View>
                            <View style={{
                                marginTop: 5,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.green,
                                padding: 5,
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Order Status: {order.status}</Text>
                            </View>
                            <Text style={{ fontSize: 17, marginTop: 4, color: COLORS.green, fontWeight: 'bold' }}>
                                {order.name}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Total Rs : {order.price}</Text>
                            <Text style={{
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.green,
                                borderRadius: 5,
                                fontSize: 15,
                                width: '100%',
                                paddingLeft: 10,
                                color: 'black'
                            }}>Date: {order.date}</Text>
                        </View>
                        
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    const FilterData = ({ order }) => {
        if (order != null) {
            if (order.status == categories[categoryIndex] && order.userID === auth().currentUser.uid) {
                return (
                    <Card order={order} />
                )
            }
        }   
    }


    return (

        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            <View>
                {/* <View>
                    <Text style={{ fontSize: 38, fontWeight: 'bold', color: COLORS.green }}>Orders History</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}
                        style={{ height: '40%', width: '60%', flexDirection: 'row', marginLeft: 35 }}>
                        <Image source={usericon} style={{
                            height: 35,
                            marginTop: 10,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 40,
                            resizeMode: 'contain',
                            tintColor: COLORS.green
                        }} />
                    </TouchableOpacity>
                </View> */}
                <View style={{
                    padding:11,
                    borderBottomEndRadius: 15,
                    borderBottomStartRadius: 15,
                }}>
                <View style={{
                    flexDirection:'row',
                    }}>
                        <View>
                        <Text style={{
                            fontSize: 40,
                            color: COLORS.green,
                            fontWeight: 'bold',
                            
                        }}>Order History</Text>
                        </View>

                        <View style={{
                        flex:1,
                        alignItems:'flex-end',
                        justifyContent:'center',
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                            <Image source={usericon} style={{
                                height:45,
                                width:45,
                                resizeMode: 'contain',
                                tintColor:COLORS.green,
                            }}/>
                            </TouchableOpacity>
                        
                        </View>
                    </View>
                </View>
            </View>
            
            <CategoryList />

            {activityloader ? (
                <>
                    <ActivityIndicator
                        visible={loading}
                        textContent={'Loading...'}
                        size="small"
                    />
                </>
            ): (
                <>
                    <FlatList 
                        contentContainerStyle={{
                            paddingBottom: 50,
                        }}
                        data={myData}
                        renderItem={({ item }) => <FilterData order={item} />}
                        onRefresh={()=>Refreshh()}
                        refreshing={loading}
                    />
                </>
            )}
                    

            <View style={{ 
                width: Dimensions.get('window').width,
                bottom:0,
                position:'absolute',
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

export default OrderHistory

const styles = StyleSheet.create({
    searchConatiner: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flezDirection: 'row',
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
        flex: 1,
    },
    sortbtn: {
        height: 50,
        width: 50,
        marginLeft: 10,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor: 'grey',
        paddingBottom:5,
        paddingTop:5,
        justifyContent: 'space-between',
        paddingHorizontal: 40,
    },
    categoryText: {
        fontSize: 16,
        color: 'grey',
        fontWeight: 'bold',
    },
    categoryTextSelected: {
        color: COLORS.white,
        backgroundColor: COLORS.green,
        padding: 5,
        borderRadius:15,
        borderColor: COLORS.green,
    },
    card: {
        backgroundColor: COLORS.light,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
        borderRadius: 10,
        padding: 15,
    },
});