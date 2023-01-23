function HamburgerSvg({className})
{
    return (
        <svg className={className} viewBox="0 0 14 14" fill="none">
            <path d="M12.5 1H1" stroke="#0B6B74" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12.5 7H1" stroke="#0B6B74" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12.5 13H1" stroke="#0B6B74" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}

export default HamburgerSvg