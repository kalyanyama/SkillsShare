import React from "react";
import { Banner } from "./banner";
import { Featured } from "./featured";
import { Hero } from "./hero";
import { Languages } from "./languages";
import { Skills } from "./skills";

export const Landingpage = () => {
  return (
    <div className="space-y-24">
      <Hero />
      <Languages />
      <Featured />
      <Skills />
      <Banner />
    </div>
  );
};
