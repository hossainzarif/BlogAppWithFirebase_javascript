import React from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert } from "react-native"
import CurvedButtons from "../Reusable/CurvedButtons"
import { Input, Button, Card, Tile } from 'react-native-elements';

const NotificationCard = (props) => {

    return (
        <View style={styles.container}>

            
            <Card containerStyle={styles.cardViewStyle}>


                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}> {props.author} {props.type} the post </Text>




            </Card>
            

        </View>



    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },


        cardViewStyle: {
            // justifyContent: 'center',
            borderRadius: 10,
            elevation: 5,
            height: 50,
            width: 330


        },

    }
)


export default NotificationCard