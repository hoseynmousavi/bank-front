import React, {memo} from "react"
import checkOs from "../helpers/checkOs"

function MyLoader({className, width = 40, strokeWidth = 3, color})
{
    if (checkOs() === "mac" || checkOs() === "ios")
    {
        const backgroundColor = color || "var(--second-text-color)"
        return (
            <div className={`ios-loader ${className}`} style={{width: width + "px", height: width + "px"}}>
                <div className="ios-loader-part one">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
                <div className="ios-loader-part two">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
                <div className="ios-loader-part three">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
                <div className="ios-loader-part four">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
                <div className="ios-loader-part five">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
                <div className="ios-loader-part six">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
                <div className="ios-loader-part seven">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
                <div className="ios-loader-part eight">
                    <div className="ios-loader-part-after" style={{backgroundColor}}/>
                </div>
            </div>
        )
    }
    else
    {
        const stroke = color || "var(--first-color)"
        return (
            <svg className={`circular ${className}`} width={width} height={width} viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10" style={{stroke}}/>
            </svg>
        )
    }
}

export default memo(MyLoader)