import checkOs from "../checkOs"

function blockIosSwipe()
{
    if (checkOs() === "ios")
    {
        const root = document.getElementById("root")

        function blockSwipe(e)
        {
            if (e.pageX && e.pageY && e.pageY > 64 && (e.pageX <= 24 || e.pageX >= window.innerWidth - 24))
            {
                e.preventDefault()
            }
        }

        root.addEventListener("touchstart", blockSwipe, {passive: false})
    }
}

export default blockIosSwipe