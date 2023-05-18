function errorConstant(error)
{
    return (
        error?.response?.data?.error?.toString?.()
        ||
        error?.response?.data?.status?.toString?.()
        ||
        error?.response?.data?.detail?.toString?.()
        ||
        error?.response?.data?.message?.toString?.()
        ||
        {
            "Network Error": "خطایی رخ داد، اتصال اینترنت خود را بررسی کنید.",
        }
            [error?.message]
        ||
        (
            "خطایی رخ داد؛ مجدداً تلاش کنید."
        )
    )
}

export default errorConstant