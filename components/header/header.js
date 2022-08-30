import { useState, useEffect } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/Ai";
import { IoIosCall } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { SpinnerCircular } from "spinners-react";
import Modal from "@mui/material/Modal";
import styles from "./header.module.css";
import axios from "axios";

const Header = ({ lan, setLan }) => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    isLoading: true,
    action: {},
  });

  let production = "http://31.44.6.77:5555";

  // ----- CloseMenu
  const handleClick = () => {
    setOpen(!open);
  };

  // ----- CloseModal
  const closeModal = () => {
    setOpen(false);
  };

  // ----- Site_links
  useEffect(() => {
    axios
      .get(`${production}/api/home/site`)
      .then((res) =>
        setInfo({
          isLoading: false,
          action: res.data.data,
        })
      )
      .catch((err) => console.log(err));
  }, [info, production]);

  // ----- Categories
  useEffect(() => {
    axios
      .get(`${production}/api/home/category`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [categories, production]);

  // ----- Change Language
  const ChangeLan = () => {
    setLan(!lan);
  };

  return (
    <>
      <div className="h-[74px] bg-green-main px-4 md:px-16 sticky top-0 z-50 shadow-2xl ">
        <div className="max-w-[1300px] w-full mx-auto h-full flex items-center justify-between">
          <div>
            <Link href="#">
              <a className="text-base md:text-2xl font-bold leading-8 text-white cursor-pointer">
                INTEX-MARKET.UZ
              </a>
            </Link>
          </div>
          <ul
            className={`${
              categories.length > 3
                ? `hidden xl:flex items-center space-x-[32px] overflow-x-scroll max-w-[600px] w-full mx-auto`
                : `hidden xl:flex items-center space-x-[32px]`
            } `}
          >
            {categories.length > 0 &&
              categories?.map((item) => (
                <li
                  key={item.id}
                  className={`${styles.nav__item} text-lg text-white font-bold cursor-pointe whitespace-nowrap`}
                >
                  <a
                    href={`#${item.name_ru || item.name_uz}`}
                    className={`${styles.nav__link} tracking-widest px-3 py-4`}
                  >
                    {lan ? item.name_ru : item.name_uz}
                  </a>
                </li>
              ))}
          </ul>

          {info.isLoading ? (
            <div className="mx-auto ">
              <SpinnerCircular size={40} color="#fff" speed={200} />
            </div>
          ) : (
            info.action?.map((e, id) => (
              <div key={id} className="flex items-center gap-2">
                <Link href="tel:901288182">
                  <a className="hidden 2xl:block font-normal text-[16px] text-white tracking-[1px] mt-[4px]">
                    {e?.phone_number}
                  </a>
                </Link>
                <div className="flex gap-2 ml-3">
                  <Link href={e?.telegram_link}>
                    <a
                      className={`${styles.telegram} w-6 h-6 md:w-8 md:h-8 bg-slate-200 rounded-md items-center justify-center cursor-pointer`}
                      target="_blank"
                    ></a>
                  </Link>
                  <Link href={e?.instagram_link}>
                    <a
                      className={`${styles.instagram} inline-block w-6 h-6 md:w-8 md:h-8 bg-slate-200 rounded-md items-center justify-center cursor-pointer`}
                      target="_blank"
                    ></a>
                  </Link>
                  <button
                    className={`${styles.language} bg-white font-medium text-green-main text-sm xl:text-base`}
                    onClick={ChangeLan}
                    type="button"
                  >
                    {lan ? "UZ" : "RU"}
                  </button>
                </div>
                {/* hamburger */}
                <div className="xl:hidden" onClick={handleClick}>
                  {open ? (
                    <FiX className="w-7 h-7 text-white ml-1 cursor-pointer" />
                  ) : (
                    <FiMenu className="w-7 h-7 text-white ml-1 cursor-pointer" />
                  )}
                </div>
              </div>
            ))
          )}

          {/* ---- Responsive ---- */}
          <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={
              open ? "left-0 transition-all" : "-left-full transition-all"
            }
          >
            <div
              className={
                open
                  ? " h-full w-64 md:w-80 lg:w-96 bg-green-main absolute top-0 flex flex-col items-center "
                  : "h-screen w-64 bg-green-main absolute top-0"
              }
            >
              <Link href="#">
                <a className="text-xl text-white mt-4 font-bold">
                  INTEX-MARKET.UZ
                </a>
              </Link>

              <ul
                className={`${
                  categories.length > 5
                    ? `mt-12 flex flex-col gap-8 overflow-y-scroll`
                    : `mt-12 flex flex-col gap-8`
                }`}
              >
                {categories.length > 0 &&
                  categories.map((item) => (
                    <div key={item.id} onClick={handleClick}>
                      <Link href={`#${item.name_ru || item.name_uz}`}>
                        <a className="bg-white rounded-lg flex items-center justify-center text-md font-semibold text-green-main shadow-md shadow-[#00000046] px-6 md:px-5 py-2 md:py-3 cursor-pointer">
                          {lan ? item.name_ru : item.name_uz}
                        </a>
                      </Link>
                    </div>
                  ))}
              </ul>

              {info.action?.length > 0 &&
                info.action?.map((link, id) => (
                  <div key={id} className="my-8 flex flex-col gap-6">
                    <Link href={`tel:${link.phone_number}`}>
                      <a className="px-9 md:px-12 py-2 md:py-3 bg-green-recommend rounded-lg flex it text-sm md:text-baseter justify-center items-center gap-2  font-semibold text-white shadow-md shadow-[#00000046]">
                        <IoIosCall className="w-7 h-7 md:w-5 md:h-5" />
                        Позвонить
                      </a>
                    </Link>
                    <Link href={link.telegram_link}>
                      <a
                        target="_blank"
                        className="px-12 md:px-10 py-2 md:py-3 bg-white rounded-lg flex items-center justify-center gap-2  text-sm md:text-base font-semibold text-green-main shadow-md shadow-[#00000046]"
                      >
                        <FaTelegramPlane className="w-7 h-7 md:w-5 md:h-5 text-green-main" />
                        Телеграм
                      </a>
                    </Link>
                    <Link href={link.instagram_link}>
                      <a
                        target="_blank"
                        className="px-12 md:px-10 py-2 md:py-3 bg-white rounded-lg flex items-center justify-center gap-2  text-sm md:text-base font-semibold text-green-main shadow-md shadow-[#00000046]"
                      >
                        <AiFillInstagram className="w-7 h-7 md:w-5 md:h-5 text-green-main" />
                        Инстаграм
                      </a>
                    </Link>
                  </div>
                ))}
            </div>
          </Modal>
        </div>
      </div>
      <div className={styles.wrapper__2}></div>
    </>
  );
};

export default Header;
