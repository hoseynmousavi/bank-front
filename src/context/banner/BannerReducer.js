import {createContext, useReducer} from "react"
import {GET_BANNERS, UPDATE_BANNER} from "./BannerTypes"

export const BannerContext = createContext(null)

function BannerProvider({children})
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
            case GET_BANNERS:
            {
                const {res: {data}} = action.payload
                return {
                    ...state,
                    results: data.sort((a, b) => a.index - b.index),
                    getListDone: true,
                }
            }
            case UPDATE_BANNER:
            {
                const {res: {data: {index, src}}} = action.payload
                const newResults = [...state.results.filter(item => item.index !== index), {index, src}].sort((a, b) => a.index - b.index)
                return {
                    ...state,
                    results: newResults,
                }
            }
            default:
                return state
        }
    }

    return (
        <BannerContext.Provider value={{state, dispatch}}>
            {children}
        </BannerContext.Provider>
    )
}

export default BannerProvider