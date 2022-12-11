import faTextConstant from "../../../constant/faTextConstant"
import Material from "../../../seyed-modules/components/Material"
import goBack from "../../../seyed-modules/helpers/goBack"
import CloseSvg from "../../../media/svg/CloseSvg"
import PanelAddModalInput from "../../components/panel/PanelAddModalInput"
import Button from "../../../seyed-modules/components/Button"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../../seyed-modules/constant/toastTypes"
import IndicatorActions from "../../../context/indicator/IndicatorActions"
import {useContext, useEffect, useState} from "react"
import popOnPopState from "../../../seyed-modules/helpers/popOnPopState"
import {IndicatorContext} from "../../../context/indicator/IndicatorReducer"
import PanelAddModalCheckbox from "../../components/panel/PanelAddModalCheckbox"

function PanelAddIndicatorModal({close, update})
{
    const updateItem = update !== true ? update : null
    const {dispatch} = useContext(IndicatorContext)
    const {title, weight, description, full_description, is_audited} = updateItem || {}
    const [values, setValues] = useState(updateItem ? {title, weight, description, full_description, is_audited} : {is_audited: true})
    const [isLoading, setIsLoading] = useState(false)
    const isDisable = Object.values(values).length !== 5

    useEffect(() =>
    {
        popOnPopState({callback: close})
        // eslint-disable-next-line
    }, [])

    function onInputChange(field)
    {
        return function (value)
        {
            if (value || value === false)
            {
                setValues(values => ({...values, [field]: value}))
            }
            else
            {
                const tempValues = {...values}
                delete tempValues[field]
                setValues(tempValues)
            }
        }
    }

    function submit()
    {
        setIsLoading(true)
        if (updateItem)
        {
            IndicatorActions.update({_id: updateItem._id, data: values, dispatch})
                .then(message =>
                {
                    setTimeout(() => toastManager.addToast({message, type: SUCCESS_TOAST}), 100)
                    setIsLoading(false)
                    goBack()
                })
                .catch(() => setIsLoading(false))
        }
        else
        {
            const data = new FormData()
            Object.keys(values).forEach(item => data.append(item, values[item]))
            IndicatorActions.add({data, dispatch})
                .then(message =>
                {
                    setTimeout(() => toastManager.addToast({message, type: SUCCESS_TOAST}), 100)
                    setIsLoading(false)
                    goBack()
                })
                .catch(() => setIsLoading(false))
        }
    }

    return (
        <>
            <div className="panel-modal-back"/>
            <div className="panel-modal">
                <div className="panel-modal-title">
                    <div className="panel-modal-title-text">{faTextConstant.addIndicator}</div>
                    <Material className="panel-modal-title-icon-material" onClick={goBack}>
                        <CloseSvg className="panel-modal-title-icon"/>
                    </Material>
                </div>
                <div className="panel-modal-content">
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.indicatorName} onChange={onInputChange("title")} defaultValue={values.title}/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.description} onChange={onInputChange("description")} defaultValue={values.description}/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.weight} onChange={onInputChange("weight")} type="number" defaultValue={values.weight}/>
                    <PanelAddModalCheckbox isDisable={isLoading} text={faTextConstant.auditStat} onChange={onInputChange("is_audited")} defaultValue={values.is_audited}/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.fullDescription} onChange={onInputChange("full_description")} defaultValue={values.full_description} isFull isArea/>
                    <Button className="panel-modal-btn" disable={isDisable} loading={isLoading} onClick={submit}>
                        {faTextConstant.submit}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default PanelAddIndicatorModal