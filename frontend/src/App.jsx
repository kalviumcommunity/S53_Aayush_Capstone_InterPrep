import './App.css'
import Sidebar from './components/Sidebar';
import AllRoutes from './components/routes/AllRoutes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';

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

  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const shouldShowSidebar = pathname.startsWith('/jobs') || pathname === '/browse';

  return (
    <>
    <ChakraProvider theme={customTheme}>
      <AllRoutes />
    </ChakraProvider>
    </>
  )
}

export default App
