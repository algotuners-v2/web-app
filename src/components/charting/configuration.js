import {Fragment, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import GppBadIcon from '@mui/icons-material/GppBad';
import {FormControlLabel, TextField, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {IOSSwitch} from "./utils";

const Configuration = ({openSettingDrawer, setOpenSettingDrawer, instrumentData, setConfig, config}) => {
    const [intervalInSecondsInput, setIntervalInSecondsInput] = useState(config.interval_in_seconds)
    const [showSupportResistanceLevels, setShowSupportResistanceLevels] = useState(config.show_support_resistance_levels)
    const anchor = 'right';

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenSettingDrawer(!openSettingDrawer)
    };

    useEffect(() => {
        setIntervalInSecondsInput(config[`interval_in_seconds`])
    }, [])

    const options = () => {
        if (instrumentData === undefined || instrumentData == null) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <GppBadIcon sx={{fontSize: 30}}/>
                    <p>No symbol selected!</p>
                </div>
            )
        }
        return (<Box
            sx={{width: 1, p: 2}}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <ChevronRightIcon sx={{
                fontSize: 40,
                cursor: 'pointer',
                color: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: '50%',
                padding: '5px',
                ":hover": {
                    color: 'white',
                    border: '1px solid',
                    borderColor: 'white',
                    borderRadius: '50%',
                    padding: '5px'
                },
                ":active": {
                    color: 'primary.dark'
                },
            }} onClick={() => setOpenSettingDrawer(false)}/>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>{instrumentData['trading_symbol']}</Typography>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant="body1" style={{ marginRight: '10px', fontStyle: 'italic' }}>Interval (sec):</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        inputProps={{ pattern: "[0-9]*" }}
                        value={intervalInSecondsInput}
                        onChange={(e) => {
                            const value = e.target.value === "" ? 0 : parseInt(e.target.value);
                            setIntervalInSecondsInput(value);
                        }}
                        style={{ width: '100px' }}
                    />
                    <FormControlLabel
                        onClick={() => {
                            setShowSupportResistanceLevels(prevState => !prevState)
                        }}
                        checked={showSupportResistanceLevels}
                        style={{ marginLeft: '10px' }}
                        control={<IOSSwitch sx={{ m: 1 }} />}
                        label="Show S/R levels"
                    />
                </div>
                <Button variant="contained" color="primary" fullWidth onClick={() => {
                    setConfig((prevState) => ({
                        ...prevState,
                        interval_in_seconds: intervalInSecondsInput,
                        show_support_resistance_levels: showSupportResistanceLevels,
                    }));
                    setOpenSettingDrawer(false);
                }}>
                    Load chart
                </Button>
            </div>
        </Box>)
};

    return (
        <Fragment key={anchor}>
            <Drawer
                anchor={anchor}
                open={openSettingDrawer}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: 600, maxWidth: 1,
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '30px',
                    },
                }}
            >
                {options()}
            </Drawer>
        </Fragment>
    );

}

export default Configuration;