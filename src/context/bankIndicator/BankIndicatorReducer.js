import {createContext, useReducer} from "react"
import {GET_BANK_INDICATORS} from "./BankIndicatorTypes"
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