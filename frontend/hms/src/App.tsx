import './App.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { Provider } from "react-redux";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import AppRoutes from './Routes/AppRoutes'
import Store from './Store';
import { PrimeReactProvider } from 'primereact/api';
import { ModalsProvider } from '@mantine/modals';


const theme = createTheme({
  focusRing: "never",
  fontFamily: "Poppins, sans-serif",
  headings: {
    fontFamily: "Merriweather, serif"
  },
  colors: {
    primary: ['#f1fcfa', '#cff8ef', '#9ff0e1', '#67e1cf', '#32b9a9', '#1fad9f', '#168b82', '#166f69', '#165955', '#174a47', '#072c2b'],
    neutral: ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#000000',],

  },
  primaryColor: "primary",
  primaryShade: 4,
  defaultGradient: {
    from: "primary.4",
    to: "primary.8",
    deg: 132,
  }
});
function App() {

  return (
    <>
      <Provider store={Store}>
        <MantineProvider theme={theme} forceColorScheme='light'>
          <ModalsProvider>
            <PrimeReactProvider>
              <AppRoutes />
              <Notifications position='top-center' />
            </PrimeReactProvider>
          </ModalsProvider>
        </MantineProvider>
      </Provider>
    </>
  )
}

export default App
