import {useContext, useRef} from "react"
import BannerActions from "../context/banner/BannerActions"
import GetData from "../seyed-modules/request/GetData"
import {BannerContext} from "../context/banner/BannerReducer"

function GetBanners()
{
    const {state: {results, getListDone}, dispatch} = useContext(BannerContext)
    const isLoading = !getListDone
    const data = !isLoading ? results : []
    const cancelToken = useRef(null)

    GetData({request, isLoading, cancelToken})

    function request()
    {
        return BannerActions.getList({dispatch, cancel: cancelSource => cancelToken.current = cancelSource})
    }

    return {isLoading, data}
}

export default GetBanners