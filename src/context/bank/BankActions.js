import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_BANKS} from "./BankTypes"

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

const BankActions = {
    getBanks,
}

export default BankActions