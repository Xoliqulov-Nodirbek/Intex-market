import Image from "next/image";
import { useState } from "react";
import { Close } from "../iconComponents/icons";
import Admin from "../../styles/assets/images/admist.png";
import Success from "../../styles/assets/images/success.png";
import Zoom from "react-reveal/Zoom";
import axios from "axios";

const Deliveries = ({ lan }) => {
  const [showModal, setShowModal] = useState(false);
  const [styled, setStyled] = useState({});
  const [stylede, setStylede] = useState({});
  const [err, setErr] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [post, setPost] = useState("");
  const [forVal, setForval] = useState("");
  const [numval, setNumval] = useState("");
  const [text, setText] = useState("");

  let production = "http://31.44.6.77:5555";

  // ----- CloseModal
  function closeModal() {
    setShowModal(!showModal);
  }

  // ----- Post
  const PostForm = async (evt) => {
    evt.preventDefault();

    // ----- Axios
    await axios
      .post(`${production}/api/home/consultation`, {
        name: evt.target.text.value.trim(),
        phoneNumber: evt.target.password.value.trim(),
      })
      .then((res) => setPost(res.statusText))
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          closeModal();
          setPost("");
        }, 2000)
      );
      setText("");
      setNumval("");
  };

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

    let result = a.map((x) => {
      return parseInt(x, 10);
    });
    console.log(result);

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
      <div className="bg-[#009398] py-6">
        <div className="max-w-[90%] lg:max-w-[70%] xl:max-w-[60%] mx-auto">
          <h2 className="font-bold text-3xl md:text-5xl text-white text-center tracking-[1px]">
            {lan ? "Бесплатная доставка" : "Tekin yetkazib berish"}
          </h2>
          <p className="font-normal text-sm md:text-[23px] text-center text-white my-3 md:my-5 leading-4 lg:leading-6">
            {lan
              ? "Бесплатная доставка осуществляется в пределах города Ташкент (за пределами города доставка оплачивается отдельно)"
              : "Toshkent shahri ichida yetkazib berish bepul (shahar tashqarisida yetkazib berish alohida to'lanadi)"}
          </p>
          <button
            className="block mx-auto rounded-[20px] bg-[#ffe600] hover:bg-[#e8d319] font-semibold shadow-xl px-6 md:px-10 py-1 md:py-2"
            onClick={() => setShowModal(!showModal)}
            type="button"
          >
            {lan ? "Оформить заказ" : "Buyurtma berish"}
          </button>
        </div>

        {/* ----- Modal ----- */}

        {showModal ? (
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
                          onClick={() => setShowModal(!showModal)}
                        >
                          <Close />
                        </button>
                      </div>
                    </div>
                    {post === "Created" ? (
                      <>
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
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <Image
                          className="object-contain"
                          src={Admin}
                          alt="Admistrator image"
                          width={120}
                          height={130}
                        />
                        <h2 className="font-bold text-[28px] leading-7 mx-2 my-3 text-center text-black opacity-50">
                          {lan
                            ? "Получить консультацию"
                            : "Konsultatsiya olish"}
                        </h2>
                        <form
                          name="form"
                          autoComplete="off"
                          onSubmit={PostForm}
                          className="space-y-6 w-[70%] mx-auto flex flex-col justify-center py-5 md:py-8 relative"
                        >
                          <input
                            className=" font-light focus:outline-none focus:border-stone-600 border-[2px] focus:shadow-lg w-full px-3 py-2 rounded-[14px] bg-white"
                            placeholder={lan ? "Ваше имя" : "Ismingiz"}
                            type="text"
                            name="text"
                            minLength={5}
                            maxLength={30}
                            onChange={(e) => changeNameHandler(e)}
                            onFocus={(e) => changeNameHandler(e)}
                            style={styled}
                            value={text}
                            required
                          />
                          <span className="text-xs text-red-600 pl-2 absolute top-10 md:top-14 ">
                            {err}
                          </span>
                          <input
                            className="font-light focus:outline-none focus:border-stone-600 border-[2px] focus:shadow-lg w-full px-3 py-2 rounded-[14px] bg-white"
                            placeholder={lan ? "Ваше номер" : "Raqamingiz"}
                            type="text"
                            value={numval}
                            name="password"
                            maxLength={17}
                            onChange={(e) => {
                              formatPhoneNumber(e.target.value),
                                CantrolPhoneNumber(e.target.value);
                            }}
                            onFocus={(e) => {
                              onfocusPhoneNumber(e.target.value);
                            }}
                            style={stylede}
                            required
                          />
                          <span className="text-xs text-red-600 pl-2 absolute bottom-16 md:top-[120px] ">
                            {errPassword}
                          </span>
                          <button
                            className="w-[80%] font-bold text-[14px] border rounded-[10px] mx-auto px-10 pt-2 pb-2 bg-yellow-btn tracking-[1px] shadow-xl"
                            type="submit"
                          >
                            {lan ? "Заказать" : "Buyurtma berish"}
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Zoom>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Deliveries;
