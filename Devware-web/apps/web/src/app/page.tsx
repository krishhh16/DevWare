import AboutSectionOne from "@/app/components/About/AboutSectionOne";
import ScrollUp from "@/app/components/Common/ScrollUp";
import Contact from "@/app/components/Contact";
import Features from "@/app/components/Features";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Pricing from "@/app/components/Pricing";
import { Metadata } from "next";

export const runtime = 'edge'
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
