import Chart from "../../components/chart";
import {useEffect, useState} from "react";
import SymbolSuggestion from "../../components/popup/symbol_suggestion";
import {CircularProgress, Fab, Typography} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import {useTheme} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Configuration from "./configuration";
import Box from "@mui/material/Box";

const ChartScreen = () => {
    const theme = useTheme()
    const [instrumentData, setInstrumentData] = useState(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [openSettingDrawer, setOpenSettingDrawer] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [config, setConfig] = useState({
        "interval_in_seconds": 300,
        "exchange_token": "",
        "name": "",
        "trading_symbol": "",
    })

    useEffect(() => {
        if (instrumentData == null) return
        setConfig(prevState => (
            {
                ...prevState,
                "exchange_token": instrumentData['exchange_token'],
                "name": instrumentData['name'],
                "trading_symbol": instrumentData['trading_symbol'],
            }
        ))
    }, [instrumentData]);

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'primary.dark',
            color: 'primary.contrastText'
        }}>
            {showSuggestions && <SymbolSuggestion setInstrumentData={setInstrumentData}
                                                  showSuggestions={showSuggestions}
                                                  setShowSuggestions={setShowSuggestions}/>}
            <Box sx={{
                backgroundColor: 'primary.dark',
                position: 'fixed',
                left: 70,
                top: 5,
                display: 'flex',
                width: '220px',
                margin: 1,
                padding: 0.5,
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: '20px',
                borderWidth: '1px',
                border: '1px solid',
                borderColor: 'primary.main',
                zIndex: 100,
                alignItems: 'center',
            }}>
                <Fab
                    sx={{
                        padding: 0,
                        margin: 0,
                        width: 110,
                        height: 20,
                        m: 1,
                        borderRadius: '20px',
                        backgroundColor: 'primary.dark',
                        color: 'primary.main'
                    }}
                    color ='primary.dark'
                    onClick={() => setShowSuggestions(true)}>
                    <SearchIcon fontSize='small' color='theme.palette.primary.contrastText'/>
                    Search
                </Fab>
                <Fab
                    sx={{
                        padding: 0,
                        margin: 0,
                        width: 38,
                        height: 20,
                        m: 1,
                        borderRadius: '20px',
                        backgroundColor: 'primary.dark',
                        color: 'primary.main'
                    }}
                    onClick={() => setOpenSettingDrawer(true)}>
                    <SettingsIcon fontSize='small' color='theme.palette.primary.contrastText'/>
                </Fab>
            </Box>

            {openSettingDrawer && <Configuration
                openSettingDrawer={openSettingDrawer}
                setOpenSettingDrawer={setOpenSettingDrawer}
                instrumentData={instrumentData}
                setConfig={setConfig}
                config={config}
            />
            }
            {config.exchange_token && <Box sx={{
                height: "100%",
                width: "100%",
                background: theme.palette.primary.dark,
            }}>
                <Chart config={config} isLoading={isLoading} setIsLoading={setIsLoading}/>
            </Box>}
            {!config.exchange_token && <Box sx={{
                height: "100%",
                width: "100%",
                background: theme.palette.primary.dark,
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography>No data</Typography>
                </Box>
            </Box>}
            {isLoading && <Box sx={{
                height: "100%",
                width: "100%",
                background: theme.palette.primary.dark,
            }}>
                isLoading ? <CircularProgress /> : null
            </Box>}
        </Box>
    )
}
export default ChartScreen