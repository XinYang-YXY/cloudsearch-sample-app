import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import NewsletterPage  from "./pages/NewsletterPage";

function App() {

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <NewsletterPage/>


    </ChakraProvider>
  );
}

export default App;
