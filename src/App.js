import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from "./pages/dashboard";
import Testing from "./pages/testing";

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
    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div
                    className="App"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/ms" element={<Testing />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </Router>
        // <ThemeProvider theme={darkTheme}>
        //     <CssBaseline />
        //     <div className="App"
        //          style={{
        //              height: "100vh",
        //              width: "100vw",
        //              display: 'flex',
        //              flexDirection: 'row'
        //          }}>
        //         <Dashboard />
        //     </div>
        // </ThemeProvider>
    );
}
