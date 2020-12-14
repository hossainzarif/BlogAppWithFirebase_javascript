import React, { useState } from 'react'

const AuthContext = React.createContext()

const AuthProvider = (props) => {
    const [CurrentUser, setCurrentUser] = useState({})
    const [isLoggedin, setisLoggedin] = useState(false)

    
    return(
        <AuthContext.Provider value={{
            CurrentUser: CurrentUser,
            setCurrentUser: setCurrentUser,
            setisLoggedin: setisLoggedin,
            isLoggedin:isLoggedin
        }}>
            {props.children}
        </AuthContext.Provider>
    )



}


export { AuthContext, AuthProvider }