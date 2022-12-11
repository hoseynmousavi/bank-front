import {createContext, useReducer} from "react"
import {ADD_INDICATOR, GET_INDICATORS, REMOVE_INDICATOR, UPDATE_INDICATOR} from "./IndicatorTypes"

export const IndicatorContext = createContext(null)

function IndicatorProvider({children})
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
            case GET_INDICATORS:
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
            case REMOVE_INDICATOR:
            {
                const {_id} = action.payload
                const keys = [...state.keys]
                keys.splice(keys.indexOf(_id), 1)
                return {
                    ...state,
                    keys,
                }
            }
            case UPDATE_INDICATOR:
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
            case ADD_INDICATOR:
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
            default:
                return state
        }
    }

    return (
        <IndicatorContext.Provider value={{state, dispatch}}>
            {children}
        </IndicatorContext.Provider>
    )
}

export default IndicatorProvider