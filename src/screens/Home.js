import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import { Input, Button, Card, Tile } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import OutlineButton from "../Reusable/OutlineButton";
import { AuthContext } from "../Providers/AuthProvider"
import moment from "moment";
import { useRoute } from '@react-navigation/native';

import "firebase/firestore";
import * as firebase from "firebase";

import { storeDataJSON, getDataJSON, removeData } from "../Functions/AsynchStorageFunc"
import PostCards from "../Reusable/PostsCards";
import PostScreen from "../screens/PostScreen"
import HeaderComponent from "../Reusable/HeaderComponent"
const Home = (props) => {


    const [postblog, setPostblog] = useState("");
    const [posts, setPosts] = useState([]);
   // const [counter, setcount] = useState(0)
    const route = useRoute();
    const input = React.createRef();



    const loadPosts = async () => {

        firebase
            .firestore()
            .collection("posts")
            .orderBy("created_desc", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                querySnapshot.forEach((doc) => {
                    temp_posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setPosts(temp_posts);
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        loadPosts()
    }, []);




    return (


        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.container}>
                    <HeaderComponent

                        DrawerFunction={() => {
                            props.navigation.toggleDrawer();
                        }}

                        Header={route.name}
                    />
                    <Card containerStyle={styles.cardViewStyle}>


                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}> Posts </Text>
                        <Input
                            ref={input}
                            leftIcon={<EvilIcons name="pencil" size={24} color="black" />}
                            placeholder="What's on your mind?"

                            onChangeText={function (currentInput) {
                                setPostblog(currentInput)
                            }}


                        />
                        <OutlineButton
                            Text="Post" 
                            width={290}
                            height={36}
                            fontSize={21}
                            textcolor="black"
                            bccolor="white"
                            onPress=
                            {() => {
                                input.current.clear()
                                firebase
                                    .firestore()
                                    .collection("posts")
                                    .add({
                                        userId: auth.CurrentUser.uid,
                                        body: postblog,
                                        author: auth.CurrentUser.displayName,
                                        created_at: moment().format("DD MMM, YYYY"),
                                        created_desc:firebase.firestore.Timestamp.now(),

                                    })
                                    .then( (docref) => {
                                        alert("Post id :" + docref.id);
                                        //alert(auth.CurrentUser.sid)
                                    })
                                    .catch((error) => {
                                        alert(error);
                                    });



                            }
                            }
                        >
                        </OutlineButton>

                    </Card>


                    <FlatList
                        data={posts}
                        renderItem={({ item }) => {

                            return (


                                <TouchableOpacity

                                    onLongPress={
                                        () => {
                                            Alert.alert(
                                                "Delete The Post?",
                                                "Press ok to Delete",
                                                [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    {
                                                       
                                                        text: "OK", onPress: () => {
                                                           
                                                            if (auth.CurrentUser.uid == item.data.userId) {
                                                            firebase
                                                            .firestore()
                                                            .collection("posts").doc(item.id).delete()
                                                            }
                                                            else{
                                                                alert("You're not the author of this post")
                                                            }
                                                        }



                                                    }
                                                ],
                                                { cancelable: false }
                                            );
                                        }
                                    }

                                >


                                    <PostCards
                                        author={item.data.author}
                                        postbody={item.data.body}
                                        date={item.data.created_at}
                                        docid={item.id}
                                        

                                    />
                                </TouchableOpacity>
                            )
                        }
                        }

                    />




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
            height: 170,
            width: 330,


        },

    }
)



export default Home