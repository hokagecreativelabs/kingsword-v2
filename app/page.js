import GestureSection from "@/components/sections/GestureSection";
import HeroSection from "@/components/sections/HeroSection";
import Initiative from "@/components/sections/Initiative";
import WorshipPage from "@/components/sections/WorshipSection";
import YouTubeVideos from "@/components/sections/YoutubeUpload";

export default function Home() {
  return (
    <>
      <HeroSection />
      <YouTubeVideos />
      <WorshipPage />
      <Initiative />
      <GestureSection />
    </>
  );
}
