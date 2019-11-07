import React, {Component} from 'react';
import axios from "axios"

const axiosReq = axios.create()
const AuthContext = React.createContext()

//konfigurasi untuk axios
axiosReq.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token')
    //`Bearer ${token}`
    config.headers.Authorization = token
    return config 
})

export class AuthContextProvider extends Component {
    
    constructor(){
        super()
        this.state = {
            users : [],
            user: localStorage.getItem('user') || "",
            //user: JSON.parse(localStorage.getItem('user')) || {},
            token: localStorage.getItem('token') || "",
            isLoggedIn: (localStorage.getItem('token') === null) ? false : true
        }
    }

    initUser = () =>{
        return axiosReq.get("http://localhost:4000/api/profile")
                .then(response => {
                    this.setState({ user: response.data });
                    return response;
                })   
    }

    //login
    login = (credentials) => {
        return axiosReq.post("http://localhost:4000/api/login", credentials)
                .then(response => {
                    const { token } =  response.data
                    //let user = credentials.email

                    localStorage.setItem("token", token)
                    //localStorage.setItem("user", user)

                    this.setState({
                        token,
                        isLoggedIn: true
                    })

                    return console.log(response)
                })
    }

    //logout
    logout = () => {
        localStorage.removeItem('token')

        this.setState({
            isLoggedIn: false
        })

        return console.log('Logout!')
    }

    render(){
        return(
            <AuthContext.Provider value={{
                                            login: this.login,
                                            logout: this.logout,
                                            initUser: this.initUser,
                                            ...this.state
                                        }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}


//Higher Order Component
export const withAuth = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <AuthContext.Consumer>
                    {(context) => (
                        <WrappedComponent {...this.props} {...context} />
                    )}
                </AuthContext.Consumer>
            )
        }
    }
}