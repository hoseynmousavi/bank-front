import faTextConstant from "../../../constant/faTextConstant"
import {useContext, useState} from "react"
import CheckSvg from "../../../seyed-modules/media/svg/CheckSvg"
import Material from "../../../seyed-modules/components/Material"
import MyLoader from "../../../seyed-modules/components/MyLoader"
import BankActions from "../../../context/bank/BankActions"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../../seyed-modules/constant/toastTypes"
import {BankContext} from "../../../context/bank/BankReducer"

function PanelBankRow({field, bank, ltr, disable})
{
    const {dispatch} = useContext(BankContext)
    const defaultValue = bank[field]
    const [value, setValue] = useState(defaultValue)
    const haveChanged = defaultValue?.toString?.() !== value?.toString?.()
    const [isLoading, setIsLoading] = useState(false)

    function onChange({target: {value}})
    {
        setValue(value)
    }

    function updateBank()
    {
        setIsLoading(true)
        BankActions.update({_id: bank._id, data: {[field]: value}, dispatch})
            .then(message =>
            {
                setIsLoading(false)
                toastManager.addToast({message, type: SUCCESS_TOAST})
            })
            .catch(() => setIsLoading(false))
    }

    return (
        <div className="panel-bank-info-row">
            <div className="panel-bank-info-row-title">{faTextConstant[field]}</div>
            <input maxLength={20}
                   className={`panel-bank-info-row-desc ${ltr ? "ltr" : ""}`}
                   value={value.toString()}
                   onChange={onChange}
                   disabled={isLoading || disable}
            />
            <Material className={`panel-bank-info-row-check-material ${!haveChanged && "hide"}`} onClick={updateBank}>
                {
                    isLoading ?
                        <MyLoader width={20}/>
                        :
                        <CheckSvg className="panel-bank-info-row-check"/>
                }
            </Material>
        </div>
    )
}

export default PanelBankRow