import { View,TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput 
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry = {secureTextEntry}
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container:{
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
    input:{},
});