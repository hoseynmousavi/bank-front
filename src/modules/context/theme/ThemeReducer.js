import {createContext, useEffect, useReducer} from "react"
import themeManager from "../../helpers/themeManager"
import setCssVariables from "../../helpers/setCssVariables"
import checkOs from "../../helpers/checkOs"

export const ThemeContext = createContext(null)

function ThemeProvider({children})
{
    const initialState = {
        theme: "light",
    }

    const [state, dispatch] = useReducer(reducer, initialState, init)

    function init()
    {
        return initialState
    }

    function reducer(state, action)
    {
        switch (action.type)
        {
            default:
            {
                throw new Error()
            }
        }
    }

    useEffect(() =>
    {
        setCssVariables()
        if (checkOs() === "ios") document.getElementById("root").className = "ios"
        themeManager.configTheme()
        // eslint-disable-next-line
    }, [])

    return (
        <ThemeContext.Provider value={{state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider