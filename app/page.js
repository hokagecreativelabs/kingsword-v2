import EventsSection from "@/components/sections/EventsSection";
import GestureSection from "@/components/sections/GestureSection";
import HeroSection from "@/components/sections/HeroSection";
import Initiative from "@/components/sections/Initiative";
import WorshipPage from "@/components/sections/WorshipSection";
import YouTubeVideos from "@/components/sections/YoutubeUpload";
import RevealWrapper from "@/utils/RevealWrapper";

export default function Home() {
  return (
    <>
      <RevealWrapper delay={0.1}><HeroSection /></RevealWrapper>
      <RevealWrapper delay={0.2}><YouTubeVideos /></RevealWrapper>
      <RevealWrapper delay={0.3}><WorshipPage /></RevealWrapper>
      <RevealWrapper delay={0.5}><EventsSection /></RevealWrapper>
      <RevealWrapper delay={0.4}><Initiative /></RevealWrapper>
      <RevealWrapper delay={0.5}><GestureSection /></RevealWrapper>
    </>
  );
}
