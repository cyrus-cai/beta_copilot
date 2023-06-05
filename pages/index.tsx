import { dataModule, mincuCore } from "mincu-react";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";

import CardComponent from "./components/card";
import Head from "next/head";
import HeaderComponent from "./components/header";
import { Inter } from "@next/font/google";
import NonSSRWrapper from "./utils/no-ssr-wrapper";
import SearchComponent from "./components/search";
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

export default function Home() {
  const { microApps, fetchMicroApps } = useMicroAppsStore();
  const userId = dataModule.userInfo.profile.entireProfile?.base_info?.xh ?? "";

  useEffect(() => {
    if (!microApps.length) {
      fetchMicroApps();
    }
  }, []);

  async function handleAdd(microApp: AppProps) {
    toast.promise(
      (async () => {
        const response = await fetch("/api/updateUserApp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userId, microAppId: microApp.id, action: "add" }),
        });

        if (!response.ok) {
          throw new Error("Error while adding the microApp to the user.");
        }

        return response;
      })(),
      {
        loading: 'Processing...',
        success: 'Successful Added',
        error: 'Add Failed',
      }
    );
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
        <Toaster />
      </NonSSRWrapper>
    </>
  );
}
