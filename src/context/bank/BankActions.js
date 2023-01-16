import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {ADD_BANK, GET_BANKS, UPDATE_BANK, REMOVE_BANK} from "./BankTypes"

function getBanks({dispatch})
{
    request.get({url: apiUrlsConstant.bank})
        .then(res =>
        {
            dispatch({
                type: GET_BANKS,
                payload: {res},
            })
        })
}

function remove({_id, dispatch, bankIndicatorDispatch})
{
    return request.del({url: apiUrlsConstant.bank, data: {_id}})
        .then(res =>
        {
            bankIndicatorDispatch({
                type: REMOVE_BANK,
                payload: {_id},
            })

            dispatch({
                type: REMOVE_BANK,
                payload: {_id},
            })

            return res.message
        })
}

function update({_id, data, dispatch})
{
    return request.patch({url: apiUrlsConstant.bank, data: {_id, data}})
        .then(res =>
        {
            dispatch({
                type: UPDATE_BANK,
                payload: {res},
            })
            return res.message
        })
}

function updateLogo({data, dispatch})
{
    return request.put({url: apiUrlsConstant.bank, data})
        .then(res =>
        {
            dispatch({
                type: UPDATE_BANK,
                payload: {res},
            })
            return res.message
        })
}

function add({data, dispatch})
{
    return request.post({url: apiUrlsConstant.bank, data})
        .then(res =>
        {
            dispatch({
                type: ADD_BANK,
                payload: {res},
            })
            return res
        })
}

const BankActions = {
    getBanks,
    update,
    updateLogo,
    add,
    remove,
}

export default BankActions