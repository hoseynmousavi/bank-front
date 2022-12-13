import {createContext, useReducer} from "react"
import {ADD_BANK_INDICATORS, GET_BANK_INDICATORS, UPDATE_BANK_INDICATORS} from "./BankIndicatorTypes"
import {REMOVE_INDICATOR} from "../indicator/IndicatorTypes"
import {REMOVE_BANK} from "../bank/BankTypes"

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
            case ADD_BANK_INDICATORS:
            {
                const {res: {data}} = action.payload
                return {
                    ...state,
                    results: [
                        ...state.results,
                        data,
                    ],
                }
            }
            case UPDATE_BANK_INDICATORS:
            {
                const {res: {data}} = action.payload
                const results = [...state.results]
                const index = results.findIndex(item => item._id === data._id)
                results[index] = data
                return {
                    ...state,
                    results,
                }
            }
            case REMOVE_INDICATOR:
            {
                const {_id} = action.payload
                const resultsTemp = [...state.results]
                resultsTemp.filter(item => item.indicator_id !== _id)
                return {
                    ...state,
                    results: resultsTemp,
                }
            }
            case REMOVE_BANK:
            {
                const {_id} = action.payload
                const resultsTemp = [...state.results]
                resultsTemp.filter(item => item.bank_id !== _id)
                return {
                    ...state,
                    results: resultsTemp,
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