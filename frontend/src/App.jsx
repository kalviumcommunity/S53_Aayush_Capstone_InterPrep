import './App.css'
import AllRoutes from './components/Routes/AllRoutes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  breakpoints: {
    xsm: '320px',
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
