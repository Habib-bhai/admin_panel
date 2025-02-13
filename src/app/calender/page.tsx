import Calendar from "@/components/Calendar"; 
import PageBreadcrumb from "@/components/PageBreadCrumb"; 
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: " Calender | Hiply ",
  description:
    "This is a Next.js Calender page",
  // other metadata
};
export default function page() {
  return (
    <div className=" w-screen overflow-x-hidden flex flex-col justify-center items-center ">
      <PageBreadcrumb pageTitle="Calendar" />
      <Calendar />
    </div>
  );
}