import generateSerial from "../../../helpers/generateSerial"
import goBack from "./goBack"

function pushState({url, data = ""})
{
    const id = generateSerial()
    window.routerPushState({id, data}, "", url)
}

function replaceState({url, data = ""})
{
    const stack = getStack()
    if (stack[stack.length - 2]?.location === url)
    {
        goBack()
    }
    else
    {
        const id = generateSerial()
        window.routerReplaceState({id, data}, "", url)
    }
}

function getStack()
{
    return window.historyStack || []
}

const router = {
    pushState,
    replaceState,
    getStack,
}

export default router