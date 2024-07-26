import Navbar from "@/components/ui/navbar";
import { HeroLight } from "./components/HeroLight";
import { ThemeProvider } from "@/components/theme-provider";
import Events from "./components/Events";
import { Community } from "./components/Community";
import { Featured } from "./components/Featured";
import { SearchBox } from "./components/SearchBox";



export default function Home() {
  return (
    <div className="flex flex-col dark:bg-black min-h-screen gap-12 pb-8">
      <ThemeProvider>
          <HeroLight />
          <SearchBox />
          <Featured />
          <Events />
          <Community />
      </ThemeProvider>
    </div>
  );
}
