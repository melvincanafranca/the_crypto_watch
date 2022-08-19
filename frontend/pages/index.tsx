import Head from "next/head";
import React, { useState } from "react";
import type { NextPage } from "next";
import Watchlist from "@components/Watchlist";
import Trending from "@components/Trending";
import Chart from "@components/Chart";
import News from "@components/News";
import Header from "@components/Header";

const Home: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Head>
        <title>Crypto-Watch | A Redis Stack Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="grid grid-cols-12 gap-6">
              <Watchlist />
              <Trending />
              <Chart />
              <News />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
