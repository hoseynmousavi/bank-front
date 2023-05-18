import {SET_USER} from "./AuthTypes"
import request from "../../modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"

function login({username, password, dispatch})
{
    return request.post({url: apiUrlsConstant.login, data: {username, password}})
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