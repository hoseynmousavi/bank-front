import {useContext, useEffect} from "react"
import BankActions from "../context/bank/BankActions"
import {BankContext} from "../context/bank/BankReducer"

function GetBank()
{
    const {state: {results}, dispatch} = useContext(BankContext)
    const isLoading = !results.getDone
    const data = results

    useEffect(() =>
    {
        if (isLoading) BankActions.getBank({dispatch})
        // eslint-disable-next-line
    }, [])

    return {isLoading, data}
}

export default GetBank