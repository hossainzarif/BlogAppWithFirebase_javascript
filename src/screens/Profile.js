import React, { useState } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Alert, FlatList } from "react-native"
import { Input, Button, Card, Tile, Header, Avatar } from 'react-native-elements';
import { AuthContext } from "../Providers/AuthProvider"
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { removeData } from "../Functions/AsynchStorageFunc"

import PhotoComponent from '../Reusable/PhotoComponent'
import OutlineButton from "../Reusable/OutlineButton";
import CurvedButtons from "../Reusable/CurvedButtons";
import HeaderComponent from "../Reusable/HeaderComponent"
import {useRoute} from '@react-navigation/native';

const Profile = (props) => {
    const route = useRoute();

    return (
        <AuthContext.Consumer>
            {(auth) => (

                <View>
                    <HeaderComponent
                        DrawerFunction={() => {
                            props.navigation.toggleDrawer();
                        }}
                        Header= {route.name}
                    />

                    <View style={{ justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
                        <PhotoComponent />
                    </View>


                    {/* <Text style={{ fontSize: 30, color: '#152a38', marginBottom: 20 }}> {auth.CurrentUser.name} </Text> */}


                    <Card containerStyle={styles.cardViewStyle}>
                        <Text style={{ fontSize: 25, color: 'black' }}> Name: {auth.CurrentUser.displayName} </Text>
                        <Text style={{ fontSize: 25, color: 'black' }}> Email: {auth.CurrentUser.email} </Text>
                        <Text style={{ fontSize: 25, color: 'black' }}> User ID: {auth.CurrentUser.uid} </Text>

                    </Card>

                    <Button buttonStyle={{ backgroundColor: 'black', marginTop: 40, width: 250, borderRadius: 10,justifyContent:"center",alignSelf:"center",height:42 }}
                        icon={<MaterialIcons name="delete" size={24} color="white" />}
                        title=' Delete Profile'
                        titleStyle={{ color: 'white' }}
                        type='solid'
                        onPress={function () {
                            
                        firebase
                        .firestore()
                        .collection("users").doc(auth.CurrentUser.uid).delete()
                            auth.setisLoggedin(false);
                            auth.setCurrentUser({});
                        }}
                    />



                </View>



            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({


    cardViewStyle: {
        // justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        height: 160,
        width: 330,
        marginTop: 30,


    },

});

export default Profile;
