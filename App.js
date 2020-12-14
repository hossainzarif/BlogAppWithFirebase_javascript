import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Home from './src/screens/Home'
import SignUp from './src/screens/SignUp'
import SignIn from './src/screens/SignIn'
import { createDrawerNavigator } from '@react-navigation/drawer';
import NotificationUpdate from './src/screens/NotificationUpdate'
import OutlineButton from './src/Reusable/OutlineButton'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as firebase from "firebase";
import { AuthContext, AuthProvider } from "./src/Providers/AuthProvider"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Profile from './src/screens/Profile'
import PostScreen from './src/screens/PostScreen'

const HomeStack = createStackNavigator()
const AuthStack = createStackNavigator()
const HomeTab= createMaterialBottomTabNavigator()

const AppDrawer= createDrawerNavigator()


const firebaseConfig = {
  apiKey: "AIzaSyA7EMm3U1I2s6u4VSeBhu-OA8sWjSpEPEY",
  authDomain: "blogapp-9b3c9.firebaseapp.com",
  projectId: "blogapp-9b3c9",
  storageBucket: "blogapp-9b3c9.appspot.com",
  messagingSenderId: "763473065014",
  appId: "1:763473065014:web:af45642225c7de81f4d497",
  measurementId: "G-MSNMTR1ZWZ"
};

if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig)
}
const AppDrawerScreen = () =>
{
  return(

    <AppDrawer.Navigator  initialRouteName="Home"> 

    <AppDrawer.Screen name="Home" component={HomeTabScreen} options={{headerShown: false}} />
    <AppDrawer.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
    </AppDrawer.Navigator>
  )
}

const HomeStackScreen =()=>
{
  return(
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}}  />
      <HomeStack.Screen name ="PostScreen" component= {PostScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  )
}
const HomeTabScreen=()=>
{
  return(
    <HomeTab.Navigator barStyle={{backgroundColor:"white"}}>
      <HomeTab.Screen name = "Home" component={ HomeStackScreen}
      
      options={{
        
        tabBarLabel: "Home",
        tabBarColor:"white",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="home" size={26} color="black" />
          ) : (
            <MaterialCommunityIcons name="home-outline" size={24} color="black" />
          ),
         
          
          
      }}

      
        
   />


   <HomeTab.Screen name ="Notification" component = {NotificationUpdate}
   
   options={{
    tabBarLabel: "Notifications",
    tabBarIcon: ({ focused }) =>
      focused ? (
        <MaterialIcons name="notifications" size={26} color="black" />
      ) : (
        <MaterialIcons name="notifications-none" size={24} color="black" />
      ),
  }}
  
   />
      
    </HomeTab.Navigator>

      

  )
}

const AuthStackScreen = () => {

  return (

    <AuthStack.Navigator
      initialRouteName="SignIn">
      <AuthStack.Screen name="SignUp" component={SignUp} options={{
        headerShown: false,
      }} />

      <AuthStack.Screen name="SignIn" component={SignIn} options={{
        headerShown: false,
      }} />

    </AuthStack.Navigator>
  )
}



function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.isLoggedin ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>

  )
}

export default App