import { View, Text, SafeAreaView,
     StyleSheet,Image, ScrollView,KeyboardAvoidingView,
     TouchableOpacity, FlatList,ActivityIndicator,
     Dimensions } from 'react-native'
import React,{ useState,useEffect} from 'react'
import COLORS from '../consts/colors';
import hrticon from '../../assets/images/heart.png';
import redhrticon from '../../assets/images/rheart.png';
import closeicon from '../../assets/images/close.png';
import Autocomplete from 'react-native-autocomplete-input';
import usericon from '../../assets/images/usr.png'; 
import CustomFooter from '../component/CustomFooter';
import database from '@react-native-firebase/database';
import {Auth} from '../services'

const width = Dimensions.get("screen").width/2-30

const HomeScreen = ({navigation}) => {
    //for auto complete
    const [activityloader, setActivityloader] = useState(true);
    const [isState, setIsState] = useState([]);
    const [isSuggestions, setIsSuggestions] = useState([]);
    const [showItems, setShowItems] = useState(false);
    //till here
    const startLoading = () => {
        setActivityloader(true);
        setTimeout(() => {
            setActivityloader(false);
        }, 2000);
     };
    // Fetching Firebase............................................
    const [myData, setMyData] = useState(null);
    useEffect(() => {
        startLoading()
        Refreshh()
        getDatabase()
    }, [])
    const getDatabase = async () => {
        try {
            const data = await database().ref('plants/').once("value");
            setMyData(data?.val());
        }
        catch (err) {
            console.log(err);
        }
    }
    // Fetching ends here................................................

    const categories = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETICS'];
    const [search,Setsearch] = React.useState('')
    const [ categoryIndex , setCategoryIndex ] = React.useState(0)
    const [loading, setLoading] = React.useState(true);

    const CategoryList = () => {
        return (
            <View style={styles.categoryContainer}>
                {showItems ? (
                    <>
                    </>
                ):( 
                    <>
                        {categories.map((item, index) => (
                            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setCategoryIndex(index, googoo(index))}>
                                <Text style={[styles.categoryText, categoryIndex == index && styles.categoryTextSelected]}>
                                {item}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
                
            </View>
        )  
    };

    const Card = ({plant}) => {
        return(
            <TouchableOpacity onPress={() => navigation.navigate("DetailScreen", plant)}>
                <View style={styles.card}>
                    <View style={{alignItems:'flex-end'}}>
                        <View style = {{
                            width: 30,
                            height: 30,
                            borderRadius:15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: plant.like
                                ? 'rgba(245,42,42,0.2)'
                                : 'rgba(0,0,0,0.2)',
                        }}>
                            <Image source={plant.like 
                            ? redhrticon
                            : hrticon} resizeMode='contain' style={{height:20, width:20}}/>
                        </View>
                    </View>
                    <View style={{
                        flexDirection:'row',
                    }}>
                        <View style={{alignItems:'center'}}>
                            <Image style={{width:140,height:140 ,resizeMode:'contain'}} source={{uri: plant.image}} />
                        </View>
                        <View style={{
                            marginTop:1,
                            justifyContent:'center'
                        }}>    
                            <Text style={{fontWeight: 'bold', fontSize:17, marginTop:10, color:'black'}}>
                                {plant.name}
                            </Text>
                            <Text style={{fontSize:19, fontWeight:'bold'}}>Rs : {plant.price}</Text>
                        </View>
                    </View>
                    <View style={{
                        alignItems:'flex-end',
                    }}>
                        <View style={{
                            height:25,
                            width:25,
                            backgroundColor: COLORS.green,
                            borderRadius:5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{fontSize:20, fontWeight:'bold',color:COLORS.white}}>+</Text>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            
        )
    }
    const FilterData = ({plant}) => {
        if (plant != null) {
            if (plant.cat == categories[categoryIndex]) {
                return(
                    <Card plant={plant}/>
                );
            }  
        }
    }
    const googoo = (item) => {
        // console.log(item);
        return(
            item
        )
    }

    const Refreshh = () => {
        setLoading(false)
        getDatabase()
        startLoading()
    }
    useEffect(()=>{
        Refreshh()
        fetch('https://flower-house-ec4da-default-rtdb.firebaseio.com/plants.json')
        .then((res)=> res.json())
        .then((json) => {
        setIsState(json);
        })
        .catch((e) => {
        console.log(e)
        })
    },[])
    const searchText = (text) => {
        let matches = [];
        if (text) {
          matches = isState.filter(res => {
            const regex = new RegExp(text.trim());
            return res.name.match(regex);
          });
          setIsSuggestions(matches)
          setShowItems(true)
        }
        else{
          setIsSuggestions([])
          setShowItems(false)
        }
    }
    const ShowSearchItems = ({plant}) => {
        return(
            <View style={styles.SearchBarItem}>
                <Text>{plant.name}</Text>
                <Text>{plant.about}</Text>
            </View>
        )
    }
    const SetsearchNull = () => {
        let nulltext = null
        searchText(nulltext)
        setIsSuggestions([])
    }
  return (
    
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.light,
    }}>
        <View style={styles.header}>    
            <View>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Welcome to</Text>
                <Text style={{fontSize:38, fontWeight:'bold', color:COLORS.green}}>Flower House</Text>
            </View>
            <View style={{justifyContent:'flex-start',}}>
                <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                        <Image source={usericon} style={{
                            height:38, 
                            width:38, 
                            tintColor:COLORS.green,
                            resizeMode:'contain',
                            }}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={{marginTop:7, flexDirection: 'row',paddingHorizontal: 20,}}>
            <View style={{
                height: showItems ? 550 : 50,
                backgroundColor: showItems ? COLORS.light : 'white',
                borderRadius:10,
                flex: 1,
            }}>
                <View>
                    <Autocomplete 
                        data={isSuggestions}
                        onChangeText={(text) => searchText(text)}
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        listStyle={styles.listStyle}
                        placeholder='Enter products name'
                        flatListProps={{
                          renderItem:({item}) => <Card plant={item}/>
                        }}
                    />
                    <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={SetsearchNull} 
                        style={{padding:10,paddingRight:15}}>
                            <Image 
                                source={closeicon}
                                style={{
                                    width:30,
                                    height:30,
                                    resizeMode: 'contain',
                                    backgroundColor:COLORS.green,
                                    borderRadius:25,
                                    tintColor:'white',
                                }}
                            />
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
                    textStyle={styles.spinnerTextStyle}
                    size="small"
                    
                />
                <View style={{
                    alignItems:'center',
                }}>
                    <Text>Loading...</Text>
                </View>
                
            </>
        ):(
            <>
                {showItems ? (
                    <>
                    </>
                ): (
                    <>
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 50,
                            }}
                            data={myData} 
                            renderItem={({item}) => <FilterData plant={item}/>} 
                            onRefresh={()=>Refreshh()}
                            refreshing={loading}
                        />
                    </>
                )}
                
            </>
        )}
        <KeyboardAvoidingView 
            behavior='padding'
            style={{
                position:'absolute',
                bottom:0,
                width:'100%',}}
        >
            <View>
                <CustomFooter
                    t1= {() => navigation.navigate('HomeScreen')}
                    t2= {() => navigation.navigate('Notifications')}
                    t3= {() => navigation.navigate('Settings')}
                    t4= {() => Auth.signOut()}
                />
            </View>        
        </KeyboardAvoidingView>
            
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    header:{
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    input:{
        fontSize:18,
        fontWeight: 'bold',
        color: COLORS.dark,
        flex: 1,
    },
    sortbtn:{
        height:50,
        width:50,
        marginLeft:10,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
    },
    categoryContainer:{
        flexDirection: 'row',
        marginTop: 15,
        marginBottom:15,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    categoryText:{
        fontSize: 16,
        color: 'grey',
        fontWeight: 'bold',
    },
    categoryTextSelected:{
        color: COLORS.green,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: COLORS.green,
    },
    card:{
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 5,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
    containerStyle:{
        position:'absolute',
        width:'100%',
        paddingHorizontal:0,
        height:580,
      },
      inputContainerStyle:{
        borderWidth:0,
        paddingTop:5,
        marginHorizontal:10,
      },
      listStyle:{
        marginVertical:10,
        marginHorizontal:10,
      },
      SearchBarItem:{
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 5,
      },
});