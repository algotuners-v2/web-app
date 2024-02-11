import Chart from "../../components/chart";
import {useEffect, useState} from "react";
import {historicalData} from "./api";
import SymbolSuggestion from "../../components/popup/symbol_suggestion";

const ChartScreen = () => {
    const [instrumentData, setInstrumentData] = useState(null)
    const [symbol, setSymbol] = useState("")
    const [instrumentToken, setInstrumentToken] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    const _handleKeyDown = async (event) => {
        const keyPressed = event.key
        if (keyPressed === 'ArrowUp' || keyPressed === 'ArrowDown' ||
            keyPressed === 'ArrowLeft' || keyPressed === 'ArrowRight' || keyPressed === 'Tab'
            || keyPressed === 'Control' || keyPressed === 'Alt' || keyPressed === 'Meta'
            || keyPressed === 'CapsLock' || keyPressed === 'AltGraph' || keyPressed === 'ContextMenu'
            || keyPressed === 'NumLock' || keyPressed === 'ScrollLock' || keyPressed === 'Pause'
            || keyPressed === 'Insert' || keyPressed === 'Home' || keyPressed === 'PageUp'
            || keyPressed === 'Delete' || keyPressed === 'End' || keyPressed === 'PageDown'
            || keyPressed === 'Shift') {
            event.preventDefault()
            return
        }
        if (keyPressed === 'Backspace') {
            setSymbol((prevState) => prevState.slice(0, -1))
        } else if (keyPressed === 'Escape') {
            setShowSuggestions(false)
            setSymbol("")
        } else if (keyPressed === 'Enter') {
            setShowSuggestions(false)
            setInstrumentData(symbol)
        } else {
            setShowSuggestions(true)
            setSymbol((prevState) => prevState + keyPressed)
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', _handleKeyDown);
    }, []);

    useEffect(() => {
        if (instrumentToken === "") return
        loadInstrumentData()
    }, [instrumentToken]);

    const loadInstrumentData = async () => {
        const response = await historicalData(instrumentToken, 'one_minute', 5)
        const data = response.data
        console.log("data loaded", instrumentToken, data)
        setInstrumentData(data)
        setInstrumentToken("")
        setSymbol("")
        setShowSuggestions(false)
    }

    return (
        <div style={{display: 'flex', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {showSuggestions && <div style={{
                display: 'flex',
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '100%',
                zIndex: 100,
                backdropFilter: 'blur(2px)',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <SymbolSuggestion setInstrumentToken={setInstrumentToken} symbol={symbol}/>
            </div>}
            <div style={{width: '100%', height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <h3>Menu</h3>
            </div>
            <Chart data={instrumentData}/>
        </div>
    )
}

export default ChartScreen