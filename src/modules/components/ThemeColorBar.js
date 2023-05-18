import React, {useEffect, useState} from "react"
import themeConstant from "../constant/themeConstant"
import getComputedStyleHelper from "../helpers/getComputedStyleHelper"
import GetTheme from "../hooks/GetTheme"
import themeManager from "../helpers/themeManager"

function ThemeColorBar({defaultColor = themeConstant.defaultColor})
{
    const {isDark} = GetTheme()
    const [barColors, setBarColors] = useState([getComputedStyleHelper(defaultColor)])
    const barColor = barColors[barColors.length - 1]

    useEffect(() =>
    {
        function pushBarColor(event)
        {
            const {barColor} = event.detail
            setBarColors(preBarColors => [...preBarColors, barColor])
        }

        return themeManager.subscribePushBarColor({callback: pushBarColor})
        // eslint-disable-next-line
    }, [])

    useEffect(() =>
    {
        function popBarColor()
        {
            setBarColors(preBarColors =>
            {
                const barColors = [...preBarColors]
                barColors.splice(barColors.length - 1, 1)
                if (barColors.length) return barColors
                else return [getComputedStyleHelper(defaultColor)]
            })
        }

        return themeManager.subscribePopBarColor({callback: popBarColor})
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <meta name="theme-color" content={barColor}/>
            <meta name="apple-mobile-web-app-status-bar-style" content={isDark ? "black" : "default"}/>
        </>
    )
}

export default ThemeColorBar