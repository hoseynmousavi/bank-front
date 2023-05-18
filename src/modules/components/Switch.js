import React, {Children, useEffect, useRef, useState} from "react"
import SwitchItem from "./SwitchItem"
import pageLoaded from "../helpers/pageLoaded"
import generateSerial from "../../helpers/generateSerial"
import SwitchGesture from "../hooks/SwitchGesture"
import parseTranslateX from "../helpers/parseTranslateX"

function Switch({children, isTab, tabClassName, desktopAnimation})
{
    const arrayChildren = Children.toArray(children)
    const defaultUrl = window.location.pathname
    const urls = arrayChildren.reduce((sum, item) => [...sum, item.props.path === "*" ? ".*" : item.props.exact ? `^${item.props.path}(\\/?)$` : `^${item.props.path.replace(/:\w+/g, ".+")}`], [])
    const defaultState = getDefaultState()
    const [state, setState] = useState(defaultState)
    const stateRef = useRef(defaultState)
    const contRef = useRef(null)
    const {onTouchStart, onTouchMove, onTouchEnd} = SwitchGesture({stateRef})

    function getDefaultState()
    {
        if (urls.indexOf(urls.filter(url => url && new RegExp(url).test(defaultUrl))[0]) >= 0)
        {
            return [{showChildIndex: urls.indexOf(urls.filter(url => url && new RegExp(url).test(defaultUrl))[0]), location: defaultUrl, id: `initial${generateSerial()}`}]
        }
        else
        {
            return []
        }
    }

    useEffect(() =>
    {
        let preLocation = window.location.pathname

        function changeRoute(e)
        {
            const {type} = e
            const locationTemp = window.location.pathname
            preLocation = locationTemp
            const showChildIndexTemp = urls.indexOf(urls.filter(url => url && new RegExp(url).test(locationTemp))[0])
            const {showChildIndex, location} = stateRef.current[stateRef.current.length - 1] || {}
            const {data} = e?.target?.history?.state ?? {}
            if ((type === "popstate" || data !== "for-history") && location !== locationTemp)
            {
                if (arrayChildren?.[showChildIndexTemp]?.props?.isContainer && showChildIndex === showChildIndexTemp)
                {
                    setStateFunc({type: "replacestate", showChildIndex, location: locationTemp})
                }
                else
                {
                    if (window.innerWidth <= 480 && !isTab && !desktopAnimation)
                    {
                        if (type === "popstate") mobileBack(showChildIndexTemp, locationTemp, type)
                        else mobileForward(showChildIndexTemp, locationTemp, type, data)
                    }
                    else desktopRoute(showChildIndexTemp, locationTemp, type)
                }
            }
        }

        if (pageLoaded()) window.addEventListener("popstate", changeRoute, {passive: true})
        else
        {
            const intervalMs = 400
            const interval = setInterval(() =>
            {
                const nowLocation = window.location.pathname
                if (preLocation !== nowLocation) changeRoute({type: "popstate"})
            }, intervalMs)

            function loaded()
            {
                setTimeout(() =>
                {
                    clearInterval(interval)
                    window.addEventListener("popstate", changeRoute, {passive: true})
                    window.removeEventListener("load", loaded)
                }, intervalMs)
            }

            window.addEventListener("load", loaded, {passive: true})
        }
        window.addEventListener("pushstate", changeRoute, {passive: true})
        window.addEventListener("replacestate", changeRoute, {passive: true})

        return () =>
        {
            window.removeEventListener("popstate", changeRoute)
            window.removeEventListener("pushstate", changeRoute)
            window.removeEventListener("replacestate", changeRoute)
        }
        // eslint-disable-next-line
    }, [])

    function mobileForward(showChildIndexTemp, locationTemp, type, data = "right")
    {
        if (typeof requestAnimationFrame === "undefined") desktopRoute(showChildIndexTemp, locationTemp, type)
        else
        {
            if (type === "pushstate")
            {
                const id = generateSerial()
                setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id})

                function doTheJob()
                {
                    if (document.getElementById(id))
                    {
                        const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
                        const prePage = document.getElementById(stateRef.current[stateRef.current.length - 2].id)

                        nextPage.style.willChange = `transform`
                        nextPage.style.transform = `translate3d(100%, 0, 0)`
                        nextPage.classList.toggle("hide-mobile", false)
                        prePage.style.willChange = `transform`

                        setTimeout(() =>
                        {
                            nextPage.style.transition = "transform ease 0.45s"
                            prePage.style.transition = "transform ease 0.45s"
                            nextPage.style.transform = `translate3d(0, 0, 0)`
                            prePage.style.transform = `translate3d(-60%, 0, 0)`

                            setTimeout(() =>
                            {
                                nextPage.style.removeProperty("will-change")
                                nextPage.style.removeProperty("transform")
                                nextPage.style.removeProperty("transition")
                                prePage.style.removeProperty("will-change")
                                prePage.style.removeProperty("transform")
                                prePage.style.removeProperty("transition")
                                prePage.classList.toggle("hide-mobile", true)
                            }, 500)
                        }, 10)
                    }
                    else setTimeout(doTheJob, 0)
                }

                setTimeout(doTheJob, 0)
            }
            else
            {
                if (data === "desktop")
                {
                    desktopRoute(showChildIndexTemp, locationTemp, type)
                }
                else
                {
                    const goRight = data === "right"
                    contRef.current.style.opacity = 0
                    contRef.current.animate([{transform: "translate3d(0,0,0)", opacity: 1}, {transform: `translate3d(${goRight ? "50%" : "-50%"},0,0)`, opacity: 0}], {duration: 250, easing: "ease-in"})
                    setTimeout(() =>
                    {
                        if (contRef.current)
                        {
                            setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, id: generateSerial()})
                            setTimeout(() =>
                            {
                                const nextPage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)
                                if (nextPage) nextPage.classList.toggle("hide-mobile", false)
                                contRef.current.animate([{transform: `translate3d(${goRight ? "-50%" : "50%"},0,0)`, opacity: 0}, {transform: "translate3d(0,0,0)", opacity: 1}], {duration: 250, easing: "ease-out"})
                                setTimeout(() => contRef.current.style.removeProperty("opacity"), 10)
                            }, 10)
                        }
                    }, 260)
                }
            }
        }
    }

    function mobileBack(showChildIndexTemp, locationTemp, type)
    {
        if (typeof requestAnimationFrame === "undefined") desktopRoute(showChildIndexTemp, locationTemp, type)
        else
        {
            const delta = getDelta({showChildIndexTemp})

            function doTheJob()
            {
                const nextPage = document.getElementById(stateRef.current[stateRef.current.length - (1 + delta)].id)
                const prePage = document.getElementById(stateRef.current[stateRef.current.length - 1].id)

                const next = parseTranslateX({transform: nextPage.style.transform, fallback: -60})

                nextPage.style.willChange = `transform`
                nextPage.style.transform = `translate3d(${next}%, 0, 0)`
                nextPage.classList.toggle("hide-mobile", false)
                prePage.style.willChange = `transform`

                setTimeout(() =>
                {
                    nextPage.style.transition = "transform ease-out 0.45s"
                    prePage.style.transition = "transform ease-out 0.45s"
                    nextPage.style.transform = `translate3d(0, 0, 0)`
                    prePage.style.transform = `translate3d(100%, 0, 0)`

                    setTimeout(() =>
                    {
                        nextPage.style.removeProperty("will-change")
                        nextPage.style.removeProperty("transform")
                        nextPage.style.removeProperty("transition")
                        setStateFunc({type, showChildIndex: showChildIndexTemp, location: locationTemp, delta})
                    }, 500)
                }, 0)
            }

            if (stateRef.current.length >= delta + 1) doTheJob()
            else
            {
                setStateFunc({showChildIndex: showChildIndexTemp, location: locationTemp, id: generateSerial()})
                setTimeout(doTheJob, 10)
            }
        }
    }

    function desktopRoute(showChildIndexTemp, locationTemp, type)
    {
        const delta = getDelta({showChildIndexTemp})

        if (contRef.current)
        {
            contRef.current.style.opacity = 0
            contRef.current.animate([{opacity: 1}, {opacity: 0}], {duration: 300, easing: "ease-in"})
            setTimeout(() =>
            {
                if (contRef.current)
                {
                    setStateFunc({
                        type: type === "popstate" && stateRef.current.length < delta + 1 ? null : type,
                        showChildIndex: showChildIndexTemp,
                        location: locationTemp,
                        id: generateSerial(),
                        delta,
                    })
                    setTimeout(() =>
                    {
                        if (contRef.current)
                        {
                            contRef.current.animate([{opacity: 0}, {opacity: 1}], {duration: 300, easing: "ease-out"})
                            setTimeout(() => contRef.current.style.removeProperty("opacity"), 10)
                        }
                    }, 10)
                }
            }, 300)
        }
    }

    function getDelta({showChildIndexTemp})
    {
        let delta = 1
        if (stateRef.current.length)
        {
            for (let i = stateRef.current.length - 1; i--; i >= 0)
            {
                if (stateRef.current[i].showChildIndex === showChildIndexTemp)
                {
                    delta = (stateRef.current.length - 1) - i
                    break
                }
            }
        }
        return delta
    }

    function setStateFunc({type, showChildIndex, location, id, delta})
    {
        if (type === "replacestate")
        {
            const lastItemRef = stateRef.current[stateRef.current.length - 1]
            stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - 1), {...lastItemRef, showChildIndex, location, ...(id ? {id} : {})}]
        }
        else if (type === "pushstate")
        {
            stateRef.current = [...stateRef.current, {showChildIndex, location, id}]
        }
        else if (type === "popstate")
        {
            const lastItemRef = stateRef.current[stateRef.current.length - (delta + 1)]
            stateRef.current = [...stateRef.current.slice(0, stateRef.current.length - (delta + 1)), {...lastItemRef, showChildIndex, location}]
        }
        else
        {
            if (showChildIndex >= 0) stateRef.current = [{showChildIndex, location, id}, ...(window.innerWidth <= 480 && !isTab && !desktopAnimation ? stateRef.current : [])]
            else stateRef.current = [...(window.innerWidth <= 480 && !isTab && !desktopAnimation ? stateRef.current : [])]
        }
        setState(stateRef.current)
    }

    const output = state.map((item, index) =>
    {
        const {showChildIndex, location, id} = item
        const element = arrayChildren[showChildIndex]
        if (element)
        {
            return <SwitchItem key={id}
                               element={element}
                               location={location}
                               index={index}
                               stateLength={state.length}
                               isTab={isTab}
                               id={id}
                               onTouchStart={onTouchStart}
                               onTouchMove={onTouchMove}
                               onTouchEnd={onTouchEnd}
            />
        }
        else return null
    })

    if (isTab) return <div className={`switch-tab-cont ${tabClassName}`} ref={contRef}>{output}</div>
    else return <div ref={contRef}>{output}</div>
}

export default Switch