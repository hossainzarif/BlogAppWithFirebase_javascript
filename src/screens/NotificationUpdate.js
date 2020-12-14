import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import CurvedButtons from "../Reusable/CurvedButtons"
import { Input, Button, Card, Tile } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import OutlineButton from "../Reusable/OutlineButton";
import HeaderComponent from "../Reusable/HeaderComponent"
import { useRoute } from '@react-navigation/native';
import "firebase/firestore"
import * as firebase from "firebase"
import NotificationCard from "../Reusable/NotificationCard"
const NotificationUpdate = (props) => {


    const [postnotifList, setnotifdata] = useState([]);

    const route = useRoute();



    const loadcomments = async () => {

        firebase
            .firestore()
            .collection("notification")
            .orderBy("created_at", "desc").
        onSnapshot((querySnapshot) => {
            let temp_posts = [];
            querySnapshot.forEach((doc) => {
                temp_posts.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setnotifdata(temp_posts);
        })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        loadcomments()
    }, []);



    return (
        <View style={styles.container}>

            <HeaderComponent

                DrawerFunction={() => {
                    props.navigation.toggleDrawer();
                }}

                Header={route.name}
            />


            <FlatList
                data={postnotifList}
                renderItem={({ item }) => {

                    return (

                        <NotificationCard
                            author={item.data.author}
                            type={item.data.type}


                        />
                    )
                }
                }

            />



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


export default NotificationUpdate