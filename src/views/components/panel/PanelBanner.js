import Material from "../../../modules/components/Material"
import ImageShow from "../../../modules/components/ImageShow"
import BannerActions from "../../../context/banner/BannerActions"
import {useContext, useState} from "react"
import {BannerContext} from "../../../context/banner/BannerReducer"
import MyLoader from "../../../modules/components/MyLoader"
import UploadSvg from "../../../media/svg/UploadSvg"
import faTextConstant from "../../../constant/faTextConstant"

function PanelBanner({index, src})
{
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useContext(BannerContext)

    function onChange(e)
    {
        setIsLoading(true)
        const file = e.target.files[0]
        e.target.value = ""
        const data = new FormData()
        data.append("index", index)
        data.append("file", file)
        BannerActions.update({dispatch, data})
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    }

    return (
        <label className="panel-banner-item">
            <Material isDiv className="panel-banner-item-material">
                {src && <ImageShow className="panel-banner-item-material-img" src={src}/>}
                <div className="panel-banner-item-index">بنر {index}</div>
                <div className="panel-banner-item-edit">
                    {
                        isLoading ?
                            <MyLoader width={16}/>
                            :
                            <div>
                                <UploadSvg className="panel-banner-item-edit-icon"/>
                                <div>{faTextConstant.chooseFile}</div>
                            </div>
                    }
                </div>
                {!isLoading && <input hidden type="file" onChange={onChange}/>}
            </Material>
        </label>
    )
}

export default PanelBanner