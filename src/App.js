import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from "./pages/dashboard";

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
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App"
                 style={{
                     height: "100vh",
                     width: "100vw",
                     display: 'flex',
                     flexDirection: 'row'
                 }}>
                <Dashboard />
            </div>
        </ThemeProvider>
    );
}
