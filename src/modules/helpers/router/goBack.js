import router from "./router"

function goBack({fallback = "/", delta = -1} = {})
{
    const stack = router.getStack()
    if (stack.length >= 1 - delta)
    {
        window.history.go(delta)
    }
    else
    {
        router.replaceState({url: fallback})
    }
}

export default goBack