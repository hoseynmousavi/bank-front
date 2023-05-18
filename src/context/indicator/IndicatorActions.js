import request from "../../modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {ADD_INDICATOR, GET_INDICATORS, REMOVE_INDICATOR, UPDATE_INDICATOR} from "./IndicatorTypes"

function getIndicators({dispatch})
{
    request.get({url: apiUrlsConstant.indicator})
        .then(res =>
        {
            dispatch({
                type: GET_INDICATORS,
                payload: {res},
            })
        })
}

function remove({_id, dispatch, bankIndicatorDispatch})
{
    return request.del({url: apiUrlsConstant.indicator, data: {_id}})
        .then(res =>
        {
            bankIndicatorDispatch({
                type: REMOVE_INDICATOR,
                payload: {_id},
            })

            dispatch({
                type: REMOVE_INDICATOR,
                payload: {_id},
            })

            return res.message
        })
}

function update({_id, data, dispatch})
{
    return request.patch({url: apiUrlsConstant.indicator, data: {_id, data}})
        .then(res =>
        {
            dispatch({
                type: UPDATE_INDICATOR,
                payload: {res},
            })
            return res.message
        })
}

function add({data, dispatch})
{
    return request.post({url: apiUrlsConstant.indicator, data})
        .then(res =>
        {
            dispatch({
                type: ADD_INDICATOR,
                payload: {res},
            })
            return res.message
        })
}

const IndicatorActions = {
    getIndicators,
    remove,
    update,
    add,
}

export default IndicatorActions