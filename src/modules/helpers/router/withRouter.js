import React, {useEffect} from "react"
import blockIosSwipe from "./blockIosSwipe"
import manageHistory from "./manageHistory"
import getLocation from "./getLocation"

function withRouter(WrappedComponent)
{
    return function ()
    {
        useEffect(() =>
        {
            if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"
            window.onMainScroll = function ({target: {scrollTop, scrollHeight}})
            {
                const event = new CustomEvent("onMainScroll", {detail: {scrollTop, scrollHeight}})
                window.dispatchEvent(event)
            }

            const pushState = window.history.pushState
            window.routerPushState = function ()
            {
                if (decodeURIComponent(getLocation()) !== decodeURIComponent(arguments[2]) || arguments[0]?.data === "for-history")
                {
                    pushState.apply(this.history, arguments)
                    const event = new Event("pushstate")
                    window.dispatchEvent(event)
                }
            }

            const replaceState = window.history.replaceState
            window.routerReplaceState = function ()
            {
                if (decodeURIComponent(getLocation()) !== decodeURIComponent(arguments[2]) || arguments[0]?.data === "for-history")
                {
                    replaceState.apply(this.history, arguments)
                    const event = new Event("replacestate")
                    window.dispatchEvent(event)
                }
            }

            manageHistory()

            blockIosSwipe()
        }, [])

        return <WrappedComponent/>
    }
}

export default withRouter