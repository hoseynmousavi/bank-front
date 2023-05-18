import {lazy} from "react"
import Route from "../../modules/components/Route"
import urlConstant from "../../constant/urlConstant"
import Switch from "../../modules/components/Switch"
import Header from "./Header"

const IndicatorPage = lazy(() => import("../pages/IndicatorPage"))
const IndicatorsPage = lazy(() => import("../pages/IndicatorsPage"))
const BankPage = lazy(() => import("../pages/BankPage"))
const BanksPage = lazy(() => import("../pages/BanksPage"))
const HomePage = lazy(() => import("../pages/HomePage"))
const RankingPage = lazy(() => import("../pages/RankingPage"))
const AboutPage = lazy(() => import("../pages/AboutPage"))

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
                <Route path={urlConstant.aboutUs} render={() => <AboutPage/>}/>
                <Route path={urlConstant.whatIsRanking} render={() => <RankingPage/>}/>
                <Route path={urlConstant.home} render={() => <HomePage/>}/>
            </Switch>
        </>
    )
}

export default Home