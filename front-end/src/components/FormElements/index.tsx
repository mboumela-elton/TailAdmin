"use client";
import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ipAdress from "@/ipAdress/ipAdress";

const FormElements = () => {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig<AxiosResponse<Blob>> = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };
  const [isDowloadable, setDowloadable] = useState(true);

  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const openPDFInNewWindow = async () => {
    try {
      let id: string | null = localStorage.getItem("userId");
      const response = await axios.get(
        `${ipAdress}/open-local-file?userId=${id ? parseInt(id) : ""}`,
        config,
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, "_blank");
    } catch (error) {
      alert(
        "Une erreur s'est produite lors de la récupération du fichier PDF.",
      );
      console.error(
        "Une erreur s'est produite lors de la récupération du fichier PDF.",
        error,
      );
    }
  };

  const dowloadPdf = async () => {
    try {
      let id: string | null = localStorage.getItem("userId");
      let username: string | null = localStorage.getItem("username");

      const response = await axios.get(
        `${ipAdress}/open-local-file?userId=${id ? parseInt(id) : ""}`,
        config,
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = username + ".pdf"; // Nom du fichier PDF à télécharger
      link.click();

      URL.revokeObjectURL(fileURL);
    } catch (error) {
      alert(
        "Une erreur s'est produite lors de la récupération du fichier PDF.",
      );
      console.error(
        "Une erreur s'est produite lors de la récupération du fichier PDF.",
        error,
      );
    }
  };

  useEffect(() => {
    let id = localStorage.getItem("userId");
    console.log(id);
    id
      ? axios
          .get(`${ipAdress}/open-local-file?userId=${parseInt(id)}`, config)
          .then((response) => {
            console.log(response.data);
            setDowloadable(false);
          })
          .catch((error) => {
            console.log(error.response.data);
            console.error(
              "Une erreur s'est produite lors de la récupération du fichier PDF.",
              error,
            );
            setDowloadable(true);
            alert(
              "Une erreur s'est produite lors de la récupération du fichier PDF.",
            );
          })
      : null;
  }, []);

  const handleClickLink = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  return (
    <>
      <Breadcrumb page1="Your informations" page2="Dowload" />

      {!isDowloadable && (
        <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                fill="white"
                stroke="white"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
              Form successfully filled out
            </h5>
            <p className="text-base leading-relaxed text-body">
              You can now download your form or edit it later.
            </p>
          </div>
        </div>
      )}

      {isDowloadable && (
        <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                fill="#FBBF24"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
              Attention needed
            </h5>
            <p className="leading-relaxed text-[#D0915C]">
              The form to download is not yet available, you must complete it!
            </p>
          </div>
        </div>
      )}

      <div className="sx:gap-5 mt-10 flex justify-center lg:gap-15">
        <button
          onClick={handleClickLink}
          className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 lg:w-50"
        >
          Go back
        </button>
        {!isDowloadable && (
          <>
            <button
              onClick={() => openPDFInNewWindow()}
              className=" rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 lg:w-50"
            >
              View
            </button>
            <button
              onClick={() => dowloadPdf()}
              className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 lg:w-50"
            >
              Dowload
            </button>
          </>
        )}
      </div>
      <Link ref={linkRef} href="/forms/form-layout"></Link>
    </>
  );
};

export default FormElements;
