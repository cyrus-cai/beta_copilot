import CardComponent from "./components/card";
import Head from "next/head";
import HeaderComponent from "./components/header";
import NonSSRWrapper from "./utils/no-ssr-wrapper";
import SearchComponent from "./components/search";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";

import { mincuCore, dataModule } from "mincu-react";
const isApp = mincuCore.isApp;

const inter = Inter({ subsets: ["latin"] });
interface AppProps {
  id: number;
  name: String;
  description: String;
  url: String;
  imageSrc: String;
  category: String;
  status: number;
}

export default function Home() {
  const [microApps, setMicroApps] = useState([]);
  const userId = dataModule.userInfo.profile.entireProfile?.base_info?.xh ?? "";

  useEffect(() => {
    fetch("/api/appInfo")
      .then((response) => response.json())
      .then((data) => setMicroApps(data));
  }, []);

  async function handleAdd(microApps: AppProps) {
    const response = await fetch("/api/updateUserApp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, microApps }),
    });

    if (!response.ok) {
      // Handle error
      console.error("Error while adding the microApp to the user.");
      return;
    }
  }

  return (
    <>
      <NonSSRWrapper>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeaderComponent />
        <SearchComponent />
        {microApps.map((data: AppProps) => (
          <CardComponent
            key={data.id}
            imageSrc={data.imageSrc}
            title={data.name}
            description={data.description}
            url={data.url}
            AppStatus={data.status}
            handleAdd={() => handleAdd(data)}
          />
        ))}
      </NonSSRWrapper>
    </>
  );
}
