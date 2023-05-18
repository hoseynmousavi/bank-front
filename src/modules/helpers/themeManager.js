function configTheme()
{
    window.pushBarColor = function (props)
    {
        const event = new CustomEvent("pushBarColor", {detail: props})
        window.dispatchEvent(event)
    }

    window.popBarColor = function ()
    {
        const event = new CustomEvent("popBarColor")
        window.dispatchEvent(event)
    }
}

function pushBarColor({barColor})
{
    window.pushBarColor({barColor})
}

function subscribePushBarColor({callback})
{
    window.addEventListener("pushBarColor", callback, {passive: true})
    return () => window.removeEventListener("pushBarColor", callback)
}

function popBarColor()
{
    window.popBarColor()
}

function subscribePopBarColor({callback})
{
    window.addEventListener("popBarColor", callback, {passive: true})
    return () => window.removeEventListener("popBarColor", callback)
}

const themeManager = {
    configTheme,
    pushBarColor,
    subscribePushBarColor,
    popBarColor,
    subscribePopBarColor,
}

export default themeManager