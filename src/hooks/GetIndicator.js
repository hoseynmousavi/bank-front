import {useContext} from "react"
import {IndicatorContext} from "../context/indicator/IndicatorReducer"

function GetIndicator({_id})
{
    const {state: {results}} = useContext(IndicatorContext)
    const data = results[_id]
    return {data}
}

export default GetIndicator