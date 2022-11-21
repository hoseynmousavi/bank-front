import {createContext, useReducer} from "react"
import {GET_INDICATORS} from "./IndicatorTypes"

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