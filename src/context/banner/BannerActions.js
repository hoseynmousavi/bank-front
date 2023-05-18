import request from "../../modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_BANNERS, UPDATE_BANNER} from "./BannerTypes"

function getList({dispatch, cancel})
{
    return request.get({url: apiUrlsConstant.banner, cancel})
        .then(res =>
        {
            dispatch({
                type: GET_BANNERS,
                payload: {res},
            })
        })
}

function update({dispatch, data})
{
    return request.post({url: apiUrlsConstant.banner, data})
        .then(res =>
        {
            dispatch({
                type: UPDATE_BANNER,
                payload: {res},
            })
        })
}

const BannerActions = {
    getList,
    update,
}

export default BannerActions