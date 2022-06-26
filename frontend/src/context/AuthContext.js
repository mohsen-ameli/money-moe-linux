import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext()
 
export default AuthContext;

export const AuthProvider = ({children}) => {
    let valid
    let code = JSON.parse(localStorage.getItem('authToken'))?.code

    if (code === "token_not_valid" || code === undefined || code === null) {
        valid = false
    } else {
        valid = true
    }

    let [authToken, setAuthToken] = useState(()=> valid ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, setUser] = useState(()=> valid ? jwt_decode(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(true)

    let history = useHistory()

    let loginUser = async (e) => {
        e.preventDefault()

        let res = await fetch("/api/token/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value
            })
        })

        let data = await res.json()
        if (res.ok) {
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authToken", JSON.stringify(data))

            history.push("/home")
        } else {
            alert("bam")
        }
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authToken")
        history.push("/login")
    }

    let contextData = {
        authToken:authToken,
        user:user,
        setUser:setUser,
        setAuthToken:setAuthToken,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(()=> {

        if(authToken){
            setUser(jwt_decode(authToken.access))
        }
        setLoading(false)


    }, [authToken, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}