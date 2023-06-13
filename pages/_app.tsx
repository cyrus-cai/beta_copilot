import '../styles/globals.css'

import { CssBaseline, GeistProvider } from "@geist-ui/core";
import React, { useEffect } from "react";

import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (typeof window !== "undefined") {
        import("vconsole").then(({ default: VConsole }) => {
          new VConsole();
        });
      }
    }
  }, []);

  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
};

export default App;
