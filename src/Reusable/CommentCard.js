import React, { useState } from "react"
import { Card, Input } from 'react-native-elements';

import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import { Avatar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const PostCards = (props) => {
    const useStackNavigation = useNavigation();

    return (
        <View >

            <Card containerStyle={styles.cardViewStyle}>
                <View style={{ flexDirection: "row", paddingLeft: 5 }}>
                    <Avatar.Image size={28} source={require('../../assets/openvatar.jpg')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingLeft: 2 }}> {props.name}</Text>
                </View>

                <Text style={{ fontSize: 12, color: 'black', paddingLeft: 5 }}>
                    {props.date}
                </Text>
                <Text style={{ fontSize: 16, color: 'black', paddingLeft: 5}}>
                    {props.comment}
                </Text>

               

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
            height: 100,
            width: 330,
            


        },
    })
export default PostCards


