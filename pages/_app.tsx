import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { AppProps } from "next/app";

type MyAppProps = AppProps & {
  // Add any custom props here
};

const App = ({ Component, pageProps }: MyAppProps) => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
};

export default App;
