import toast, { Toaster } from "react-hot-toast";

import { Button } from "@geist-ui/core";
import CardComponent from "./components/card";
import HeaderComponent from "./components/header";
import { dataModule } from "mincu-react";
import { useEffect } from "react";
import { useMicroAppsStore } from "../stores/useMicroAppStore";

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
  // const userId = "5701119201";


  const { myMicroApps, fetchMyMicroApps, removeMicroApp } = useMicroAppsStore();

  async function handleRemove(microApp: AppProps) {
    toast.promise(
      (async () => {
        const response = await fetch("/api/updateUserApp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            microAppId: microApp.id,
            action: "remove",
          }),
        });

        if (!response.ok) {
          throw new Error("Error while removing the microApp from the user.");
        }

        removeMicroApp(microApp);

        return response;
      })(),
      {
        loading: "Processing...",
        success: "Successful Removed",
        error: "Remove Failed",
      }
    );
  }

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
          handleRemove={() => handleRemove(data)}
        />
      ))}
      <Button
        onClick={() => {
          console.log(userId);
        }}
      >
        test xh get
      </Button>
      <Toaster />
    </div>
  );
};
export default Mine;
