import { dataModule, mincuCore } from "mincu-react";
import { useEffect, useState } from "react";

import { Button } from "@geist-ui/core";
import CardComponent from "./components/card";
import HeaderComponent from "./components/header";

interface AppProps {
  id: number;
  name: String;
  description: String;
  url: String;
  imageSrc: String;
  category: String;
  status: number;
}

const Mine = () => {
  const userId = dataModule.userInfo.profile.entireProfile?.base_info?.xh;

  const [myMicroApps, setMyMicroApps] = useState([]);

  console.log(myMicroApps);

  useEffect(() => {
    fetch("/api/myAppInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Mydata", data);
        setMyMicroApps(data);
      });
  }, []);

  return (
    <div>
      <HeaderComponent />
      <div>Mine</div>
      {myMicroApps.map((data: AppProps) => (
        <CardComponent
          key={data.id}
          imageSrc={data.imageSrc}
          title={data.name}
          description={data.description}
          url={data.url}
          AppStatus={data.status}
        />
      ))}
      <Button onClick={() => { console.log(userId) }}>test xh get</Button>
    </div>
  );
};
export default Mine;
