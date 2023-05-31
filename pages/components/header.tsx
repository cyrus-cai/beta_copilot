import Link from "next/link";
import { Button } from "@geist-ui/core";
import { mincuCore, uiModule } from "mincu-react";

const isApp = mincuCore.isApp;

const HeaderComponent = () => {
  return (
    <div>
      <h2>Beta_Copilot</h2>
      <Link href="./">Go to Index Page</Link>
      {isApp ? (
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
      )}
    </div>
  );
};

export default HeaderComponent;
