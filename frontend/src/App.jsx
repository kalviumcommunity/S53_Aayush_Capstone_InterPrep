import './App.css'
import Sidebar from './components/Sidebar';
import TestPage from './components/TestPage';
import AllRoutes from './components/routes/AllRoutes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';

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

  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const shouldShowSidebar = lastSegment === 'hello' || lastSegment === 'browse';



  return (
    <>
    <ChakraProvider theme={customTheme}>
    {shouldShowSidebar && <Sidebar />}
      <AllRoutes />
    </ChakraProvider>
    </>
  )
}

export default App
