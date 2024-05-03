import './App.css'
import AllRoutes from './components/routes/AllRoutes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  breakpoints: {
    xsm: '320px', // Example width for extra-small devices
    sm: '480px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
});

function App() {

  return (
    <>
    <ChakraProvider theme={customTheme}>
      <AllRoutes />
    </ChakraProvider>
    </>
  )
}

export default App
