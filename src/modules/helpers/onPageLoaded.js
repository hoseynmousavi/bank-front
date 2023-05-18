import pageLoaded from "./pageLoaded"

function onPageLoaded()
{
    return new Promise(resolve =>
    {
        function onLoad()
        {
            if (pageLoaded())
            {
                window.removeEventListener("load", onLoad)
                resolve()
            }
            else
            {
                window.addEventListener("load", onLoad, {passive: true})
            }
        }

        onLoad()
    })
}

export default onPageLoaded