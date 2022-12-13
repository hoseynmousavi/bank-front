import faTextConstant from "../../../constant/faTextConstant"
import Material from "../../../seyed-modules/components/Material"
import goBack from "../../../seyed-modules/helpers/goBack"
import CloseSvg from "../../../media/svg/CloseSvg"
import PanelAddModalInput from "../../components/panel/PanelAddModalInput"
import Button from "../../../seyed-modules/components/Button"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../../seyed-modules/constant/toastTypes"
import {useContext, useEffect, useState} from "react"
import popOnPopState from "../../../seyed-modules/helpers/popOnPopState"
import DeleteSvg from "../../../media/svg/DeleteSvg"
import BankIndicatorActions from "../../../context/bankIndicator/BankIndicatorActions"
import {BankIndicatorContext} from "../../../context/bankIndicator/BankIndicatorReducer"

function PanelAddUpdateBankIndicator({close, update, bank, indicator})
{
    const updateItem = update !== true ? update : null
    const {dispatch} = useContext(BankIndicatorContext)
    const {score_chart} = updateItem || {}
    const [values, setValues] = useState(updateItem ? {score_chart} : {score_chart: [{name: "", score: ""}]})
    const [isLoading, setIsLoading] = useState(false)
    const isDisable = values.score_chart.some(item=> (item.name && !item.score) || (!item.name && item.score))

    useEffect(() =>
    {
        popOnPopState({callback: close})
        // eslint-disable-next-line
    }, [])

    function addField()
    {
        setValues(values => ({score_chart: [...values.score_chart, {name: "", score: ""}]}))
    }

    function deleteField(index)
    {
        return function ()
        {
            const tempChart = [...values.score_chart]
            tempChart.splice(index, 1)
            setValues({score_chart: tempChart})
        }
    }

    function onInputChange(field, index)
    {
        return function (value)
        {
            const tempChart = [...values.score_chart]
            tempChart[index][field] = value
            setValues({score_chart: tempChart})
        }
    }

    function submit()
    {
        setIsLoading(true)
        if (updateItem)
        {
            const data = {
                score_chart: JSON.stringify(
                    values.score_chart.filter(item =>
                        item.name && item.score,
                    ),
                ),
            }
            BankIndicatorActions.update({_id: updateItem._id, data, dispatch})
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
            const data = {
                bank_id: bank._id,
                indicator_id: indicator._id,
                score_chart: JSON.stringify(
                    values.score_chart.filter(item =>
                        item.name && item.score,
                    ),
                ),
            }
            BankIndicatorActions.add({data, dispatch})
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
                    <Material className="panel-modal-content-add" onClick={addField}>{faTextConstant.addField}</Material>
                    {
                        values.score_chart.map((item, index) =>
                            <div key={index + " " + values.score_chart.length} className="panel-modal-content-cont">
                                <PanelAddModalInput isDisable={isLoading} text={faTextConstant.date} onChange={onInputChange("name", index)} defaultValue={item.name}/>
                                <PanelAddModalInput isDisable={isLoading} text={faTextConstant.score} onChange={onInputChange("score", index)} defaultValue={item.score} type="number"/>
                                <Material className="panel-modal-content-cont-remove" onClick={deleteField(index)}><DeleteSvg className="panel-modal-content-cont-remove-icon"/></Material>
                            </div>,
                        )
                    }
                    <Button className="panel-modal-btn" disable={isDisable} loading={isLoading} onClick={submit}>
                        {faTextConstant.submit}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default PanelAddUpdateBankIndicator