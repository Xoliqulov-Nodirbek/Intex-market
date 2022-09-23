import Image from "next/image";
import Link from "next/link";
import Zoom from "react-reveal/Zoom";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/Ai";
import { IoIosCall } from "react-icons/io";
import { Close } from "../iconComponents/icons";
import Success from "../../styles/assets/images/success.png";
import styles from "./footer.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Footer = ({ lan }) => {
  const [showModal, setShowModal] = useState(false);
  const [styled, setStyled] = useState({});
  const [stylede, setStylede] = useState({});
  const [err, setErr] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [info, setInfo] = useState([]);
  const [post, setPost] = useState("");
  const [text, setText] = useState("");
  const [forVal, setForval] = useState("");
  const [numval, setNumval] = useState("");

  let production = "https://market-index.herokuapp.com";

  // ----- Site Informations
  useEffect(() => {
    axios
      .get(`${production}/api/home/site`)
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [info, production]);

  function closeModal() {
    setShowModal(!showModal);
  }

  const postForm = async (evt) => {
    evt.preventDefault();
    // ----- Axios
    await axios
      .post(`${production}/api/home/consultation`, {
        name: evt.target.text.value.trim(),
        phoneNumber: evt.target.telefon.value.trim(),
      })
      .then((res) => {
        setPost(res.statusText);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPost("");
        closeModal();
      });
      setText(""); 
      setNumval("");
  };

  // ----- Input Validation
  const changeNameHandler = (e) => {
    let elInputName = e.target.name;
    let elInputValue = e.target.value;
    let a = { [elInputName]: elInputValue };
    let style = {};
    setText(e.target.value.replace(/[^a-zA-Z]/gi, ""));

    if (a[elInputName] === "") {
      style = {
        border: "2px solid red",
      };

      setErr("Вы не ввели свое имя");
    } else {
      style = {
        border: "2px solid #02db26",
      };

      setErr("");
    }

    setStyled(style);
  };

  const onfocusPhoneNumber = (number) => {
    if (number === "") {
      setNumval(`+998 `);
    } else {
      setNumval(numval);
    }
  };

  const CantrolPhoneNumber = (number) => {
    let a = [...number];
    console.log(a);
    let stylee = {};
    if (number.length < 16) {
      stylee = {
        border: "2px solid red",
      };
      setErrPassword("Ошибка номера телефона");
    } else {
      stylee = {
        border: "2px solid #02db26",
      };
      setErrPassword("");
    }

    setStylede(stylee);

    let arrNumber = number.split(" ").join("").split("");

    if (arrNumber.length < 5) {
      setNumval(number);
      return;
    }

    let justBaseNumber = [];

    if (arrNumber.slice(0, 4).join("") === "+998") {
      justBaseNumber = arrNumber.slice(4, arrNumber.length);
    } else if (arrNumber.slice(0, 3).join("") === "+99") {
      justBaseNumber = arrNumber.slice(3, arrNumber.length);
    } else if (arrNumber.slice(0, 2).join("") === "+9") {
      justBaseNumber = arrNumber.slice(2, arrNumber.length);
    } else if (arrNumber.slice(0, 1).join("") === "+") {
      justBaseNumber = arrNumber.slice(1, arrNumber.length);
    } else {
      justBaseNumber = arrNumber.slice(0, arrNumber.length);
    }

    let newNumber = `+998 `;

    for (let i = 0; i < justBaseNumber.length; i++) {
      if (i === 2 || i === 5 || i === 7) {
        newNumber += ` ${justBaseNumber[i]}`;
      } else {
        newNumber += `${justBaseNumber[i]}`;
      }
    }
    setNumval(newNumber);
  };

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    setForval(phoneNumber);
  }

  return (
    <>
      <div className="w-full bg-green-main p-0 lg:p-6 sm:px-20 md:px-24  ">
        <div className="container lg:max-w-[1180px] w-full mx-auto h-full ">
          <div className="flex flex-col lg:flex-row justify-between pt-3">
            <div className=" flex flex-col items-center h-full ">
              <h3 className=" text-xl sm:text-2xl lg:text-xl xl:text-2xl font-semibold text-white text-center max-w-[270px] sm:max-w-none lg:max-w-xs  ">
                {lan
                  ? "Получить бесплатную консультацию"
                  : "Bepul konsultatsiya yordami uchun"}
              </h3>
              <form
                autoComplete="off"
                onSubmit={postForm}
                className=" flex flex-col items-center gap-5 pt-4 "
              >
                <div className="flex flex-col gap-1 relative">
                  <input
                    style={styled}
                    onChange={(e) => changeNameHandler(e)}
                    onFocus={(e) => changeNameHandler(e)}
                    required
                    className=" px-2 py-1.5 rounded-lg w-64  sm:w-96 lg:w-80 xl:w-96 outline-none focus:outline-none focus:border-stone-600 border-[2px] focus:shadow-lg"
                    type="text"
                    name="text"
                    placeholder={lan ? "Ваше имя" : "Ismingiz"}
                    aria-label={lan ? "Ваше имя" : "Ismingiz"}
                    minLength={5}
                    maxLength={30}
                    value={text}
                  />
                  <span className="text-xs text-red-600 pl-2 absolute -bottom-4">
                    {err}
                  </span>
                </div>

                <div className="flex flex-col gap-1 relative">
                  <input
                    style={stylede}
                    onChange={(e) => {
                      formatPhoneNumber(e.target.value),
                      CantrolPhoneNumber(e.target.value);
                    }}
                    onFocus={(e) => {
                      onfocusPhoneNumber(e.target.value);
                    }}
                    required
                    value={numval}
                    className="px-2 py-1.5 rounded-lg w-64 sm:w-96 lg:w-80 xl:w-96 outline-none focus:outline-none focus:border-stone-600 border-[2px] focus:shadow-lg"
                    type="text"
                    name="telefon"
                    maxLength={17}
                    placeholder={lan ? "Ваше номер" : "Raqamingiz"}
                    aria-label={lan ? "Ваше номер" : "Raqamingiz"}
                  />
                  <span className="text-xs text-red-600 pl-2 absolute -bottom-4">
                    {errPassword}
                  </span>
                </div>

                <button
                  type="submit"
                  className=" w-40 sm:w-56 lg:w-48 xl:w-56 h-7 md:h-8 lg:h-9 text-[10px] font-semibold sm:text-xs  bg-yellow-btn rounded-lg shadow-cardShadow"
                >
                  {lan ? "Хочу проконсультироваться" : "Konsultatsiya olish"}
                </button>
              </form>
            </div>

            {info.length > 0 &&
              info?.map((link, id) => (
                <div
                  key={id}
                  className="flex justify-between py-5 px-10 sm:px-0 lg:pt-0 lg:w-[60%] xl:w-[58%]"
                >
                  <div className="sm:text-lg md:text-xl lg:text-lg xl:text-xl text-white max-w-xs flex flex-col">
                    <h3 className={`${styles.clock} flex items-center`}>
                      {lan ? "Рабочее время" : "Ish vaqti"}
                    </h3>
                    <div className="mt-3">
                      <h2>{lan ? link.work_time_ru : link.work_time_uz}</h2>
                    </div>
                    <div className="flex pt-4 gap-2 md:gap-4">
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={link.telegram_link}
                        className=" w-7 h-7 md:w-9 md:h-9 xl:w-11 xl:h-11 bg-white rounded-md flex items-center justify-center shadow-dropShadow cursor-pointer"
                      >
                        <FaTelegramPlane className="w-4 h-4 md:w-6 md:h-6 text-green-main " />
                      </a>

                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={link.instagram_link}
                        className="w-7 h-7 md:w-9 md:h-9 xl:w-11 xl:h-11 bg-white rounded-md flex items-center shadow-dropShadow justify-center cursor-pointer"
                      >
                        <AiFillInstagram className="w-4 h-4 md:w-6 md:h-6 text-green-main" />
                      </a>

                      <a
                        href={`tel:${link.phone_number}`}
                        className="w-7 h-7 md:w-9 md:h-9 xl:w-11 xl:h-11 bg-white rounded-md flex items-center justify-center shadow-dropShadow cursor-pointer"
                      >
                        <IoIosCall className="w-4 h-4 md:w-6 md:h-6 text-green-main" />
                      </a>
                    </div>
                  </div>
                  <div className="sm:text-lg md:text-xl lg:text-lg xl:text-xl text-white flex flex-col ml-5">
                    <div>
                      <div>
                        <strong className="block font-normal text-2xl">
                          Intex.uz
                        </strong>
                        <Link href={`tel:${link.phone_number}`}>
                          <a>{link.phone_number}</a>
                        </Link>
                        <address className="not-italic">
                          {lan ? link.address_ru : link.address_uz}
                        </address>
                      </div>
                      <p className=" text-xs sm:text-xl pt-2 sm:pt-8">
                        {lan
                          ? "Разработано в Support Solutions Все права защищены."
                          : "Support Solutions tomonidan ishlab chiqilgan Barcha huquqlar himoyalangan."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ----- Modal ----- */}
      {showModal &&
      setTimeout(() => {
        setShowModal(!showModal);
      }, 2000) ? (
        <>
          <Zoom>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-5">
              <div className="relative max-w-[420px] w-full my-6 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex justify-end px-4 pt-3  rounded-t">
                    <div className="">
                      <button
                        className="p-0 ml-auto text-black float-right leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(!showModal) + setPost("")}
                      >
                        <Close />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col mx-auto">
                    <Image
                      className=" object-contain"
                      src={Success}
                      width={180}
                      height={180}
                      alt="Image"
                    />
                    <h2 className="font-bold text-3xl md:text-4xl text-center my-4 md:my-6 opacity-70">
                      {lan ? "Спасибо!" : "Raxmat!"}
                    </h2>
                    <p className="w-[70%] mx-auto font-normal text-base md:text-xl text-center mb-6 md:mb-8">
                      {lan
                        ? "Ваш заказ успешно оформлен. Мь свяжемся с вами в ближайшее время."
                        : "Buyurtmangiz muvaffaqiyatli ro’yxatdan o’tdi. Yaqin vaqt oralig’ida siz bilan bog’lanamiz"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Footer;
