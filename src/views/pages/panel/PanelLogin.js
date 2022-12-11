import ImageShow from "../../../seyed-modules/components/ImageShow"
import logo from "../../../media/images/logo.png"
import Input from "../../components/Input"
import Button from "../../../seyed-modules/components/Button"
import {useContext, useState} from "react"
import AuthActions from "../../../context/auth/AuthActions"
import {AuthContext} from "../../../context/auth/AuthReducer"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {FAIL_TOAST, SUCCESS_TOAST} from "../../../seyed-modules/constant/toastTypes"

function PanelLogin()
{
    const {dispatch} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({})
    const {username, password} = values
    const isDisable = !password || !username

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function login()
    {
        setIsLoading(true)
        AuthActions.login({username, password, dispatch})
            .then(() =>
            {
                setIsLoading(false)
                toastManager.addToast({message: "OK", type: SUCCESS_TOAST})
            })
            .catch(err =>
            {
                toastManager.addToast({message: err?.response?.data?.message, type: FAIL_TOAST})
                setIsLoading(false)
            })
    }

    return (
        <div className="panel-login">
            <div className="panel-login-box">
                <ImageShow className="panel-login-box-logo" src={logo}/>
                <Input name="username" label="نام کاربری" placeholder="نام کاربری شما" onChange={onChange} disableSubmit={isDisable} disabled={isLoading}/>
                <Input type="password" name="password" label="رمز عبور" placeholder="رمز عبور شما" onChange={onChange} onSubmit={login} disableSubmit={isDisable} disabled={isLoading}/>
                <Button loading={isLoading} disable={isDisable} className="panel-login-box-btn" onClick={login}>
                    ورود به داشبورد
                </Button>
            </div>
        </div>
    )
}

export default PanelLogin