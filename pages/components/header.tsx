import { mincuCore, uiModule } from "mincu-react";

import { Button } from "@geist-ui/core";
import Link from "next/link";

const isApp = mincuCore.isApp;

const HeaderComponent = () => {
  return (
    <div>
      <h2>Beta_Copilot</h2>
      <Link href="./">Go to Index Page</Link>
      <Link href="./mine">Go to My Page</Link>
      {/* {isApp ? (
        <Link href="./mine">Go to My Page</Link>
      ) : (
        <Button
          onClick={() => {
            window.location.href = `incu://Webview?url=${encodeURIComponent(
              "http://localhost:3000/mine"
            )}`;
          }}
        >
          Go to My Page
        </Button>
      )} */}
    </div>
  );
};

export default HeaderComponent;
