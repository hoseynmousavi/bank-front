import {createContext, useReducer} from "react"
import {GET_BANK_INDICATORS} from "./BankIndicatorTypes"

export const BankIndicatorContext = createContext(null)

function BankIndicatorProvider({children})
{
    const initialState = {
        results: [],
        getListDone: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(state, action)
    {
        switch (action.type)
        {
            case GET_BANK_INDICATORS:
            {
                const {res: {data}} = action.payload
                return {
                    ...state,
                    results: data,
                    getListDone: true,
                }
            }
            default:
                return state
        }
    }

    return (
        <BankIndicatorContext.Provider value={{state, dispatch}}>
            {children}
        </BankIndicatorContext.Provider>
    )
}

export default BankIndicatorProvider