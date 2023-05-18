import React, {forwardRef, memo, useRef} from "react"

const ImageLoading = forwardRef(({className, style, src, alt, loading, onClick, zoomable, draggable}, ref) =>
{
    const loadedRef = useRef(false)

    function onLoad()
    {
        loadedRef.current = true
        ref.current.className = `${className} image-loading-main load-end`
    }

    return (
        <img decoding={loading === "lazy" ? "async" : "sync"}
             fetchpriority={loading === "lazy" ? "auto" : "high"}
             draggable={draggable}
             className={`${className} image-loading-main ${loadedRef.current ? "load-end" : "image-loading"}`}
             onLoad={onLoad}
             style={style}
             ref={ref}
             src={src}
             alt={alt}
             loading={loading}
             onClick={onClick}
        />
    )
})

export default memo(ImageLoading)