import {Fragment, useEffect, useState} from "react";
import {isAllCaseLetter} from "./utils";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import GppBadIcon from '@mui/icons-material/GppBad';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Alert} from "theme-ui";
import {Paper, Stack, TextField, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Configuration = ({openSettingDrawer, setOpenSettingDrawer, instrumentData, setConfig, config}) => {
    const [intervalInSecondsInput, setIntervalInSecondsInput] = useState(300)
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
                </div>
                <Button variant="contained" color="primary" fullWidth onClick={() => {
                    setConfig((prevState) => ({
                        ...prevState,
                        interval_in_seconds: intervalInSecondsInput
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