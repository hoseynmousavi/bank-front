import {lazy} from "react"
import Route from "../../seyed-modules/components/Route"
import urlConstant from "../../constant/urlConstant"
import Switch from "../../seyed-modules/components/Switch"
import Header from "./Header"

const IndicatorPage = lazy(() => import("../pages/IndicatorPage"))
const IndicatorsPage = lazy(() => import("../pages/IndicatorsPage"))
const BankPage = lazy(() => import("../pages/BankPage"))
const BanksPage = lazy(() => import("../pages/BanksPage"))
const RankingPage = lazy(() => import("../pages/RankingPage"))

function Home()
{
    return (
        <>
            <Header/>
            <Switch>
                <Route path={urlConstant.indicator(":id")} render={route => <IndicatorPage route={route}/>}/>
                <Route path={urlConstant.indicators} render={() => <IndicatorsPage/>}/>
                <Route path={urlConstant.bank(":id")} render={route => <BankPage route={route}/>}/>
                <Route path={urlConstant.banks} render={() => <BanksPage/>}/>
                <Route path={urlConstant.whatIsRanking} render={() => <RankingPage/>}/>
                <Route path="*" render={() => <div style={{width: "100%", height: "var(--full-height)", display: "flex", justifyContent: "center", alignItems: "center"}}>NOT FOUND</div>}/>
            </Switch>
        </>
    )
}

export default Home