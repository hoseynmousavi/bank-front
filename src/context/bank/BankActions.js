import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_BANK, GET_BANKS} from "./BankTypes"

function getBanks({dispatch})
{
    request.get({url: apiUrlsConstant.getBank})
        .then(res =>
        {
            dispatch({
                type: GET_BANKS,
                payload: {res},
            })
        })
}

function getBank({_id, dispatch})
{
    request.get({url: apiUrlsConstant.getBank, param: `?_id=${_id}`})
        .then(res =>
        {
            dispatch({
                type: GET_BANK,
                payload: {res},
            })
        })
}

const BankActions = {
    getBanks,
    getBank,
}

export default BankActions