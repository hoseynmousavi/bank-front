import {useContext, useEffect} from "react"
import BankActions from "../context/bank/BankActions"
import {BankContext} from "../context/bank/BankReducer"
import {BankIndicatorContext} from "../context/bankIndicator/BankIndicatorReducer"
import {IndicatorContext} from "../context/indicator/IndicatorReducer"

function GetBanks()
{
    const {state: {results: bankIndicatorResults, getListDone: getInBa}} = useContext(BankIndicatorContext)
    const {state: {results: indicatorResults, getListDone: getIndicators}} = useContext(IndicatorContext)
    const {state: {keys, results, getListDone: getBanks}, dispatch} = useContext(BankContext)
    const isLoading = !getBanks || !getIndicators || !getInBa
    const data = !isLoading ? keys.reduce((sum, item) => [...sum, results[item]], []) : []

    if (!isLoading)
    {
        for (let k = 0; k < data.length; k++)
        {
            const bank = data[k]
            const bankIndicator = bankIndicatorResults.filter(item => item.bank_id === bank._id).reduce((sum, item) => [...sum, {...item, indicator: indicatorResults[item.indicator_id]}], [])

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
            total_score_chart = total_score_chart.map(item => ({...item, score: +(item.score / item.weight).toFixed(1)}))
            const total_score = total_score_chart[total_score_chart.length - 1]?.score ?? 0

            bank.bankIndicator = bankIndicator
            bank.total_score_chart = total_score_chart
            bank.total_score = total_score
        }
    }

    useEffect(() =>
    {
        if (isLoading) BankActions.getBanks({dispatch})
        // eslint-disable-next-line
    }, [])

    return {isLoading, data}
}

export default GetBanks