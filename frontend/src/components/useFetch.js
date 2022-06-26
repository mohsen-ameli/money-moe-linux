import { useContext } from 'react'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import AuthContext from '../context/AuthContext';


let useFetch = () => {
    let config = {}

    let {authToken, setAuthToken, setUser} = useContext(AuthContext)


    let originalRequest = async (url, config)=> {
        url = `${url}`
        let response = await fetch(url, config)
        let data = await response.json()
        return {response, data}
    }

    let refreshToken = (authToken) => {
        console.log("Expired")
        fetch('/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authToken.refresh})
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log("data: ", data)
            localStorage.setItem('authToken', JSON.stringify(data))
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            return data
        })
        .catch(err => console.log("error: ", err))
    }

    let callFetch = async (url, conf) => {
        config['method'] = conf?.method
        config['body'] = conf?.body

        const user = jwt_decode(authToken.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if(isExpired){
            authToken = await refreshToken(authToken)
        }

        config['headers'] = {
            Authorization:`Bearer ${authToken?.access}`,
            'X-CSRFToken':conf?.headers
        }

        let {response, data} = await originalRequest(url, config)
        return {response, data}
    }

    return callFetch
}

export default useFetch;