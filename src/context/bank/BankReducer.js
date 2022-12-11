import {createContext, useReducer} from "react"
import {ADD_BANK, GET_BANKS, REMOVE_BANK, UPDATE_BANK} from "./BankTypes"

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
            case UPDATE_BANK:
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
            case ADD_BANK:
            {
                const {res: {data}} = action.payload
                return {
                    ...state,
                    keys: [...new Set([...state.keys, data._id])],
                    results: {
                        ...state.results,
                        [data._id]: data,
                    },
                }
            }
            case REMOVE_BANK:
            {
                const {_id} = action.payload
                const keys = [...state.keys]
                keys.splice(keys.indexOf(_id), 1)
                return {
                    ...state,
                    keys,
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