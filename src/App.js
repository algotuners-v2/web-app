
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppDrawer from "./components/drawer/app_drawer";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import DayRangeBreakout from "./pages/screeners/day_range_breakout";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#606470',
            main: '#606470',
            dark: '#26282B',
            contrastText: '#F5F5F5',
        },
        secondary: {
            light: '#A0E9FF',
            main: '#4586FF',
            dark: '#6A7EFC',
            contrastText: '#F5F5F5',
        },
    },
});

export default function App() {
    const [selectedPageIdx, setSelectedPageIdx] = useState(0)

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App"
                 style={{
                     height: "100vh",
                     width: "100vw",
                     display: 'flex',
                     flexDirection: 'row'
                 }}>
                <Box sx={{
                    width: 64,
                    height: '100%',
                    flexShrink: 0
                }}>
                    <AppDrawer setSelectedPageIdx={setSelectedPageIdx} selectedPageIdx={selectedPageIdx}/>
                </Box>
                <Box sx={{
                    flexGrow: 1,
                    height: '100%'
                }}>
                    {selectedPageIdx === 0 && <DayRangeBreakout />}
                </Box>
            </div>
        </ThemeProvider>
    );
}
