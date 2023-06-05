import { useEffect, useState } from "react";

import { Button } from "@geist-ui/core";
import CardComponent from "./components/card";
import HeaderComponent from "./components/header";
import { dataModule } from "mincu-react";
import { useMicroAppsStore } from '../stores/useMicroAppStore';

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

  const { myMicroApps, fetchMyMicroApps } = useMicroAppsStore();

  useEffect(() => {
    if (userId) {
      fetchMyMicroApps(userId);
    }
  }, [userId, fetchMyMicroApps]);

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
