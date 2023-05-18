import React, {memo} from "react"
import router from "../helpers/router/router"

function Link({children, to, className, onClick, replace, style, draggable = "false", data})
{
    const Tag = to ? "a" : "div"
    const go = e =>
    {
        onClick?.()
        if (to)
        {
            const isExternal = to && (to.includes("http://") || to.includes("https://"))
            if (!isExternal)
            {
                e.preventDefault()
                setTimeout(() =>
                {
                    router[replace ? "replaceState" : "pushState"]({url: to, data})
                }, 50)
            }
        }
    }

    return <Tag tabIndex="-1" href={to} style={style} draggable={draggable} onClick={go} className={className}>{children}</Tag>
}

export default memo(Link)