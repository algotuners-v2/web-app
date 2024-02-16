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

const debounceTime = 300

const getSuggestions = async (keyword) => {
    if (keyword === '') return [];
    return (await api.get('/symbol-suggestions', {
        params: {keyword}
    })).data;
}

const SymbolSuggestion = ({setInstrumentData, setShowSuggestions, showSuggestions}) => {
    const [suggestions, setSuggestions] = useState([{}]);
    const [searchSymbol, setSearchSymbol] = useState("");
    const getSuggestionsDebounced = useCallback(_.debounce(async (keyword) => {
        const response = await getSuggestions(keyword);
        if (response === undefined || response == null) return;
        setSuggestions(response.data);
    }, debounceTime), []);

    useEffect(() => {
        if (searchSymbol) getSuggestionsDebounced(searchSymbol);
        return () => getSuggestionsDebounced.cancel();
    }, [searchSymbol, getSuggestionsDebounced]);

    const SuggestionsUI = () => {
        if (suggestions === undefined || suggestions.length === 0) return <div>Loading...</div>
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
                    p: 0,
                    m: 0,
                }}>
                    <DialogTitle sx={{m: 0, marginTop: 1, p: 0}}>Select Symbol</DialogTitle>
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