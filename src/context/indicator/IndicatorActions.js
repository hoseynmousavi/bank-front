import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_INDICATORS} from "./IndicatorTypes"

function getIndicators({dispatch})
{
    request.get({url: apiUrlsConstant.getIndicator})
        .then(res =>
        {
            dispatch({
                type: GET_INDICATORS,
                payload: {res},
            })
        })
}

const IndicatorActions = {
    getIndicators,
}

export default IndicatorActions