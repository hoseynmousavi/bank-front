import React, {useEffect, useState} from "react"
import toastManager from "../helpers/toastManager"
import {INFO_TOAST} from "../constant/toastTypes"
import Toast from "./Toast"
import generateSerial from "../../helpers/generateSerial"

function ToastContainer()
{
    const [activeToasts, setActiveToasts] = useState([])

    useEffect(() =>
    {
        toastManager.configToast()

        function onToast({detail: {message, type = INFO_TOAST, onClick, removeOnChangeLocation = true}})
        {
            setActiveToasts(activeToasts =>
                activeToasts.every(item => item.message !== message) ?
                    [{id: generateSerial(), message, type, onClick, removeOnChangeLocation}, ...activeToasts]
                    :
                    activeToasts,
            )
        }

        return toastManager.subscribeAddToast({callback: onToast})
    }, [])

    function clearItem(id)
    {
        setActiveToasts(activeToasts => activeToasts.filter(item => item.id !== id))
    }

    return (
        <div className="toast-container">
            {
                activeToasts.map(item =>
                    <Toast key={item.id} item={item} clearMe={clearItem}/>,
                )
            }
        </div>
    )
}

export default ToastContainer