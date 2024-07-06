import "./App.css";
import {
  ChakraProvider,
  extendTheme
} from "@chakra-ui/react";
import AllRoutes from "../src/components/routes/AllRoutes";
import { Toaster } from "sonner";
import TopHead from "./components/TopHead";

const customTheme = extendTheme({
  breakpoints: {
    xsm: "320px",
    sm: "480px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});

function App() {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Toaster richColors position="top-center" />
        <TopHead />
        <AllRoutes />
      </ChakraProvider>
    </>
  );
}

export default App;
