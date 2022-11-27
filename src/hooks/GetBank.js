import {useContext} from "react"
import {BankContext} from "../context/bank/BankReducer"
import {IndicatorContext} from "../context/indicator/IndicatorReducer"
import {BankIndicatorContext} from "../context/bankIndicator/BankIndicatorReducer"
import showNumber from "../helpers/showNumber"

function GetBank({_id})
{
    const {state: {results: bankIndicatorResults}} = useContext(BankIndicatorContext)
    const {state: {results: indicatorResults}} = useContext(IndicatorContext)
    const {state: {results: bankResults}} = useContext(BankContext)
    const data = bankResults[_id]
    const bankIndicator = bankIndicatorResults.filter(item => item.bank_id === data._id).reduce((sum, item) => [...sum, {...item, indicator: indicatorResults[item.indicator_id]}], [])

    let total_score_chart = []
    for (let j = 0; j < bankIndicator.length; j++)
    {
        for (let i = 0; i < bankIndicator[j].score_chart.length; i++)
        {
            total_score_chart[i] = {
                name: bankIndicator[j].score_chart[i].name,
                score: (total_score_chart[i]?.score ?? 0) + (bankIndicator[j].score_chart[i].score * bankIndicator[j].indicator.weight),
                weight: (total_score_chart[i]?.weight ?? 0) + bankIndicator[j].indicator.weight,
            }
        }
    }
    total_score_chart = total_score_chart.map(item => ({...item, score: showNumber(item.score / item.weight, 1)}))
    const total_score = total_score_chart[total_score_chart.length - 1]?.score ?? 0

    data.bankIndicator = bankIndicator
    data.total_score_chart = total_score_chart
    data.total_score = total_score

    return {data}
}

export default GetBank