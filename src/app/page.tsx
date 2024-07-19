import Navbar from "@/components/ui/navbar";
import { HeroLight } from "./components/HeroLight";
import { ThemeProvider } from "@/components/theme-provider";



export default function Home() {
  return (
    <div className="flex flex-col dark:bg-black min-h-screen">
      <ThemeProvider>
          <Navbar />
          <HeroLight />
      </ThemeProvider>
    </div>
  );
}
