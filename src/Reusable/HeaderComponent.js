import React from "react";
import { Header } from "react-native-elements";
import { AuthContext } from "../Providers/AuthProvider";
const HeaderHome = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header
        backgroundColor='#fff'
          leftComponent={{
            icon: "menu",
            color: "black",
            onPress: props.DrawerFunction,
          }}
          centerComponent={{ text: props.Header, style: { color: "black",fontSize:22 } }}
          rightComponent={{
            icon: "lock-outline",
            color: "black",
            onPress: function () {
                auth.setisLoggedin(false);
                auth.setCurrentUser({});
          
          },
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderHome;