import {useLayoutEffect, useRef} from "react"
import PlusSvg from "../media/svg/PlusSvg"
import Material from "./Material"
import CheckSvg from "../media/svg/CheckSvg"
import InfoSvg from "../media/svg/InfoSvg"
import CloseSvg from "../media/svg/CloseSvg"
import {INFO_TOAST, SUCCESS_TOAST, TIMER_TOAST} from "../constant/toastTypes"
import onPageLoaded from "../helpers/onPageLoaded"

function Toast({item: {id, message, type, onClick, removeOnChangeLocation}, clearMe})
{
    const timerInMili = TIMER_TOAST * 1000
    const toastRef = useRef(null)
    const toastMessageRef = useRef(null)
    const clearTimer = useRef(null)
    const unMountTimer = useRef(null)

    useLayoutEffect(() =>
    {
        onPageLoaded()
            .then(() =>
            {
                toastRef.current.style.transition = "height ease 0.1s, margin-bottom ease 0.1s, padding ease 0.1s, opacity ease 0.3s 0.1s"
                toastRef.current.style.height = toastMessageRef.current.scrollHeight + 32 + "px"
                toastRef.current.style.marginBottom = "8px"
                toastRef.current.style.padding = "12px 12px"
                toastRef.current.style.opacity = "1"
                unMountTimer.current = setTimeout(clearItem, timerInMili)
            })

        return () => clearTimeout(unMountTimer.current)
        // eslint-disable-next-line
    }, [])

    useLayoutEffect(() =>
    {
        if (removeOnChangeLocation)
        {
            window.addEventListener("popstate", clearItem, {passive: true})
            window.addEventListener("pushstate", clearItem, {passive: true})
            window.addEventListener("replacestate", clearItem, {passive: true})

            return () =>
            {
                window.removeEventListener("popstate", clearItem)
                window.removeEventListener("pushstate", clearItem)
                window.removeEventListener("replacestate", clearItem)
            }
        }
        // eslint-disable-next-line
    }, [])

    function clearItem()
    {
        if (!clearTimer.current)
        {
            toastRef.current.style.transition = "height ease 0.1s 0.3s, margin-bottom ease 0.1s 0.3s, padding ease 0.1s 0.3s, opacity ease 0.3s"
            toastRef.current.style.height = "0"
            toastRef.current.style.marginBottom = "0"
            toastRef.current.style.padding = "0 12px"
            toastRef.current.style.opacity = "0"
            clearTimeout(unMountTimer.current)
            clearTimer.current = setTimeout(() => clearMe(id), 500)
        }
    }

    function onClickFunc()
    {
        onClick()
        clearItem()
    }

    return (
        <div className={`toast-item ${type}`} ref={toastRef} style={{height: "0", opacity: "0", marginBottom: "0", padding: "0 12px"}} onTouchEnd={!onClick ? clearItem : null} onClick={onClick ? onClickFunc : clearItem}>
            <div className="toast-item-message" ref={toastMessageRef}>
                {
                    type === SUCCESS_TOAST ?
                        <CheckSvg className="toast-item-svg success"/>
                        :
                        type === INFO_TOAST ?
                            <InfoSvg className="toast-item-svg info"/>
                            :
                            <CloseSvg className="toast-item-svg fail"/>
                }
                {message}
            </div>
            <Material className="toast-item-close-material" onClick={onClick ? clearItem : undefined}>
                <PlusSvg className="toast-item-close"/>
            </Material>
        </div>
    )
}

export default Toast