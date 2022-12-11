import {useContext, useEffect} from "react"
import {BankIndicatorContext} from "../context/bankIndicator/BankIndicatorReducer"
import BankIndicatorActions from "../context/bankIndicator/BankIndicatorActions"

function GetBankIndicators()
{
    const {state: {results, getListDone}, dispatch} = useContext(BankIndicatorContext)
    const isLoading = !getListDone
    const data = !isLoading ? results : []

    useEffect(() =>
    {
        if (isLoading) BankIndicatorActions.getBankIndicators({dispatch})
        // eslint-disable-next-line
    }, [])

    return {isLoading, data}
}

export default GetBankIndicators