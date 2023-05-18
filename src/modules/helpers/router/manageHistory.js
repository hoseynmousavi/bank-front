import generateSerial from "../../../helpers/generateSerial"
import getLocation from "./getLocation"

function manageHistory()
{
    const historyStackLocal = sessionStorage.getItem("history-stack")
    let historyStack = historyStackLocal ? JSON.parse(historyStackLocal) : []
    if (historyStack[historyStack.length - 1]?.location !== getLocation())
    {
        historyStack.push({id: generateSerial(), location: getLocation()})
    }
    save()

    function popstate(e)
    {
        const {id} = e?.target?.history?.state || e?.state || {}
        const index = id ? historyStack.findIndex(item => item?.id === id) : 0
        let isPop = !id || index !== -1
        if (isPop)
        {
            const temp = historyStack.length - 1 - index
            historyStack.splice(-temp, temp)
        }
        else
        {
            historyStack.push({id, location: getLocation()})
        }
        save()
    }

    function pushstate(e)
    {
        const {id} = e?.target?.history?.state ?? {}
        historyStack.push({id, location: getLocation()})
        save()
    }

    function replacestate(e)
    {
        const {id} = e?.target?.history?.state ?? {}
        historyStack.pop()
        historyStack.push({id, location: getLocation()})
        save()
    }

    function save()
    {
        sessionStorage.setItem("history-stack", JSON.stringify(historyStack))
        window.historyStack = historyStack
    }

    window.addEventListener("popstate", popstate, {passive: true})
    window.addEventListener("pushstate", pushstate, {passive: true})
    window.addEventListener("replacestate", replacestate, {passive: true})
}

export default manageHistory