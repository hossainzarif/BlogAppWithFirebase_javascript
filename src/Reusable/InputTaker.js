import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { AntDesign } from '@expo/vector-icons';

const InputTaker = (props) => {
    return (

        <View style={[styles.inputstyle, { width: props.widthpass, height: props.heightpass}]}>

            <View style={{paddingTop:7}}>
            {props.leftIcon}
            </View>

            <TextInput
               style={{ width: props.widthpass, height: props.heightpass, paddingBottom: 20,fontSize:17}}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                secureTextEntry={props.bool}
                keyboardType= {props.keyboardType}

                
            >

            </TextInput>
        </View>
    )

}



const styles = StyleSheet.create(
    {
        inputstyle: {
            borderRadius: 10,
            backgroundColor: '#dedede',
            padding: 10,
            margin: 5,
            alignSelf: "center",
            flexDirection:"row"

        },


    }
)


export default InputTaker