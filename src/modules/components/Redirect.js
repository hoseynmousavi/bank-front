import {memo, useEffect, useRef} from "react"
import router from "../helpers/router/router"

function Redirect({to, push})
{
    const timer = useRef(null)

    useEffect(() =>
    {
        clearTimeout(timer.current)
        timer.current = setTimeout(() =>
        {
            if (push)
            {
                router.pushState({url: to})
            }
            else
            {
                router.replaceState({url: to})
            }
        }, 100)
        // eslint-disable-next-line
    }, [])
}

export default memo(Redirect)