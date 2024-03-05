"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "../Tables/TableThree";

const ECommerce: React.FC = () => {
  const role = localStorage.getItem("role");

  if (role !== "ADMIN") {
    window.location.href = "/";
  }
  return (
    <>
      <Breadcrumb page1="Dashboard" page2="My Dashboard" />
      <div className="mt-3 grid grid-cols-12">
        <div className="col-span-12 xl:col-span-12">
          <TableThree />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
