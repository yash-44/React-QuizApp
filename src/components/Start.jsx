import { useRef } from "react"

export default function Start({setUsername}) {

    const inputRef = useRef()

    const handleClcik = ()=>{
        inputRef.current.value && setUsername(inputRef.current.value)
    }

    return (
        <div className="Start">
            <input type="text" className="startInput" placeholder="Enter your name" ref={inputRef} />
            <button className="startButton" onClick={handleClcik}>Start</button>
        </div>
    )
}
