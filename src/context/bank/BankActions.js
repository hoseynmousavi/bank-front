import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_BANK} from "./BankTypes"

function getBank({dispatch})
{
    request.get({url: apiUrlsConstant.getBank})
        .then(res =>
        {
            dispatch({
                type: GET_BANK,
                payload: {res},
            })
        })
}

const BankActions = {
    getBank,
}

export default BankActions