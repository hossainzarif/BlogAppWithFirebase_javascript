import React, { useState, useEffect } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import { Input, Button, Card, Tile } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AuthContext } from "../Providers/AuthProvider"
import OutlineButton from "../Reusable/OutlineButton";
import CommentCard from "../Reusable/CommentCard"
import moment from "moment";
import { storeDataJSON, getDataJSON, removeData } from "../Functions/AsynchStorageFunc"
import PostCards from "../Reusable/PostsCards"
import AuthorPost from "../Reusable/AuthorPost"
import { FontAwesome } from '@expo/vector-icons';
import HeaderComponent from "../Reusable/HeaderComponent"
import { useRoute } from '@react-navigation/native';
import "firebase/firestore";
import * as firebase from "firebase"

const PostScreen = (props) => {

    const [postComment, setPostComment] = useState("");
    const [postCommentList, setCommentdata] = useState([]);
    const [counter, setcount] = useState(0)
    const [like, setlike] = useState(0)
    const [comment, setcomment] = useState(0)
    const input = React.createRef();


    const route = useRoute();

    const loadcomments = async () => {

        firebase
            .firestore()
            .collection("posts").doc(props.route.params.docid).collection("postcomments")
            .orderBy("created_desc", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                querySnapshot.forEach((doc) => {
                    temp_posts.push({
                        id: doc.id,
                        data: doc.data(),


                    });
                });
                setCommentdata(temp_posts);
                setcomment(querySnapshot.size)
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        loadcomments()
    }, []);







    return (




        <AuthContext.Consumer>
            {(auth) => (
                <View style={{ flexDirection: "column" }}>
                    <HeaderComponent
                        DrawerFunction={() => {
                            props.navigation.toggleDrawer();
                        }}
                        Header={route.name}
                    />

                    <AuthorPost
                        name={props.route.params.name}
                        postbody={props.route.params.post}
                        date={props.route.params.date}
                        likecount={props.route.params.likecount}
                        commentcount={comment}

                    />


                    <Card containerStyle={{ height: 80, width: 330, borderRadius: 10, alignItems: "center", alignContent: "center", alignSelf: "center", elevation: 5, marginTop: 170 }}>

                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>


                            <View style={{ width: 230 }}>
                                <Input
                                    ref={input}
                                    leftIcon={<FontAwesome name="pencil" size={17} color="black" />}
                                    placeholder=" Write a comment ..."

                                    onChangeText={function (currentInput) {
                                        setPostComment(currentInput)
                                    }}
                                />
                            </View>


                            <View style={{ marginTop: 13 }}>
                                <OutlineButton
                                    Text="Comment"
                                    width={80}
                                    fontSize={16}
                                    height={35}
                                    textcolor="black"
                                    bccolor="white"
                                    onPress=
                                    {() => {
                                        input.current.clear()


                                        firebase
                                            .firestore()
                                            .collection("posts").doc(props.route.params.docid).collection("postcomments")
                                            .add({
                                                userId: auth.CurrentUser.uid,
                                                body: postComment,
                                                author: auth.CurrentUser.displayName,
                                                created_at: moment().format("DD MMM, YYYY"),
                                                created_desc:firebase.firestore.Timestamp.now(),
                                            })
                                            .then((docref) => {
                                                alert("comment id :" + docref.id);

                                            })
                                            .catch((error) => {
                                                alert(error);
                                            });
                                            
                                            firebase
                                            .firestore()
                                            .collection("notification").add(
                                                {
                                                    type:"commented",
                                                    author:auth.CurrentUser.displayName,
                                                    created_at:  firebase.firestore.Timestamp.now(),
                                            
                                                }
                                            )


                                    }

                                    }

                                >
                                </OutlineButton>
                            </View>


                        </View>
                    </Card>


                    <FlatList
                        
                        data={postCommentList}
                        renderItem={({ item }) => {

                            return (
                                <TouchableOpacity
                                    onLongPress={() => {
                                        Alert.alert(
                                            "Delete The Comment?",
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
                                                                .collection("posts").doc(props.route.params.docid).collection("postcomments").doc(item.id).delete()
                                                        }

                                                        else {
                                                            alert("You're not the author of this post")
                                                        }
                                                    }



                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                >



                                    <CommentCard
                                        name={item.data.author}
                                        comment={item.data.body}
                                        date={item.data.created_at}

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

        cardViewStyle: {
            // justifyContent: 'center',
            borderRadius: 10,
            elevation: 5,
            height: 170,
            width: 330,


        },

    }
)
export default PostScreen