import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import Zoom from "react-reveal/Zoom";
import { Close } from "../iconComponents/icons";
import Image from "next/image";
import Success from "../../styles/assets/images/success.png";
import { SpinnerCircular } from "spinners-react";
import axios from "axios";

// -----> Css
import main_css from "./renderCategories.module.css";

const RenderCatigories = ({ lan }) => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [find, setFind] = useState({});
  const [post, setPost] = useState("");
  const [datas, setDatas] = useState({
    isLoading: true,
    isError: false,
    data: {},
  });

  // ----- Input Validation
  const [styled, setStyled] = useState({});
  const [stylede, setStylede] = useState({});
  const [styles, setStyles] = useState({});
  const [err, setErr] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAdr, setErrAdr] = useState("");
  const [forVal, setForval] = useState("");
  const [numval, setNumval] = useState("");
  const [text, setText] = useState("");
  const [address, setAddress] = useState("");

  const Recommended = 1;
  const NotAvailable = 2;
  const Discount = 3;
  const pust = 4;

  let production = "https://market-index.herokuapp.com";

  // ----- CloseModal
  function closeModal() {
    setShowModal(!showModal);
  }

  // ----- Find data
  const handleBtn = (id) => {
    setShowModal(true);
    const elFinded = datas.data.find((e) => e.id === id);
    setFind(elFinded);
  };

  // ----- Categories
  useEffect(() => {
    axios
      .get(`${production}/api/home/category`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [categories, production]);

  // ----- Product
  useEffect(() => {
    axios
      .get(`${production}/api/home/product`)
      .then((res) => {
        setDatas({
          ...datas,
          isLoading: false,
          data: res.data.data,
        });
      })
      .catch((err) =>
        setDatas({
          ...datas,
          isLoading: false,
          isError: true,
        })
      );
  }, [datas, production]);

  // ----- Post
  const formPost = async (evt) => {
    evt.preventDefault();
    // ----- Axios
    await axios
      .post(`${production}/api/home/order`, {
        productId: find.id,
        name: evt.target.name.value.trim(),
        phoneNumber: evt.target.password.value.trim(),
        address: evt.target.address.value.trim(),
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
    setAddress("");
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

  const changeNameHandle = (e) => {
    let elInputName = e.target.name;
    let elInputValue = e.target.value;
    let a = { [elInputName]: elInputValue };
    let style = {};
    setAddress(e.target.value.replace(/[^a-zA-Z]/gi, ""));

    if (a[elInputName] === "") {
      style = {
        border: "2px solid red",
      };

      setErrAdr("Вы не ввели свое имя");
    } else {
      style = {
        border: "2px solid #02db26",
      };

      setErrAdr("");
    }

    setStyles(style);
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

  // ----- PutDotNumber
  function FormatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      {datas.isLoading && (
        <div className="flex justify-center mx-auto my-6">
          <SpinnerCircular size={80} color="black" speed={200} />
        </div>
      )}
      {categories.length > 0 &&
        categories?.map((category) => (
          <div key={category.id}>
            <div
              id={category.name_ru || category.name_uz}
              className="title w-full h-12 md:h-[100px] bg-green-main flex items-center justify-center shadow-dropShadow"
            >
              <h1 className="font-bold text-white text-[20px] md:text-5xl tracking-[2px]">
                {lan ? category.name_ru : category.name_uz}
              </h1>
            </div>
            <div className="max-w-[1180px] w-full mx-auto px-[20px] mt-[24px]  mb-[30px]">
              <ul className="flex items-center justify-center md:justify-between flex-wrap py-[40px] gap-y-[44px]">
                {datas.data.length > 0 &&
                  datas.data.map(
                    (item) =>
                      category.name_ru == item.category_name_ru && (
                        <Fade key={item.id} bottom>
                          <li
                            className={`${main_css.item} relative max-w-[300px] h-[260px] md:max-w-[340px] md:h-[300px] bg-white px-5 pb-5 mx-2 shadow-cardShadow rounded-cardRadius`}
                          >
                            <div className={`${main_css.card} pt-[40px]`}>
                              <p
                                className={`${main_css.card__status} ${
                                  item.status_id === Recommended
                                    ? `bg-green-recommend px-[30px] py-[2px]`
                                    : ""
                                } ${
                                  item.status_id === NotAvailable
                                    ? `bg-[#FFE600] px-[30px] py-[2px]`
                                    : ""
                                } ${
                                  item.status_id === Discount
                                    ? `bg-[#f44336] px-[30px] py-[2px]`
                                    : ""
                                }  ${
                                  item.status_id === pust ? `p-0` : ""
                                } absolute top-0 left-0 font-medium text-[13px] md:text-[15px] tracking-[1px] text-white shadow-labelShadow`}
                              >
                                {lan ? item.status_ru : item.status_uz}
                              </p>
                              <h2 className="font-bold text-sm md:text-[20px] text-[#009398] text-center py-1">
                                {lan
                                  ? item.category_name_ru
                                  : item.category_name_uz}
                              </h2>
                              <Image
                                className={`${main_css.card__img} object-cover`}
                                width={313}
                                height={154}
                                src={item.image}
                                aria-hidden
                                alt="Karkacniy basseyn"
                              />
                              <div className="flex items-center justify-between w-full md:w-[96%] mx-auto">
                                <div className="">
                                  <p
                                    className={`${main_css.price} relative text-xs md:text-base`}
                                  >
                                    {FormatNumber(item.price)}
                                    {lan ? "сум" : "sum"}
                                  </p>
                                  <h3 className="text-center font-bold text-base md:text-xl">
                                    {FormatNumber(item.sale_price)}
                                    {lan ? "сум" : "sum"}
                                  </h3>
                                </div>
                                <button
                                  onClick={() => handleBtn(item.id)}
                                  className={`${main_css.card__btn} ${
                                    item.status_id === 3 ? `hidden` : ""
                                  } font-semibold text-[14px] px-5 py-[4px] bg-yellow-btn rounded-btnRadius shadow-labelShadow`}
                                >
                                  {lan ? "Заказать" : "Buyurtma berish"}
                                </button>
                              </div>
                            </div>
                          </li>
                        </Fade>
                      )
                  )}
              </ul>
            </div>
          </div>
        ))}

      {/* ----- Modal ----- */}
      {showModal ? (
        <>
          <Zoom>
            <div className="flex items-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none mx-8">
              <div className="relative my-6 mx-auto max-w-[700px] w-full z-50">
                {/*content*/}
                <div className="border-0 rounded-[25px] shadow-lg relative flex flex-col w-full bg-[#F8F8F8] outline-none focus:outline-none px-3 md:px-0">
                  {/*header*/}
                  <div className="flex items-start justify-between px-0 md:px-4 pt-2 rounded-t">
                    <button
                      className="p-1 ml-auto text-black float-right leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => closeModal(setPost(""))}
                    >
                      <Close />
                    </button>
                  </div>
                  {/*body*/}
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
                            ? " Ваш заказ успешно оформлен. Мь свяжемся с вами вближайшее время."
                            : "Buyurtmangiz muvaffaqiyatli ro’yxatdan o’tdi. Yaqin vaqt oralig’ida siz bilan bog’lanamiz"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="md:flex items-center justify-center mx-auto md:mx-0 md:justify-between md:px-10 md:pb-10">
                      <div className="flex flex-col">
                        <div
                          className={`${main_css.modalLeft} max-w-[315px] md:max-h-[372px] bg-white mx-5`}
                        >
                          <h2 className="font-bold text-[20px] text-[#009398] text-center">
                            {lan
                              ? find.category_name_ru
                              : find.category_name_uz}
                          </h2>
                          <Image
                            className="w-[313px] h-[153px]"
                            src={find.image}
                            alt="rasm"
                            width={313}
                            height={153}
                          />
                        </div>
                        <p className="font-bold text-center text-xl mt-3">
                          {FormatNumber(find.sale_price)} {lan ? "cyм" : "sum"}
                        </p>
                      </div>
                      <div className="w-full md:max-w-[210px] md:ml-[20px] py-5 md:py-8">
                        <form
                          autoComplete="off"
                          onSubmit={formPost}
                          className=" relative space-y-5 md:space-y-5 mt-4 md:mt-0 mx-auto flex flex-col justify-center"
                        >
                          <input
                            name="name"
                            className="font-light focus:outline-none focus:border-stone-600 border-[2px] focus:shadow-lg w-[90%] md:w-full mx-auto px-3 py-[6px] rounded-[14px]"
                            type="text"
                            placeholder={lan ? "Ваше имя" : "Ismingiz"}
                            required
                            minLength={5}
                            maxLength={20}
                            onChange={(e) => changeNameHandler(e)}
                            onFocus={(e) => changeNameHandler(e)}
                            style={styled}
                            value={text}
                          />
                          <span className="text-xs text-red-600 pl-2 absolute left-4 md:left-0 top-[22px] lg:top-5">
                            {err}
                          </span>
                          <input
                            name="password"
                            className="font-light focus:outline-none focus:border-stone-600 border-[2px] focus:shadow-lg w-[90%] md:w-full mx-auto px-3 py-[6px] rounded-[14px]"
                            type="tel"
                            placeholder={lan ? "Ваш номер" : "Raqamingiz"}
                            defaultValue={"+998"}
                            required
                            maxLength={17}
                            value={numval}
                            onChange={(e) => {
                              formatPhoneNumber(e.target.value),
                                CantrolPhoneNumber(e.target.value);
                            }}
                            onFocus={(e) => {
                              onfocusPhoneNumber(e.target.value);
                            }}
                            style={stylede}
                          />
                          <span className="text-xs text-red-600 pl-2 absolute bottom-16 left-4 md:left-0 top-20">
                            {errPassword}
                          </span>
                          <input
                            name="address"
                            className="font-light focus:outline-none focus:border-stone-600 border-[2px] focus:shadow-lg w-[90%] md:w-full mx-auto px-3 py-[6px] rounded-[14px]"
                            placeholder={lan ? "Ваше адрес" : "Manzilingiz"}
                            type="text"
                            minLength={5}
                            maxLength={30}
                            onChange={(e) => changeNameHandle(e)}
                            onFocus={(e) => changeNameHandle(e)}
                            style={styles}
                            required
                            value={address}
                          />
                          <span className="text-xs text-red-600 pl-2 absolute left-4 md:left-1 bottom-[43px] md:top-[140px]">
                            {errAdr}
                          </span>
                          <button
                            className="w-[70%] md:w-full mx-auto font-semibold text-sm border rounded-[10px] px-10 py-2 pb-2 bg-yellow-btn tracking-[1px] shadow-xl"
                            type="submit"
                          >
                            {lan ? "Заказать" : "Buyurtma berish"}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Zoom>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default RenderCatigories;
