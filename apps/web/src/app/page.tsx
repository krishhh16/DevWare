import AboutSectionOne from "@/components/About/AboutSectionOne";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
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
      <Contact />
    </>
  );
}
