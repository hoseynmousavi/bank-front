import {useRef} from "react"
import checkParentClass from "../helpers/checkParentClass"
import goBack from "../helpers/router/goBack"
import changeBodyOverflow from "../helpers/changeBodyOverflow"
import checkOs from "../helpers/checkOs"

export const dontSwitchGesture = "dont-switch-gesture"

function SwitchGesture({stateRef})
{
    const isIosMac = useRef(checkOs() === "mac" || checkOs() === "ios")
    let started = useRef(false)
    let changing = useRef(false)
    let posX = useRef(0)
    let posY = useRef(0)
    let translatePre = useRef(0)
    let translateNext = useRef(null)
    let deltaX = useRef(0)
    let deltaY = useRef(0)

    function onTouchStart(e)
    {
        if (!checkParentClass(e.target, dontSwitchGesture) && window.innerWidth < 480)
        {
            posX.current = e.touches?.[0].clientX || e.clientX
            posY.current = e.touches?.[0].clientY || e.clientY
            started.current = true
        }
    }

    function onTouchMove(e)
    {
        deltaX.current = posX.current - e.touches[0].clientX
        deltaY.current = posY.current - e.touches[0].clientY

        const prePage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
        const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 2]?.id)

        if ((changing.current || (started.current && deltaX.current < 0 && deltaY.current < 6 && deltaY.current > -6)) && nextPage && prePage)
        {
            changeBodyOverflow(true)
            changing.current = true
            posX.current = e.touches?.[0].clientX || e.clientX
            if (translatePre.current - deltaX.current >= 0 && translatePre.current - deltaX.current <= window.innerWidth)
            {
                translatePre.current = translatePre.current - deltaX.current

                if (translateNext.current === null) translateNext.current = -0.6 * window.innerWidth
                translateNext.current = translateNext.current - deltaX.current / 7 * 4
                nextPage.classList.toggle("hide-mobile", false)
                if (!isIosMac.current)
                {
                    nextPage.style.transition = `transform linear 0.1s`
                    prePage.style.transition = `transform linear 0.1s`
                }
                nextPage.style.willChange = `transform`
                prePage.style.willChange = `transform`
                prePage.style.transform = `translate3d(${translatePre.current}px,0,0)`
                nextPage.style.transform = `translate3d(${translateNext.current}px,0,0)`
            }
        }
        started.current = false
    }

    function onTouchEnd()
    {
        if (changing.current)
        {
            changing.current = false
            if (deltaX.current >= 6) restore()
            else if (deltaX.current <= -6) back()
            else
            {
                if (translatePre.current > window.innerWidth / 2) back()
                else restore()
            }
            changeBodyOverflow(false)
        }
    }

    function restore()
    {
        const prePage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
        const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 2].id)

        nextPage.style.transition = "transform ease-out 0.3s"
        prePage.style.transition = "transform ease-out 0.3s"
        nextPage.style.transform = `translate3d(-60%, 0, 0)`
        prePage.style.transform = `translate3d(0, 0, 0)`

        setTimeout(() =>
        {
            nextPage.style.removeProperty("transition")
            nextPage.style.removeProperty("transform")
            nextPage.style.removeProperty("will-change")
            prePage.style.removeProperty("transform")
            prePage.style.removeProperty("transition")
            prePage.style.removeProperty("will-change")
            nextPage.classList.toggle("hide-mobile", true)
            reset()
        }, 350)
    }

    function back()
    {
        goBack()
        reset()
    }

    function reset()
    {
        started.current = false
        changing.current = false
        posX.current = 0
        posY.current = 0
        translatePre.current = 0
        translateNext.current = null
        deltaX.current = 0
        deltaY.current = 0
    }

    return {onTouchStart, onTouchMove, onTouchEnd}
}

export default SwitchGesture