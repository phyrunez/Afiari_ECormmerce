import { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ children, elemId }) => {
    let domNode =  useRef()
    const [shouldRender, setRender] = useState(false)
    
    useEffect(() => {
        const element = document.querySelector(`#${elemId}`)
        if (element) {
            domNode.current = element
            setRender(true)
        }
    }, [])

    if (shouldRender) return ReactDOM.createPortal(children, domNode.current) 
    else return <div />
}

export default Portal