import Navbar from "@/components/ui/navbar";
import { HeroLight } from "./components/HeroLight";
import { ThemeProvider } from "@/components/theme-provider";
import Events from "./components/Events";
import { Community } from "./components/Community";
import { Featured } from "./components/Featured";



export default function Home() {
  return (
    <div className="flex flex-col dark:bg-black min-h-screen gap-12 pb-8">
      <ThemeProvider>
          <HeroLight />
          <Featured />
          <Events />
          <Community />
      </ThemeProvider>
    </div>
  );
}
