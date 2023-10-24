import { View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React from 'react'
import COLOR from '../../consts/colors';
import homeIcon from '../../../assets/images/home.png';
import notiIcon from '../../../assets/images/noti.png';
import settingIcon from '../../../assets/images/setting.png';
import logoutIcon from '../../../assets/images/logout.png';


const CustomFooter = ({t1,t2,t3,t4}) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity onPress={t1}>
            {imageTouch(homeIcon)}
        </TouchableOpacity>

        <TouchableOpacity onPress={t2}>
            {imageTouch(notiIcon)}
        </TouchableOpacity>

        <TouchableOpacity onPress={t3}>
            {imageTouch(settingIcon)}
        </TouchableOpacity>

        <TouchableOpacity onPress={t4}>
            {imageTouch(logoutIcon)}
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

const imageTouch = (img) => {
    return(
        <View>
            <Image source={img} style={styles.images} />
        </View>
    )
}

export default CustomFooter

const styles= StyleSheet.create({
    root:{
        backgroundColor: COLOR.green,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopRightRadius:18,
        borderTopLeftRadius:18,
    },
    container:{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom:10,
        alignItems: 'center',
    },
    images:{
        width:20,
        height:20,
        resizeMode: 'contain',
        tintColor : 'white',
        marginHorizontal: 31,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
})