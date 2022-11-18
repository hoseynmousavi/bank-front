import {createContext, useReducer} from "react"
import {GET_BANK} from "./BankTypes"

export const BankContext = createContext(null)

function BankProvider({children})
{
    const initialState = {
        results: {},
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(state, action)
    {
        switch (action.type)
        {
            case GET_BANK:
            {
                const {res} = action.payload
                return {
                    ...state,
                    results: {
                        ...res,
                        getDone: true,
                    },
                }
            }
            default:
                return state
        }
    }

    return (
        <BankContext.Provider value={{state, dispatch}}>
            {children}
        </BankContext.Provider>
    )
}

export default BankProvider