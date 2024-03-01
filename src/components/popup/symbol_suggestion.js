import {useCallback, useEffect, useRef, useState} from "react";
import {api} from "../../api";
import _ from "lodash";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {Container, Dialog, DialogTitle, InputAdornment, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const debounceTime = 300

const getSuggestions = async (keyword, segment) => {
    if (keyword === '' || segment === '') return [];
    return (await api.get('/symbol-suggestions', {
        params: {keyword, segment}
    })).data;
}

const SymbolSuggestion = ({setInstrumentData, setShowSuggestions, showSuggestions}) => {
    const [suggestions, setSuggestions] = useState([{}]);
    const [searchSymbol, setSearchSymbol] = useState("");
    const [segment, setSegment] = useState("NSE");

    const getSuggestionsDebounced = useCallback(_.debounce(async (keyword, segment) => {
        const response = await getSuggestions(keyword, segment);
        if (response === undefined || response == null) return;
        setSuggestions(response.data);
    }, debounceTime), []);

    useEffect(() => {
        if (searchSymbol) getSuggestionsDebounced(searchSymbol, segment);
        return () => getSuggestionsDebounced.cancel();
    }, [searchSymbol, segment, getSuggestionsDebounced]);

    const SuggestionsUI = () => {
        if (suggestions === undefined) return <div>Loading...</div>
        if (suggestions === null) return <div>No results found</div>
        const uiElems = suggestions.map((suggestion) => {
            return (
                <>
                    <ListItemButton
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            width: '100%',
                            p: 1,
                            m: 0,
                        }}
                        onClick={() => {
                            setInstrumentData(suggestion);
                            setSearchSymbol("")
                            setShowSuggestions(false);
                        }}>
                        <ListItemText sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            width: 1
                        }} primary={suggestion['trading_symbol']}/>
                        <ListItemText sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "flex-end",
                            alignItems: 'center',
                            width: 1
                        }} primary={suggestion['exchange']}/>
                    </ListItemButton>
                </>
            )
        })
        return (
            <>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    width: 1,
                    p: 0,
                    mt: 1,
                }}>
                    {uiElems}
                </List>
            </>
        )
    }

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            onClose={() => setShowSuggestions(false)} open={showSuggestions}>
            <Container maxWidth="md">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    width: '100%',
                    height: 80,
                    p: 0,
                    m: 0,
                }}>
                    <DialogTitle sx={{m: 0, p: 0}}>Select Symbol</DialogTitle>
                    <ToggleButtonGroup
                        sx={{m: 0, p: 0}}
                        size="small"
                        value={segment}
                        exclusive
                        onChange={(e, newSegment) => {
                            setSegment(newSegment)
                        }}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="NSE">
                            Stock
                        </ToggleButton>
                        <ToggleButton value="INDICES">
                            Index
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <CloseIcon onClick={() => setShowSuggestions(false)} style={{cursor: 'pointer'}}/>
                </Box>
                <Box sx={{
                    m: 0,
                    mt: 1.5,
                    mb: 0.5,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    width: '100%',
                    height: 30,
                }}>
                    <TextField
                        id="input-with-icon-textfield"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        autoFocus
                        value={searchSymbol}
                        onChange={(e) => setSearchSymbol(e.target.value)}
                        label="Search" variant="standard"/>
                </Box>
                <SuggestionsUI/>
            </Container>
        </Dialog>
    )
}
export default SymbolSuggestion;