import {lazy} from "react"
import ToastContainer from "./modules/components/ToastContainer"
import ThemeColorBar from "./modules/components/ThemeColorBar"
import Switch from "./modules/components/Switch"
import Route from "./modules/components/Route"
import urlConstant from "./constant/urlConstant"
import GetIndicators from "./hooks/GetIndicators"
import GetBanks from "./hooks/GetBanks"
import GetBankIndicators from "./hooks/GetBankIndicators"
import LoadingWrapper from "./modules/components/LoadingWrapper"

const Home = lazy(() => import("./views/containers/Home"))
const Panel = lazy(() => import("./views/containers/panel/Panel"))

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
                    <Switch>
                        <Route path={urlConstant.panel} render={() => <Panel/>} isContainer/>
                        <Route path="*" render={() => <Home/>} isContainer/>
                    </Switch>
            }
            <ToastContainer/>
        </>
    )
}

export default App