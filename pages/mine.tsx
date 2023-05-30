import CardComponent from "./components/card";
import HeaderComponent from "./components/header";

const Mine = () => {
  return (
    <div>
      <HeaderComponent />
      <div>Mine</div>
      <CardComponent
        imageSrc={""}
        title={""}
        description={""}
        link={""}
        statues={""}
        createdAt={""}
      />
    </div>
  );
};
export default Mine;
