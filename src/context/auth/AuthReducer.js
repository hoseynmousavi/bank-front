import {createContext, useEffect, useReducer} from "react"
import {LOGOUT, SET_USER} from "./AuthTypes"
import AuthActions from "./AuthActions"
import logoutManager from "../../modules/helpers/logoutManager"

export const AuthContext = createContext(null)

const initialState = null

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case SET_USER:
        {
            const {user: {data: {user, token}}} = action.payload
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            return user
        }
        case LOGOUT:
        {
            localStorage.clear()
            return init()
        }
        default:
        {
            throw new Error()
        }
    }
}

function AuthProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")
        if (token && user)
        {
            AuthActions.setUser({user: {data: {user: JSON.parse(user), token}}, dispatch})
        }

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider