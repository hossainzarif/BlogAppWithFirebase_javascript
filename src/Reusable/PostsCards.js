import React, { useState, useEffect } from "react"
import { Card, Input } from 'react-native-elements';

import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import OutlineButton from "./OutlineButton";
import { Avatar } from 'react-native-paper';
import "firebase/firestore";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Providers/AuthProvider"


const PostCards = (props) => {




    const [textcolor, settextcolor] = useState("black")
    const [bccolor, setbccolor] = useState("white")

    const [pressed, setpress] = useState(false)

    const [like, setlike] = useState(0)
    
    const updatevalue = (press) => {
        if (press == true) {
            settextcolor("white")
            setbccolor("black")
        }
        else {
            settextcolor("black")
            setbccolor("white")
        }
    }


    const loadcomments = async () => {

        firebase
            .firestore()
            .collection("posts").doc(props.docid).collection("postLikes")
            .onSnapshot((querySnapshot) => {
                setlike(querySnapshot.size)
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        loadcomments()
    }, []);

    const useStackNavigation = useNavigation();

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.container}>

                    <Card containerStyle={styles.cardViewStyle}>
                        <View style={{ flexDirection: "row", paddingLeft: 5 }}>
                            <Avatar.Image size={28} source={require('../../assets/openvatar.jpg')} />
                            <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black', paddingLeft: 2, marginBottom: 2 }}> {props.author}</Text>
                        </View>

                        <Text style={{ fontSize: 12, color: 'black', paddingLeft: 5, marginBottom: 5 }}>
                            {props.date}
                        </Text>
                        <Text style={{ fontSize: 16, color: 'black', paddingLeft: 5 }}>
                            {props.postbody}


                        </Text>


                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                            <OutlineButton
                                Text={"Like (" + like.toString() + ")"}
                                width={90}
                                fontSize={16}
                                height={28}
                                textcolor={textcolor}
                                bccolor={bccolor}



                                onPress={
                                    () => {

                                        

                                        if (pressed == true) {
                                            setpress(false)
                                            updatevalue(false)
                                            firebase
                                            .firestore().collection("posts").doc(props.docid)
                                            .collection("postLikes").doc(auth.CurrentUser.uid)
                                            .delete()


                                            firebase
                                            .firestore()
                                            .collection("notification").add(
                                                {
                                                    type:"disliked",
                                                    author:auth.CurrentUser.displayName, 
                                                    created_at:  firebase.firestore.Timestamp.now(),
                                            
                                                }
                                            )

                                        }
                                        else {
                                            setpress(true)
                                            updatevalue(true)
                                            firebase
                                            .firestore().collection("posts").doc(props.docid)
                                            .collection("postLikes").doc(auth.CurrentUser.uid)
                                            .set({
                                                like: 1
                                            })

                                            .catch((error) => {
                                                alert(error);
                                            });

                                            firebase
                                            .firestore()
                                            .collection("notification").add(
                                                {
                                                    type:"liked",
                                                    author:auth.CurrentUser.displayName, 
                                                    created_at:  firebase.firestore.Timestamp.now(),

                                            
                                                }
                                            )
                                        }

                                       


                                  
                                    }



                                }

                            >


                            </OutlineButton>

                            <View style={{ paddingLeft: 110 }}>
                                <OutlineButton
                                    Text="Comment"
                                    width={100}
                                    textcolor="black"
                                    bccolor="white"
                                    fontSize={16}
                                    height={28}
                                    onPress={
                                        () => {

                                            useStackNavigation.navigate('PostScreen', { name: props.author, date: props.date, post: props.postbody, docid: props.docid ,likecount:like})
                                        }
                                    }


                                >

                                </OutlineButton>
                            </View>
                        </View>






                    </Card>






                </View>
            )}
        </AuthContext.Consumer>


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
            height: 150,
            width: 330


        },
    })
export default PostCards


