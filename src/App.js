import ToastContainer from "./seyed-modules/components/ToastContainer"
import ThemeColorBar from "./seyed-modules/components/ThemeColorBar"
import BanksPage from "./views/pages/BanksPage"
import Header from "./views/containers/Header"
import Switch from "./seyed-modules/components/Switch"
import Route from "./seyed-modules/components/Route"
import BankPage from "./views/pages/BankPage"
import urlConstant from "./constant/urlConstant"
import IndicatorsPage from "./views/pages/IndicatorsPage"
import IndicatorPage from "./views/pages/IndicatorPage"
import GetIndicators from "./hooks/GetIndicators"
import GetBanks from "./hooks/GetBanks"
import GetBankIndicators from "./hooks/GetBankIndicators"
import LoadingWrapper from "./seyed-modules/components/LoadingWrapper"

function App()
{
    const {isLoading: bankIndicatorLoading} = GetBankIndicators()
    const {isLoading: indicatorLoading} = GetIndicators()
    const {isLoading: bankLoading} = GetBanks()
    const isLoading = bankIndicatorLoading || indicatorLoading || bankLoading
    return (
        <>
            <ThemeColorBar/>
            {
                isLoading ?
                    <LoadingWrapper haveBg/>
                    :
                    <>
                        <Header/>
                        <Switch>
                            <Route path={urlConstant.indicator(":id")} render={route => <IndicatorPage route={route}/>}/>
                            <Route path={urlConstant.indicators} render={() => <IndicatorsPage/>}/>
                            <Route path={urlConstant.bank(":id")} render={route => <BankPage route={route}/>}/>
                            <Route path={urlConstant.banks} render={() => <BanksPage/>}/>
                            <Route path="*" render={() => <div style={{width: "100%", height: "var(--full-height)", display: "flex", justifyContent: "center", alignItems: "center"}}>NOT FOUND</div>}/>
                        </Switch>
                    </>
            }
            <ToastContainer/>
        </>
    )
}

export default App