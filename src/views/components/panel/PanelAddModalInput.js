import numberCorrection from "../../../seyed-modules/helpers/numberCorrection"

function PanelAddModalInput({isFull, isArea, isDisable, text, onChange, type = "text", defaultValue, ltr})
{
    function onChangeFunc({target: {value}})
    {
        const tempValue = numberCorrection(value)
        onChange(tempValue)
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