import numberCorrection from "../../../seyed-modules/helpers/numberCorrection"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {INFO_TOAST} from "../../../seyed-modules/constant/toastTypes"
import faTextConstant from "../../../constant/faTextConstant"

function PanelAddModalInput({isFull, isArea, isDisable, text, onChange, type = "text", defaultValue, ltr, maxNumber})
{
    function onChangeFunc(e)
    {
        const {value} = e.target
        const tempValue = numberCorrection(value)
        if (!maxNumber || +tempValue <= maxNumber) onChange(tempValue)
        else
        {
            onChange("")
            e.target.value = ""
            toastManager.addToast({message: faTextConstant.maxIs10, type: INFO_TOAST})
        }
    }

    return (
        <div className={`panel-modal-content-item ${isFull ? "full" : ""}`}>
            <div className="panel-modal-content-item-title">{text}</div>
            {
                isArea ?
                    <textarea className="panel-modal-content-item-input" rows={5} disabled={isDisable} onChange={onChangeFunc} defaultValue={defaultValue}/>
                    :
                    <input className={`panel-modal-content-item-input ${ltr ? "ltr" : ""}`} type={type} disabled={isDisable} onChange={onChangeFunc} defaultValue={defaultValue}/>
            }
        </div>
    )
}

export default PanelAddModalInput