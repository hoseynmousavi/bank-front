import {useContext, useEffect} from "react"
import BankActions from "../context/bank/BankActions"
import {BankContext} from "../context/bank/BankReducer"

function GetBank({_id})
{
    const {state: {results}, dispatch} = useContext(BankContext)
    const data = results[_id]
    const isLoading = !data

    useEffect(() =>
    {
        if (isLoading) BankActions.getBank({_id, dispatch})
        // eslint-disable-next-line
    }, [])

    return {isLoading, data}
}

export default GetBank