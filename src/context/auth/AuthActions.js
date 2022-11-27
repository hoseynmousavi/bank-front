import {SET_USER} from "./AuthTypes"
import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"

const base = process.env.REACT_APP_REST_URL

function login({username, password, dispatch})
{
    return request.post({base, url: apiUrlsConstant.login, data: {username, password}})
        .then(res =>
        {
            setUser({user: res, dispatch})
        })
}

function getTokenWithRefreshToken()
{

}

function setUser({user, dispatch})
{
    dispatch({
        type: SET_USER,
        payload: {user},
    })
}

const AuthActions = {
    login,
    setUser,
    getTokenWithRefreshToken,
}

export default AuthActions