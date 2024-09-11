'use client'
import Navbar from "@/components/ui/navbar";
import { HeroLight } from "./components/HeroLight";
import { ThemeProvider } from "@/components/theme-provider";
import Events from "./components/Events";
import { Community } from "./components/Community";
import { Featured } from "./components/Featured";
import { SearchBox } from "./components/SearchBox";
import { GlobalContextProvider } from "../../context/GlobalContext";
import { SessionProvider } from "next-auth/react";



export default function Home() {
  return (
    <div>
      <ThemeProvider>
        <SessionProvider>
          <Navbar />
          <div className="flex flex-col dark:bg-black min-h-screen gap-8 pb-8">
            <HeroLight />
            <SearchBox />
            <Featured />
            <Events />
            <Community />
          </div>
        </SessionProvider>
      </ThemeProvider>
    </div>
  );
}
