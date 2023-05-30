import Link from "next/link";

import { Button } from "@geist-ui/core";

const HeaderComponent = () => {
  return (
    <div>
      <Link href="./mine">Go to About Page</Link>
      <Button
        onClick={() => {
          window.location.href = `incu://Webview?url=${encodeURIComponent(
            "https://incu.ncuos.com/"
          )}`;
          // window.location.href = "incu://Webview?url=https://incu.ncuos.com/";
        }}
      >
        open iNCU
      </Button>
    </div>
  );
};

export default HeaderComponent;
