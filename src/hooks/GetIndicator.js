import {useContext} from "react"
import {IndicatorContext} from "../context/indicator/IndicatorReducer"
import {BankIndicatorContext} from "../context/bankIndicator/BankIndicatorReducer"
import {BankContext} from "../context/bank/BankReducer"

function GetIndicator({_id})
{
    const {state: {results: bankIndicatorResults}} = useContext(BankIndicatorContext)
    const {state: {results: indicatorResults}} = useContext(IndicatorContext)
    const {state: {results: bankResults}} = useContext(BankContext)
    const data = indicatorResults[_id]
    const banks = Object.values(bankResults)

    for (let i = 0; i < banks.length; i++)
    {
        const bank = banks[i]
        bank.indicator = bankIndicatorResults.filter(item => item.bank_id === bank._id && item.indicator_id === data._id)[0]
    }

    return {data, banks}
}

export default GetIndicator