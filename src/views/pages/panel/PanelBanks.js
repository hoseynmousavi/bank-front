import PanelSide from "../../containers/panel/PanelSide"
import Material from "../../../seyed-modules/components/Material"
import faTextConstant from "../../../constant/faTextConstant"
import PlusSvg from "../../../seyed-modules/media/svg/PlusSvg"
import GetBanks from "../../../hooks/GetBanks"
import {useContext, useState} from "react"
import PanelBankRow from "../../components/panel/PanelBankRow"
import PanelBankChart from "../../components/panel/PanelBankChart"
import PanelAddBankModal from "../../containers/panel/PanelAddBankModal"
import bankActions from "../../../context/bank/BankActions"
import BankActions from "../../../context/bank/BankActions"
import {BankContext} from "../../../context/bank/BankReducer"
import {BankIndicatorContext} from "../../../context/bankIndicator/BankIndicatorReducer"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../../seyed-modules/constant/toastTypes"
import PanelBankIndicatorBox from "../../components/panel/PanelBankIndicatorBox"
import GarbageSvg from "../../../media/svg/GarbageSvg"
import ImageShow from "../../../seyed-modules/components/ImageShow"
import getImage from "../../../helpers/getImage"
import EditSvg from "../../../media/svg/EditSvg"

function PanelBanks()
{
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useContext(BankContext)
    const {dispatch: bankIndicatorDispatch} = useContext(BankIndicatorContext)
    const [isAdding, setIsAdding] = useState(false)
    const [bankId, setBankId] = useState("0")
    const {data} = GetBanks()
    const bank = data.filter(item => item._id === bankId)?.[0]

    function onChangeBank(e)
    {
        const {value} = e.target
        setBankId(value)
    }

    function toggleAddModal()
    {
        setIsAdding(isAdding => !isAdding)
    }

    function deleteMe()
    {
        if (window.confirm(faTextConstant.rUSure))
        {
            setBankId("0")
            bankActions.remove({_id: bankId, dispatch, bankIndicatorDispatch})
                .then(message =>
                {
                    toastManager.addToast({message, type: SUCCESS_TOAST})
                })
        }
    }

    function onChange(e)
    {
        setIsLoading(true)
        const file = e.target.files[0]
        e.target.value = ""
        const data = new FormData()
        data.append("_id", bank._id)
        data.append("file", file)
        BankActions.updateLogo({dispatch, data})
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    }

    return (
        <>
            <PanelSide/>
            <div className="panel-dashboard">
                <div className="panel-banners">
                    <div className="panel-indicator-header">
                        <select className="panel-banks-select-bank" onChange={onChangeBank} value={bankId}>
                            <option value="0">{faTextConstant.chooseBank}</option>
                            {
                                data.map(item =>
                                    <option value={item._id} key={item._id}>{item.name}</option>,
                                )
                            }
                        </select>
                        <div className="panel-banks-select-add-cont">
                            <Material className="panel-banks-select-add" onClick={toggleAddModal}>
                                {faTextConstant.addBank}
                                <PlusSvg className="panel-banks-select-add-icon"/>
                            </Material>
                            {
                                bankId !== "0" &&
                                <Material className="panel-banks-select-add" onClick={deleteMe}>
                                    <GarbageSvg className="panel-banks-select-add-icon no-margin"/>
                                </Material>
                            }
                        </div>
                    </div>

                    {
                        bankId !== "0" &&
                        <>
                            <div key={bank._id} className="panel-bank">
                                <div className="panel-bank-info">
                                    <div className="panel-bank-info-title">{faTextConstant.bankInfo}</div>
                                    <PanelBankRow field="name" bank={bank}/>
                                    <PanelBankRow field="type" bank={bank}/>
                                    <PanelBankRow field="total_score" bank={bank} ltr disable/>
                                    <PanelBankRow field="established_year" bank={bank}/>
                                    <PanelBankRow field="deposit_amount" bank={bank}/>
                                    <PanelBankRow field="employees_numbers" bank={bank}/>
                                    <PanelBankRow field="branches_number" bank={bank}/>
                                    <PanelBankRow field="basic_capital" bank={bank}/>
                                    <PanelBankRow field="major_shareholders" bank={bank}/>
                                </div>
                                <div className="panel-bank-info-second">
                                    <div className="panel-bank-info-second-box">
                                        <div className="panel-bank-info-title">{faTextConstant.bankChartTitle}</div>
                                        <PanelBankChart bank={bank}/>
                                    </div>

                                    <label className="panel-bank-info-second-box second">
                                        <div className="panel-bank-info-title edit">
                                            {faTextConstant.bankLogo}
                                            <EditSvg className="panel-bank-info-title-edit"/>
                                        </div>
                                        <ImageShow className="panel-bank-info-src" src={getImage(bank.logo)}/>
                                        {!isLoading && <input hidden type="file" onChange={onChange}/>}
                                    </label>
                                </div>
                            </div>
                            <PanelBankIndicatorBox bank={bank}/>
                        </>
                    }

                </div>
            </div>

            {isAdding && <PanelAddBankModal close={toggleAddModal} selectBank={onChangeBank}/>}
        </>
    )
}

export default PanelBanks