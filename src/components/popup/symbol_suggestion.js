import {useEffect, useState} from "react";
import {api} from "../../api";
import _ from "lodash";

const debounceTime = 300

const getSuggestions = async (keyword) => {
    if (keyword === '') return [];
    return (await api.get('/symbol-suggestions', {
        params: {keyword}
    })).data;
}

const SymbolSuggestion = ({symbol, setInstrumentToken}) => {
    const [suggestions, setSuggestions] = useState([{}]);

    const getSuggestionsDebounced = _.debounce(async (keyword) => {
        const response = await getSuggestions(keyword);
        if (response.data === undefined || response.data == null) return;
        setSuggestions(response.data);
    }, debounceTime);

    useEffect(() => {
        getSuggestionsDebounced(symbol)
        return () => getSuggestionsDebounced.cancel();
    }, [symbol])

    const SuggestionsUI = () => {
        if (suggestions === undefined || suggestions.length === 0) return <div>Loading...</div>
        const uiElems = suggestions.map((suggestion) => {
            return <div onClick={(e) => {
                setInstrumentToken(suggestion['exchange_token'])
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
            <h3>Symbol: {symbol}</h3>
            <SuggestionsUI />
        </div>
    )
}
export default SymbolSuggestion;