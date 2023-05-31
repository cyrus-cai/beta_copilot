import CardComponent from "./components/card";
import HeaderComponent from "./components/header";
import { mincuCore } from "mincu-react";

const isApp = mincuCore.isApp;

const Mine = () => {
  return (
    <div>
      {isApp ? (
        <div>
          <HeaderComponent />
          <div>Mine</div>
          <CardComponent
            type="mine"
            imageSrc={""}
            title={""}
            description={""}
            link={""}
            statues={""}
            createdAt={""}
          />
        </div>
      ) : (
        <div>请在 iNCU 中打开</div>
      )}
    </div>
  );
};
export default Mine;
