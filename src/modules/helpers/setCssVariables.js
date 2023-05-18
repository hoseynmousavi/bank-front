import onResize from "./onResize"
import isStandalone from "./isStandalone"

function setCssVariables()
{
    let timeout = null
    fitVariables({isFirstTime: true})

    function fitVariables({isFirstTime = false})
    {
        function setStyle()
        {
            const clientHeight = window.innerHeight
            document.documentElement.style.setProperty(
                "--full-height",
                clientHeight + "px",
            )
        }

        if (isFirstTime || !isStandalone()) setStyle()
        else
        {
            clearTimeout(timeout)
            timeout = setTimeout(setStyle, 100)
        }
    }

    onResize({callback: fitVariables})
}

export default setCssVariables