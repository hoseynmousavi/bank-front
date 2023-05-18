import React, {Suspense} from "react"
import LoadingWrapper from "./LoadingWrapper"
import isSafari from "../helpers/isSafari"

function SwitchItem({isTab, index, stateLength, element, location, id, onTouchStart, onTouchMove, onTouchEnd})
{
    const isSafariBrowser = isSafari()
    const isRendering = index === stateLength - 1
    const output = <Suspense fallback={isTab ? null : <LoadingWrapper haveBg/>}>{React.cloneElement(element, {location, isRendering})}</Suspense>
    return (
        <div className={`switch-cont ${isSafariBrowser ? "safari" : ""} ${isRendering ? `rendering${isTab ? "-tab" : ""}` : `hide${isTab ? "-tab" : ""}`}`} id={id} onTouchStart={!isTab ? onTouchStart : null} onTouchMove={!isTab ? onTouchMove : null} onTouchEnd={!isTab ? onTouchEnd : null}>
            <div className={`switch ${isRendering ? `${isTab ? "tab-" : ""}main-render` : ""}`} onScroll={isRendering ? window.onMainScroll : null}>
                {output}
            </div>
        </div>
    )
}

export default SwitchItem