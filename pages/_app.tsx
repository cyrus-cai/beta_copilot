import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

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
