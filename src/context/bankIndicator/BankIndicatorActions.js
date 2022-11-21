import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_BANK_INDICATORS} from "./BankIndicatorTypes"

function getBankIndicators({dispatch})
{
    request.get({url: apiUrlsConstant.getBankIndicator})
        .then(res =>
        {
            dispatch({
                type: GET_BANK_INDICATORS,
                payload: {res},
            })
        })
}

const BankIndicatorActions = {
    getBankIndicators,
}

export default BankIndicatorActions