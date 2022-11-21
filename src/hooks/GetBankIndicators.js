import {useContext, useEffect} from "react"
import {BankIndicatorContext} from "../context/bankIndicator/BankIndicatorReducer"
import BankIndicatorActions from "../context/bankIndicator/BankIndicatorActions"

function GetBankIndicators()
{
    const {state: {keys, results, getListDone}, dispatch} = useContext(BankIndicatorContext)
    const isLoading = !getListDone
    const data = keys?.length > 0 ? keys.reduce((sum, item) => [...sum, results[item]], []) : []

    useEffect(() =>
    {
        if (isLoading) BankIndicatorActions.getBankIndicators({dispatch})
        // eslint-disable-next-line
    }, [])

    return {isLoading, data}
}

export default GetBankIndicators