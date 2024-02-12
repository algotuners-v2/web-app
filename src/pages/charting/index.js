import Chart from "../../components/chart";
import {useEffect, useState} from "react";
import SymbolSuggestion from "../../components/popup/symbol_suggestion";
import {historicalData} from "./api";

const ChartScreen = () => {
    const [instrumentData, setInstrumentData] = useState(null)
    const [candlesData, setCandlesData] = useState(null)
    const [searchSymbol, setSearchSymbol] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [keyPressedAt, setKeyPressedAt] = useState(["", 0])

    const _handleKeyDown = async (event) => {
        const keyPressed = event.key
        setKeyPressedAt([keyPressed, Date.now()])
    }

    useEffect(() => {
        document.body.addEventListener('keydown', _handleKeyDown);
    }, []);

    useEffect(() => {
        const keyPressed = keyPressedAt[0]
        if (keyPressed === "Escape") {
            setSearchSymbol("")
            setShowSuggestions(false)
        }
        if (keyPressed === "Enter") {
            if (instrumentData == null) return
            loadInstrumentData()
        }
        if (searchSymbol.length > 0) return
        if (keyPressed === "a" || keyPressed === "A" || keyPressed === "b" || keyPressed === "B"
            || keyPressed === "c" || keyPressed === "C" || keyPressed === "d" || keyPressed === "D"
            || keyPressed === "e" || keyPressed === "E" || keyPressed === "f" || keyPressed === "F"
            || keyPressed === "g" || keyPressed === "G" || keyPressed === "h" || keyPressed === "H"
            || keyPressed === "i" || keyPressed === "I" || keyPressed === "j" || keyPressed === "J"
            || keyPressed === "k" || keyPressed === "K" || keyPressed === "l" || keyPressed === "L"
            || keyPressed === "m" || keyPressed === "M" || keyPressed === "n" || keyPressed === "N"
            || keyPressed === "o" || keyPressed === "O" || keyPressed === "p" || keyPressed === "P"
            || keyPressed === "q" || keyPressed === "Q" || keyPressed === "r" || keyPressed === "R"
            || keyPressed === "s" || keyPressed === "S" || keyPressed === "t" || keyPressed === "T"
            || keyPressed === "u" || keyPressed === "U" || keyPressed === "v" || keyPressed === "V"
            || keyPressed === "w" || keyPressed === "W" || keyPressed === "x" || keyPressed === "X"
            || keyPressed === "y" || keyPressed === "Y" || keyPressed === "z" || keyPressed === "Z"
        ) {
            setSearchSymbol(keyPressed)
            setShowSuggestions(true)
        }
    }, [keyPressedAt]);

    useEffect(() => {
        if (instrumentData == null) return
        loadInstrumentData()
    }, [instrumentData]);

    const loadInstrumentData = async () => {
        const response = await historicalData(instrumentData['exchange_token'], 300, 5)
        const data = response.data
        setCandlesData(data)
        setSearchSymbol("")
        setShowSuggestions(false)
    }

    return (
        <div style={{display: 'flex', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'start'}}>
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
                <SymbolSuggestion setInstrumentData={setInstrumentData} searchSymbol={searchSymbol} setSearchSymbol={setSearchSymbol}/>
            </div>}
            <div style={{marginTop: '20px', width: '100%', flex: 0.1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <div onClick={() => setShowSuggestions(true)} style={{fontSize: '20px', fontWeight: 'bold', color: 'black', border: '1px solid black', padding: '10px', borderRadius: '5px', cursor: 'pointer'}}>Search Symbol</div>
            </div>
            <div style={{display: "flex", flexDirection: "row", flex: 1, width: "100%", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{display: "flex", height: "100%", width: "80%", alignItems: "center", justifyContent: "center"}}>
                    <Chart data={candlesData}/>
                </div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", width: "20%", alignItems: "center"}}>
                    <h2>Configuration</h2>
                    {instrumentData!=null && <p style={{fontSize: "20px", color: "black"}}>{instrumentData['trading_symbol']}</p>}
                </div>
            </div>
        </div>
    )
}
export default ChartScreen