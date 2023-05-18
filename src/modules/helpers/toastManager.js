function configToast()
{
    window.addToast = function (props)
    {
        const event = new CustomEvent("addToast", {detail: props})
        window.dispatchEvent(event)
    }
}

function addToast({message, type, onClick, removeOnChangeLocation})
{
    if (typeof window !== "undefined") window.addToast({message, type, onClick, removeOnChangeLocation})
}

function subscribeAddToast({callback})
{
    window.addEventListener("addToast", callback, {passive: true})
    return () => window.removeEventListener("addToast", callback)
}

const toastManager = {
    configToast,
    addToast,
    subscribeAddToast,
}

export default toastManager