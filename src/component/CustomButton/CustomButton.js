import React from 'react'
import {Text, StyleSheet, Pressable} from 'react-native'

const CustomButton = ({onPress, text, bgColor, fgColor}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, bgColor ? {backgroundColor: bgColor} : {},]}>
        <Text style={[styles.text, fgColor ? {color: fgColor} : {}]}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3B71F3',
        width: '100%',
        padding: 15,
        marginVertical:10,
        alignItems: 'center',
        borderRadius:20,
        shadowOpacity: 1.1,
        shadowRadius: 4.65,
        shadowColor: "000#",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 4,
    },
    text:{
        fontWeight: 'bold',
        color:'white',
    },  
    icons:{
        width: '2%',
        height: '2%',
        flexDirection: 'row',
    },
});