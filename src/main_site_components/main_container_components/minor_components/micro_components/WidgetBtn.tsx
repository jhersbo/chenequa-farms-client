import "./Sass/WidgetBtn.scss"

interface WidgetBtnProps{
    disabledBool?: boolean
    action: () => void
    children: JSX.Element | string
}

const WidgetBtn = (props: WidgetBtnProps)=>{

    let{
        disabledBool,
        action,
        children     
    } = props

    return(
        <button
            className="widget-btn"
            onClick={()=>{action()}}
            disabled={disabledBool}
        >
            {children}
        </button>
    )
}

export default WidgetBtn