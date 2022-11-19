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

function App()
{
    return (
        <>
            <ThemeColorBar/>

            <Header/>
            <Switch>
                <Route path={urlConstant.indicator(":id")} render={() => <IndicatorPage/>}/>
                <Route path={urlConstant.indicators} render={() => <IndicatorsPage/>}/>
                <Route path={urlConstant.bank(":id")} render={route => <BankPage route={route}/>}/>
                <Route path={urlConstant.banks} render={() => <BanksPage/>}/>
                <Route path="*" render={() => <div style={{width: "100%", height: "var(--full-height)", display: "flex", justifyContent: "center", alignItems: "center"}}>NOT FOUND</div>}/>
            </Switch>

            <ToastContainer/>
        </>
    )
}

export default App