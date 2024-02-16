import {useEffect, useRef, useState} from "react";
import {api} from "../../api";
import _, {upperCase} from "lodash";

const debounceTime = 300

const getSuggestions = async (keyword) => {
    if (keyword === '') return [];
    return (await api.get('/symbol-suggestions', {
        params: {keyword}
    })).data;
}

const SymbolSuggestion = ({setInstrumentData, setSearchSymbol, searchSymbol}) => {
    const inputRef = useRef(null);
    const [suggestions, setSuggestions] = useState([{}]);

    const getSuggestionsDebounced = _.debounce(async (keyword) => {
        const response = await getSuggestions(keyword);
        if (response.data === undefined || response.data == null) return;
        setSuggestions(response.data);
    }, debounceTime);

    useEffect(() => {
        getSuggestionsDebounced(searchSymbol)
        return () => getSuggestionsDebounced.cancel();
    }, [searchSymbol])

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const SuggestionsUI = () => {
        if (suggestions === undefined || suggestions.length === 0) return <div>Loading...</div>
        const uiElems = suggestions.map((suggestion) => {
            return <div onClick={(e) => {
                setInstrumentData(suggestion)
            }} style={{
                display: "flex",
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                color: 'black',
                backgroundColor: 'white',
                height: '10px',
                border: '2px solid grey',
                borderTopWidth: '0px',
                borderLeftWidth: '0px',
                borderRightWidth: '0px',
                borderRadius: '3px',
                padding: '13px',
                paddingLeft: '0px',
                margin: '3px',
                ':hover': {
                    backgroundColor: 'lightgrey',
                }
            }}>
                <div>
                    {suggestion['trading_symbol']}
                </div>
                <div>
                    {suggestion['exchange']}
                </div>
            </div>
        })
        return (
            <div style={{width: '100%', height: '100%', overflowY: 'scroll', overflowX: 'scroll'}}>
                {uiElems}
            </div>
        )
    }

    return (
        <div style={{
            width: '70%',
            height: '70%',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '10px',
            borderWidth: '1px',
            borderColor: 'black',
            borderStyle: 'solid',
        }}>
            <div style={{display: 'flex', height: "50px", flexDirection: 'row', alignItems: 'center', justifyContent: 'start'}}>
                <h3>Symbol:</h3>
                <input ref={inputRef} onChange={(e) => setSearchSymbol(e.target.value)} type="text" value={searchSymbol.toUpperCase()}/>
            </div>
            <SuggestionsUI/>
        </div>
    )
}
export default SymbolSuggestion;