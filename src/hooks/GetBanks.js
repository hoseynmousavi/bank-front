import {useContext, useEffect} from "react"
import BankActions from "../context/bank/BankActions"
import {BankContext} from "../context/bank/BankReducer"

function GetBanks()
{
    const {state: {keys, results, getListDone}, dispatch} = useContext(BankContext)
    const isLoading = !getListDone
    const data = keys?.length > 0 ? keys.reduce((sum, item) => [...sum, results[item]], []) : []

    useEffect(() =>
    {
        if (isLoading) BankActions.getBanks({dispatch})
        // eslint-disable-next-line
    }, [])

    return {isLoading, data}
}

export default GetBanks