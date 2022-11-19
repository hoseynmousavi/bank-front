import {createContext, useReducer} from "react"
import {GET_BANK, GET_BANKS} from "./BankTypes"

export const BankContext = createContext(null)

function BankProvider({children})
{
    const initialState = {
        keys: [],
        results: {},
        getListDone: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(state, action)
    {
        switch (action.type)
        {
            case GET_BANKS:
            {
                const {res: {data}} = action.payload
                return {
                    ...state,
                    keys: [...new Set([...state.keys, ...data.map(item => item._id)])],
                    results: {
                        ...state.results,
                        ...data.reduce((sum, item) => ({...sum, [item._id]: item}), {}),
                    },
                    getListDone: true,
                }
            }
            case GET_BANK:
            {
                const {res: {data}} = action.payload
                return {
                    ...state,
                    results: {
                        ...state.results,
                        [data._id]: data,
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