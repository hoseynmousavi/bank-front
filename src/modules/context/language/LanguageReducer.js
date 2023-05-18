import {createContext, useReducer} from "react"

export const LanguageContext = createContext(null)

function LanguageProvider({children})
{
    const initialState = {
        language: "fa",
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

    return (
        <LanguageContext.Provider value={{state, dispatch}}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider