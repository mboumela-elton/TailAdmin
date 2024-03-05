"use client";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEventHandler,
} from "react";
import flatpickr from "flatpickr";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import ipAdress from "@/ipAdress/ipAdress";

const FormLayout = () => {
  const [selectDefaultForm, setSelectDefaultForm] = useState(true);
  const [selectStudentForm, setSelectStudentForm] = useState(false);
  const [selectWorkerForm, setSelectWorkerForm] = useState(false);
  const [isSubmitValid, setSubmitValid] = useState(true);
  const [isSubmitValid2, setSubmitValid2] = useState(true);
  const [invalidFiels, setInvalidFields] = useState("");
  const [invalidFiels2, setInvalidFields2] = useState("");

  // commons
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance0, setDateNaissance] = useState("");
  const [lieuNaissance, setLieuNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motivation, setMotivation] = useState("");
  const [motivation2, setMotivation2] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isNomValid, setNomValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPrenomValid, setPrenomValid] = useState(true);
  const [isDateNaissanceValid, setDateNaissanceValid] = useState(true);
  const [isLieuNaissanceValid, setLieuNaissanceValid] = useState(true);
  const [isAdresseValid, setAdresseValid] = useState(true);
  const [isTelephoneValid, setTelephoneValid] = useState(true);
  const [isMotivationValid, setMotivationValid] = useState(true);
  const [isMotivationValid2, setMotivationValid2] = useState(true);
  const [isSelectedFileValid, setSelectedFileValid] = useState(true);
  const [isSignin, setSignin] = useState(true);
  const [isPDF, setIsPDF] = useState(true);

  // students
  const [etablissement, setEtablissement] = useState("");
  const [filiere, setFiliere] = useState("");
  const [niveau, setNiveau] = useState("");

  const [isEtablissementValid, setEtablissementValid] = useState(true);
  const [isFiliereValid, setFiliereValid] = useState(true);
  const [isNiveauValid, setNiveauValid] = useState(true);

  // workers
  const [lieuService, setLieuService] = useState("");
  const [posteOccupe, setPosteOccupe] = useState("");
  const [experience, setExperience] = useState("");

  const [isLieuServiceValid, setLieuServiceValid] = useState(true);
  const [isPosteOccupeValid, setPosteOccupeValid] = useState(true);
  const [isExperienceValid, setExperienceValid] = useState(true);

  let userId = localStorage.getItem("userId");

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function verifyNumber(str: string): boolean {
    if (str.length !== 9) {
      return false;
    }
    if (str.charAt(0) !== "6") {
      return false;
    }
    for (let i = 0; i < str.length; i++) {
      if (isNaN(parseInt(str.charAt(i)))) {
        return false;
      }
    }
    return true;
  }

  function formatDate(date: string): string {
    let date0 = new Date(date);
    var day = String(date0.getDate()).padStart(2, "0");
    var month = String(date0.getMonth() + 1).padStart(2, "0");
    var year = date0.getFullYear();
    return day + "/" + month + "/" + year;
  }

  const handleNomChange = (event: ChangeEvent<HTMLInputElement>) => {
    let nom = event.target.value;
    setNom(nom);
    setSubmitValid(true);
    setSubmitValid2(true);
    nom.length > 0 ? setNomValid(true) : setNomValid(false);
  };

  const handlePrenomChange = (event: ChangeEvent<HTMLInputElement>) => {
    let prenom = event.target.value;
    setPrenom(prenom);
    setSubmitValid(true);
    setSubmitValid2(true);
    prenom.length > 0 ? setPrenomValid(true) : setPrenomValid(false);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    let date = event.target.value;
    setDateNaissance(date);
    setSubmitValid(true);
    setSubmitValid2(true);
    date.length > 0
      ? setDateNaissanceValid(true)
      : setDateNaissanceValid(false);
  };

  const handleLieuChange = (event: ChangeEvent<HTMLInputElement>) => {
    let lieu = event.target.value;
    setLieuNaissance(lieu);
    setSubmitValid(true);
    setSubmitValid2(true);
    lieu.length > 0
      ? setLieuNaissanceValid(true)
      : setLieuNaissanceValid(false);
  };

  const handleAdresseChange = (event: ChangeEvent<HTMLInputElement>) => {
    let adresse = event.target.value;
    setAdresse(adresse);
    setSubmitValid(true);
    setSubmitValid2(true);
    adresse.length > 0 ? setAdresseValid(true) : setAdresseValid(false);
  };

  const handleTelephoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    let tel = event.target.value;
    setTelephone(tel);
    setSubmitValid(true);
    setSubmitValid2(true);
    tel.length > 0
      ? setTelephoneValid(verifyNumber(tel))
      : setTelephoneValid(verifyNumber(tel));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    let email = event.target.value;
    setEmail(email);
    setSubmitValid(true);
    setSubmitValid2(true);
    setEmailValid(validateEmail(email));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files;
    const maxSize = 1048576; // 1 Mo
    if (
      file &&
      file[0] &&
      (file[0].type !== "application/pdf" || file[0].size > maxSize)
    ) {
      setSelectedFileValid(false);
    } else if (file && file.length > 0) {
      setSelectedFile(file[0]);
      setSelectedFileValid(true);
    } else {
      setSelectedFileValid(false);
      setSelectedFile(null);
    }
  };

  const cvStudentUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      userId
        ? axios
            .post(
              `${ipAdress}/upload-student-cv?userId=${parseInt(userId)}`,
              formData,
              config,
            )
            .then((response) => {})
            .catch((error) => {
              // console.error('Erreur lors de l\'upload du fichier :', error);
              alert("Erreur lors de l'upload du fichier !!!");
            })
        : null;
    }
  };

  const cvWorkerUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      userId
        ? axios
            .post(
              `${ipAdress}/upload-worker-cv?userId=${parseInt(userId)}`,
              formData,
              config,
            )
            .then((response) => {
              console.log("Fichier uploadé avec succès !");
            })
            .catch((error) => {
              console.error("Erreur lors de l'upload du fichier :", error);
            })
        : null;
    }
  };

  const handleEtablissementChange = (event: ChangeEvent<HTMLInputElement>) => {
    let etab = event.target.value;
    setEtablissement(etab);
    // setSubmitValid(true);
    // etab.length > 0 ? setEtablissementValid(true) : setEtablissementValid(false);
  };

  const handleFiliereChange = (event: ChangeEvent<HTMLInputElement>) => {
    let filiere = event.target.value;
    setFiliere(filiere);
    // setSubmitValid(true);
    // filiere.length > 0 ? setFiliereValid(true) : setFiliereValid(false);
  };

  const handleNiveauChange = (event: ChangeEvent<HTMLInputElement>) => {
    let niv = event.target.value;
    setNiveau(niv);
    // setSubmitValid(true);
    // niv.length > 0 ? setNiveauValid(true) : setNiveauValid(false);
  };

  const handleMotivationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let motiv = event.target.value;
    setMotivation(motiv);
    setSubmitValid(true);
    if (motiv.length > 0 && motiv.length < 500) {
      setMotivationValid(true);
    } else {
      setMotivationValid(false);
    }
  };

  const handleLieuServiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    let lieu = event.target.value;
    setLieuService(lieu);
    // setSubmitValid2(true);
    // lieu.length > 0 ? setLieuServiceValid(true) : setLieuServiceValid(false);
  };

  const handlePostOccupeChange = (event: ChangeEvent<HTMLInputElement>) => {
    let po = event.target.value;
    setPosteOccupe(po);
    // setSubmitValid2(true);
    // po.length > 0 ? setPosteOccupeValid(true) : setPosteOccupeValid(false);
  };
  const handleExperienceChange = (event: ChangeEvent<HTMLInputElement>) => {
    let exp = event.target.value;
    setExperience(exp);
    // setSubmitValid2(true);
    // exp.length > 0 ? setExperienceValid(true) : setExperienceValid(false);
  };

  const handleMotivationChange2 = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let motiv = event.target.value;
    setMotivation2(motiv);
    setSubmitValid2(true);
    if (motiv.length > 0 && motiv.length < 500) {
      setMotivationValid2(true);
    } else {
      setMotivationValid2(false);
    }
  };

  const switchToStudent = () => {
    setSelectDefaultForm(false);
    setSelectWorkerForm(false);
    setSelectStudentForm(true);
  };

  const switchToWorker = () => {
    setSelectDefaultForm(false);
    setSelectStudentForm(false);
    setSelectWorkerForm(true);
  };

  const switchToDefault = () => {
    setSelectStudentForm(false);
    setSelectWorkerForm(false);
    setSelectDefaultForm(true);
  };

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleStudentSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (userId) {
      let fields = "";
      if (nom === "") {
        fields = fields + ", first name";
        setNomValid(false);
      }
      if (prenom === "") {
        fields = fields + ", last name";
        setPrenomValid(false);
      }
      if (dateNaissance0 === "") {
        fields = fields + ", birthday";
        setDateNaissanceValid(false);
      }
      if (lieuNaissance === "") {
        fields = fields + ", place of birth";
        setLieuNaissanceValid(false);
      }
      if (adresse === "") {
        fields = fields + ", address";
        setAdresseValid(false);
      }
      if (telephone === "") {
        fields = fields + ", phone number";
        setTelephoneValid(false);
      }
      if (validateEmail(email) === false) {
        fields = fields + ", email";
        setEmailValid(false);
      }

      // if(etablissement === "") {
      //   fields = fields + ', school'
      //   setEtablissementValid(false);
      // }
      // if(filiere === "") {
      //   fields = fields + ', major'
      //   setFiliereValid(false);
      // }
      // if(niveau === "") {
      //   fields = fields + ', level'
      //   setNiveauValid(false);
      // }
      if (selectedFile === null) {
        fields = fields + ", cv";
        setSelectedFileValid(false);
      }

      if (motivation === "") {
        fields = fields + ", motivation";
        setMotivationValid(false);
      }
      if (
        nom === "" ||
        prenom === "" ||
        dateNaissance0 === "" ||
        lieuNaissance === "" ||
        adresse === "" ||
        telephone === "" ||
        validateEmail(email) === false ||
        motivation === "" ||
        selectedFile === null
      ) {
        if (isSignin) {
          setInvalidFields(fields);
          setSubmitValid(false);
        }
      } else {
        let dateNaissance = formatDate(dateNaissance0);
        console.log({
          userId,
          nom,
          prenom,
          dateNaissance,
          lieuNaissance,
          adresse,
          telephone,
          etablissement,
          filiere,
          niveau,
          motivation,
          email,
        });
        userId
          ? axios
              .post(
                `${ipAdress}/generate-student-pdf`,
                {
                  userId,
                  nom,
                  prenom,
                  dateNaissance,
                  lieuNaissance,
                  adresse,
                  telephone,
                  etablissement,
                  filiere,
                  niveau,
                  motivation,
                  email,
                },
                config,
              )
              .then((response) => {
                let data = response.data;
                console.log(data);
                cvStudentUpload();
                window.location.href = "/forms/form-elements";
              })
              .catch((error) => {
                // Traitement des erreurs du serveur
                console.error(error);
              })
          : setSignin(false);
      }
    } else {
      setSignin(false);
    }
  };

  const handleWorkerSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (userId) {
      let fields = "";
      if (nom === "") {
        fields = fields + ", first name";
        setNomValid(false);
      }
      if (prenom === "") {
        fields = fields + ", last name";
        setPrenomValid(false);
      }
      if (dateNaissance0 === "") {
        fields = fields + ", birthday";
        setDateNaissanceValid(false);
      }
      if (lieuNaissance === "") {
        fields = fields + ", place of birth";
        setLieuNaissanceValid(false);
      }
      if (adresse === "") {
        fields = fields + ", address";
        setAdresseValid(false);
      }
      if (telephone === "") {
        fields = fields + ", phone number";
        setTelephoneValid(false);
      }
      if (validateEmail(email) === false) {
        fields = fields + ", email";
        setEmailValid(false);
      }

      // if(lieuService === "") {
      //   fields = fields + ', workerplace'
      //   setEtablissementValid(false);
      // }
      // if(posteOccupe === "") {
      //   fields = fields + ', job'
      //   setFiliereValid(false);
      // }
      // if(experience === "") {
      //   fields = fields + ', experience'
      //   setNiveauValid(false);
      // }

      if (selectedFile === null) {
        fields = fields + ", cv";
        setSelectedFileValid(false);
      }
      if (motivation2 === "") {
        fields = fields + ", motivation";
        setMotivationValid2(false);
      }
      if (
        nom === "" ||
        prenom === "" ||
        dateNaissance0 === "" ||
        lieuNaissance === "" ||
        adresse === "" ||
        telephone === "" ||
        validateEmail(email) === false ||
        motivation2 === "" ||
        selectedFile === null
      ) {
        setInvalidFields2(fields);
        setSubmitValid2(false);
      } else {
        let dateNaissance = formatDate(dateNaissance0);
        console.log(dateNaissance);
        console.log({
          userId,
          nom,
          prenom,
          dateNaissance0,
          lieuNaissance,
          adresse,
          telephone,
          lieuService,
          posteOccupe,
          experience,
          motivation,
          email,
        });
        userId
          ? axios
              .post(
                `${ipAdress}/generate-worker-pdf`,
                {
                  userId,
                  nom,
                  prenom,
                  dateNaissance,
                  lieuNaissance,
                  adresse,
                  telephone,
                  lieuService,
                  posteOccupe,
                  experience,
                  motivation,
                  email,
                },
                config,
              )
              .then((response) => {
                let data = response.data;
                console.log(data);
                cvWorkerUpload();
                window.location.href = "/forms/form-elements";
              })
              .catch((error) => {
                // Traitement des erreurs du serveur
                console.error(error);
              })
          : setSignin(false);
      }
    } else {
      setSignin(false);
    }
  };

  const borderDefault =
    "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary";
  const borderError =
    "w-full rounded border-[1.5px] border-danger bg-transparent px-5 py-3 text-black outline-none transition focus:border-red active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-danger dark:bg-form-input dark:text-white dark:focus:border-red";
  useEffect(() => {
    // Init flatpickr
    flatpickr(".form-datepicker", {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M j, Y",
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb page2="Your informations" page1="Form" />

      {/* <div className="grid grid-cols-1 gap-9 sm:grid-cols-2"> */}
      {selectDefaultForm && (
        <div className="col-span-12 xl:col-span-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form onSubmit={handleStudentSubmit} action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      First name
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <input
                      value={nom}
                      onBlur={handleNomChange}
                      onChange={handleNomChange}
                      type="text"
                      placeholder="Enter your first name"
                      className={isNomValid ? borderDefault : borderError}
                    />
                    {!isNomValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid first name.
                      </span>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last name
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <input
                      value={prenom}
                      onBlur={handlePrenomChange}
                      onChange={handlePrenomChange}
                      type="text"
                      placeholder="Enter your first name"
                      className={isPrenomValid ? borderDefault : borderError}
                    />
                    {!isPrenomValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid first name.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Date
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={dateNaissance0}
                        onBlur={handleDateChange}
                        onChange={handleDateChange}
                        className={
                          isDateNaissanceValid ? borderDefault : borderError
                        }
                        data-class="flatpickr-right"
                      />
                    </div>
                    {!isDateNaissanceValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid birthday.
                      </span>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Place of birth
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <input
                      value={lieuNaissance}
                      onBlur={handleLieuChange}
                      onChange={handleLieuChange}
                      type="text"
                      placeholder="Enter your place of birth"
                      className={
                        isLieuNaissanceValid ? borderDefault : borderError
                      }
                    />
                    {!isLieuNaissanceValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid place of birth.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Mail address
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <input
                      value={email}
                      onBlur={handleEmailChange}
                      onChange={handleEmailChange}
                      type="text"
                      placeholder="Enter your eamil"
                      className={isEmailValid ? borderDefault : borderError}
                    />
                    {!isEmailValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid email.
                      </span>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Localisation (home)
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <input
                      value={adresse}
                      onBlur={handleAdresseChange}
                      onChange={handleAdresseChange}
                      type="text"
                      placeholder="Enter your address"
                      className={isAdresseValid ? borderDefault : borderError}
                    />
                    {!isAdresseValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid address.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone number
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <input
                      value={telephone}
                      onBlur={handleTelephoneChange}
                      onChange={handleTelephoneChange}
                      type="number"
                      placeholder="Enter your phone number"
                      className={isTelephoneValid ? borderDefault : borderError}
                    />
                    {!isTelephoneValid && (
                      <span className="mt-1 text-sm text-red">
                        please enter a valid 9-digit telephone number starting
                        with the number 6
                      </span>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      CV
                      <b>
                        <span className="text-red">*</span>
                      </b>
                    </label>
                    <input
                      onBlur={handleFileChange}
                      onChange={handleFileChange}
                      type="file"
                      // placeholder="upload your cv"
                      className={isTelephoneValid ? borderDefault : borderError}
                    />
                    {!isSelectedFileValid && (
                      <span className="mt-1 text-sm text-red">
                        please enter a valid <b>PDF</b> file, less than 1 Mo.
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-20">
                  <button
                    onClick={switchToStudent}
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 xl:min-w-50"
                  >
                    Student
                  </button>
                  <button
                    onClick={switchToWorker}
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 xl:min-w-50"
                  >
                    Worker
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectStudentForm && (
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Academic profile
              </h3>
            </div>
            <form onSubmit={handleStudentSubmit} action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      School
                    </label>
                    <input
                      value={etablissement}
                      onBlur={handleEtablissementChange}
                      onChange={handleEtablissementChange}
                      type="text"
                      placeholder="Enter your actual school"
                      className={
                        isEtablissementValid ? borderDefault : borderError
                      }
                    />
                    {!isEtablissementValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid school.
                      </span>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Major
                    </label>
                    <input
                      value={filiere}
                      onBlur={handleFiliereChange}
                      onChange={handleFiliereChange}
                      type="text"
                      placeholder="Enter your actual major"
                      className={isFiliereValid ? borderDefault : borderError}
                    />
                    {!isFiliereValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid major.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Level
                    </label>
                    <input
                      value={niveau}
                      onBlur={handleNiveauChange}
                      onChange={handleNiveauChange}
                      type="text"
                      placeholder="Enter your actual level"
                      className={isNiveauValid ? borderDefault : borderError}
                    />
                    {!isNiveauValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid level.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Motivation
                    <b>
                      <span className="text-red">*</span>
                    </b>
                  </label>
                  <textarea
                    value={motivation}
                    onBlur={handleMotivationChange}
                    onChange={handleMotivationChange}
                    rows={6}
                    placeholder="Type your message"
                    className={isMotivationValid ? borderDefault : borderError}
                  ></textarea>
                  {!isMotivationValid && (
                    <span className="mt-1 text-sm text-red">
                      please enter a valid motivation of 500 characters maximum
                    </span>
                  )}
                </div>

                <div className="flex justify-center gap-20">
                  <button
                    onClick={switchToDefault}
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 xl:min-w-50"
                  >
                    Go back
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 xl:min-w-50"
                  >
                    Submit
                  </button>
                </div>
                {!isSubmitValid && (
                  <div className="flex justify-center gap-20">
                    <span className="mt-1 text-sm text-red">
                      Please go back to fields {invalidFiels}.
                    </span>
                  </div>
                )}
                {!isSignin && (
                  <div className="flex justify-center gap-20">
                    <span className="mt-1 text-sm text-red">
                      Please login first.
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {selectWorkerForm && (
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Worker profile
              </h3>
            </div>
            <form onSubmit={handleWorkerSubmit} action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Workplace
                    </label>
                    <input
                      value={lieuService}
                      onBlur={handleLieuServiceChange}
                      onChange={handleLieuServiceChange}
                      type="text"
                      placeholder="Enter your actual workplace"
                      className={
                        isLieuServiceValid ? borderDefault : borderError
                      }
                    />
                    {!isLieuServiceValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid workplace.
                      </span>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Job
                    </label>
                    <input
                      value={posteOccupe}
                      onBlur={handlePostOccupeChange}
                      onChange={handlePostOccupeChange}
                      type="text"
                      placeholder="Enter your actual job"
                      className={
                        isPosteOccupeValid ? borderDefault : borderError
                      }
                    />
                    {!isPosteOccupeValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid job.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Experience
                    </label>
                    <input
                      value={experience}
                      onBlur={handleExperienceChange}
                      onChange={handleExperienceChange}
                      type="text"
                      placeholder="Enter your experience"
                      className={
                        isExperienceValid ? borderDefault : borderError
                      }
                    />
                    {!isExperienceValid && (
                      <span className="mt-1 text-sm text-red">
                        Please enter a valid experience.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Motivation
                    <b>
                      <span className="text-red">*</span>
                    </b>
                  </label>
                  <textarea
                    value={motivation2}
                    onBlur={handleMotivationChange2}
                    onChange={handleMotivationChange2}
                    rows={6}
                    placeholder="Type your message"
                    className={isMotivationValid2 ? borderDefault : borderError}
                  ></textarea>
                  {!isMotivationValid2 && (
                    <span className="mt-1 text-sm text-red">
                      Please enter a valid motivation.
                    </span>
                  )}
                </div>

                <div className="flex justify-center gap-20">
                  <button
                    onClick={switchToDefault}
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 xl:min-w-50"
                  >
                    Go back
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 xl:min-w-50"
                  >
                    Submit
                  </button>
                </div>
                {!isSubmitValid2 && (
                  <div className="flex justify-center gap-20">
                    <span className="mt-1 text-sm text-red">
                      Please go back to fields {invalidFiels2}.
                    </span>
                  </div>
                )}
                {!isSignin && (
                  <div className="flex justify-center gap-20">
                    <span className="mt-1 text-sm text-red">
                      Please login first.
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default FormLayout;
