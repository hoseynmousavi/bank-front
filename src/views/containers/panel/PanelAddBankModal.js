import faTextConstant from "../../../constant/faTextConstant"
import CloseSvg from "../../../media/svg/CloseSvg"
import PanelAddModalInput from "../../components/panel/PanelAddModalInput"
import Material from "../../../modules/components/Material"
import ImageShow from "../../../modules/components/ImageShow"
import UploadSvg from "../../../media/svg/UploadSvg"
import {useContext, useEffect, useRef, useState} from "react"
import Button from "../../../modules/components/Button"
import popOnPopState from "../../../modules/helpers/popOnPopState"
import goBack from "../../../modules/helpers/router/goBack"
import BankActions from "../../../context/bank/BankActions"
import {BankContext} from "../../../context/bank/BankReducer"
import toastManager from "../../../modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../../modules/constant/toastTypes"

function PanelAddBankModal({close, selectBank})
{
    const {dispatch} = useContext(BankContext)
    const [values, setValues] = useState({})
    const [src, setSrc] = useState(null)
    const fileRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const isDisable = Object.values(values).length !== 8 || !src

    useEffect(() =>
    {
        popOnPopState({callback: close})
        // eslint-disable-next-line
    }, [])

    function onInputChange(field)
    {
        return function (value)
        {
            if (value)
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

    function onFileChange(e)
    {
        const file = e.target.files[0]
        e.target.value = ""
        fileRef.current = file
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => setSrc(reader.result)
    }

    function submit()
    {
        setIsLoading(true)
        const data = new FormData()
        data.append("logo", fileRef.current)
        Object.keys(values).forEach(item =>
            data.append(item, values[item]),
        )
        BankActions.add({data, dispatch})
            .then(res =>
            {
                selectBank({target: {value: res.data._id}})
                setTimeout(() => toastManager.addToast({message: res.message, type: SUCCESS_TOAST}), 100)
                setIsLoading(false)
                goBack()
            })
            .catch(() => setIsLoading(false))
    }

    return (
        <>
            <div className="panel-modal-back"/>
            <div className="panel-modal">
                <div className="panel-modal-title">
                    <div className="panel-modal-title-text">{faTextConstant.addBank}</div>
                    <Material className="panel-modal-title-icon-material" onClick={goBack}>
                        <CloseSvg className="panel-modal-title-icon"/>
                    </Material>
                </div>
                <div className="panel-modal-content">
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.bankName} onChange={onInputChange("name")}/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.established_year} onChange={onInputChange("established_year")} type="number"/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.type} onChange={onInputChange("type")}/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.employees_numbers} onChange={onInputChange("employees_numbers")} type="number"/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.deposit_amount} onChange={onInputChange("deposit_amount")} type="number"/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.basic_capital} onChange={onInputChange("basic_capital")} type="number"/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.branches_number} onChange={onInputChange("branches_number")} type="number"/>
                    <PanelAddModalInput isDisable={isLoading} text={faTextConstant.major_shareholders} onChange={onInputChange("major_shareholders")}/>
                    <div className="panel-modal-content-item full">
                        <div className="panel-modal-content-item-title">{faTextConstant.chooseBankLogo}</div>
                        <label className="panel-modal-content-item-file">
                            <Material isDiv className="panel-banner-item-material">
                                {src && <ImageShow className="panel-banner-item-material-img contain" src={src}/>}
                                <div className="panel-banner-item-edit">
                                    <div>
                                        <UploadSvg className="panel-banner-item-edit-icon"/>
                                        <div>{faTextConstant.chooseFile}</div>
                                    </div>
                                </div>
                                <input disabled={isLoading} hidden type="file" onChange={onFileChange}/>
                            </Material>
                        </label>
                    </div>
                    <Button className="panel-modal-btn" disable={isDisable} loading={isLoading} onClick={submit}>
                        {faTextConstant.submit}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default PanelAddBankModal