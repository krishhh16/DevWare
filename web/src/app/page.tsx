import AboutSectionOne from "@/components/About/AboutSectionOne";
import ScrollUp from "@/components/Common/ScrollUp";
import Feedback from "@/components/Feedback";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevWare",
};

export default function Home() {
  return (
    <>
      <Header/>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      <Pricing />
      <Feedback />
      <Footer />
    </>
  );
}
