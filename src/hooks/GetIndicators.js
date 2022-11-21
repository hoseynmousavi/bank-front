import {useContext, useEffect} from "react"
import IndicatorActions from "../context/indicator/IndicatorActions"
import {IndicatorContext} from "../context/indicator/IndicatorReducer"

function GetIndicators()
{
    const {state: {keys, results, getListDone}, dispatch} = useContext(IndicatorContext)
    const isLoading = !getListDone
    const data = keys?.length > 0 ? keys.reduce((sum, item) => [...sum, results[item]], []) : []

    useEffect(() =>
    {
        if (isLoading) IndicatorActions.getIndicators({dispatch})
        // eslint-disable-next-line
    }, [])

    return {isLoading, data}
}

export default GetIndicators