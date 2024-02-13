import Chart from "../../components/chart";
import {useEffect, useState} from "react";
import SymbolSuggestion from "../../components/popup/symbol_suggestion";
import {historicalData} from "./api";
import {parseInt} from "lodash";

const ChartScreen = () => {
    const [instrumentData, setInstrumentData] = useState(null)
    const [searchSymbol, setSearchSymbol] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [keyPressedAt, setKeyPressedAt] = useState(["", 0])
    const [intervalInSecondsInput, setIntervalInSecondsInput] = useState(300)
    const [config, setConfig] = useState({
        "interval_in_seconds": 300,
        "exchange_token": ""
    })

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
        setConfig({
            interval_in_seconds: 300,
            exchange_token: instrumentData['exchange_token'],
        })
        setSearchSymbol("")
        setShowSuggestions(false)
    }, [instrumentData]);

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start'
        }}>
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
                <SymbolSuggestion setInstrumentData={setInstrumentData} searchSymbol={searchSymbol}
                                  setSearchSymbol={setSearchSymbol}/>
            </div>}
            <div style={{
                marginTop: '20px',
                width: '100%',
                flex: 0.1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div onClick={() => setShowSuggestions(true)} style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'black',
                    border: '1px solid black',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>Search Symbol
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{
                    display: "flex",
                    height: "100%",
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Chart config={config} setConfig={setConfig}/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "20%",
                    marginLeft: "20px",
                    alignItems: "start"
                }}>
                    <h2>Configuration</h2>
                    {instrumentData != null && config !== undefined &&
                        (
                            <div>
                                <p style={{fontSize: "20px", color: "black"}}>{instrumentData['trading_symbol']}</p>
                                < div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <p style={{fontSize: "20px", color: "black", fontStyle: "italic"}}>Interval (sec): </p>
                                        <input style={{
                                            width: "100px",
                                            fontSize: "20px",
                                            color: "black",
                                            marginLeft: "10px",
                                            border: "1px solid black",
                                            padding: "5px",
                                            borderRadius: "5px"
                                        }}
                                               type="text" pattern="[0-9]*"
                                               onChange={
                                                   (e) => {
                                                       if (e.target.value === "") {
                                                           setIntervalInSecondsInput(0)
                                                           return
                                                       }
                                                       setIntervalInSecondsInput(parseInt(e.target.value))
                                                   }}
                                               value={intervalInSecondsInput}/>
                                    </div>
                                    <div style={{
                                        fontSize: "20px",
                                        color: "black",
                                        border: "1px solid black",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginTop: "10px",
                                        fontWeight: "bold"
                                    }} onClick={
                                        (e) => {
                                            setConfig((prevState) => ({
                                                ...prevState,
                                                interval_in_seconds: intervalInSecondsInput
                                            }))
                                        }}>Load chart
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default ChartScreen