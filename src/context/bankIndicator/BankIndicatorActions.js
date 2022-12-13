import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {ADD_BANK_INDICATORS, GET_BANK_INDICATORS, UPDATE_BANK_INDICATORS} from "./BankIndicatorTypes"

function getBankIndicators({dispatch})
{
    request.get({url: apiUrlsConstant.bankIndicator})
        .then(res =>
        {
            dispatch({
                type: GET_BANK_INDICATORS,
                payload: {res},
            })
        })
}

function add({data, dispatch})
{
    return request.post({url: apiUrlsConstant.bankIndicator, data})
        .then(res =>
        {
            dispatch({
                type: ADD_BANK_INDICATORS,
                payload: {res},
            })
            return res.message
        })
}

function update({_id, data, dispatch})
{
    return request.patch({url: apiUrlsConstant.bankIndicator, data: {_id, data}})
        .then(res =>
        {
            dispatch({
                type: UPDATE_BANK_INDICATORS,
                payload: {res},
            })
            return res.message
        })
}

const BankIndicatorActions = {
    getBankIndicators,
    add,
    update,
}

export default BankIndicatorActions