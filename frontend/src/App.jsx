import './App.css'
import AllRoutes from '../src/components/routes/AllRoutes';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Toaster } from 'sonner'

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
      <Toaster richColors position="top-center"/>
      <AllRoutes />
    </ChakraProvider>
    </>
  )
}

export default App
