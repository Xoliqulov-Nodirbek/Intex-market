import styles from "./nearbies.module.css";

const Nearbies = ({ lan }) => {
  return (
    <>
      <div className=" ">
        <div className="bg-[#E8F5F6] mt-5 md:mt-16">
          <h2 className="font-bold text-2xl md:text-5xl text-[#009398] text-center py-2 md:py-5 tracking-[1px]">
            {lan
              ? "Бассейны от intex в Ташкенте"
              : "Intex basseynlari Toshkentda"}
          </h2>
        </div>
        <div className="">
          <div className="md:flex items-center max-w-[1250px] w-full justify-between mx-auto my-5 md:my-9 lg:my-12">
            <div className="w-[70%] md:w-[40%] xl:w-[45%]  mx-auto">
              <p className="text-sm lg:text-xl">
                {lan
                  ? "Бассейны от intex - доступная по цене, качественная, надежная и экологически чистая продукция, которая предназначена для приятного отдыха всей семьи. Бассейн можно установить совершенно на любом участке и активно пользоваться им в летний период. Бассейн подарит вам яркие эмоции и спасет от жары в знойные летние дни."
                  : "Intex basseynlari - bu butun oila uchun yoqimli dam olish uchun mo'ljallangan arzon, yuqori sifatli, ishonchli va ekologik toza mahsulotlar. Basseyn har qanday hovliga to'liq o'rnatilishi va yozda faol foydalanilishi mumkin. Basseyn sizga yorqin his-tuyg'ularni beradi va issiq yoz kunlarida sizni jaziramadan qutqaradi."}
              </p>
            </div>
            <div className="w-[70%] md:w-[40%] xl:w-[45%] mt-4  md:ml-5 mx-auto">
              <div className="">
                <p className="text-sm lg:text-xl">
                  {lan
                    ? "Бассейны от intex отличаются обширным перечнем преимуществ, из которых можно выделить самые важные:"
                    : "Intex Basseynlari afzalliklarning kengligi bilan ajralib turadi, quyida ulardan eng muhimlarini ajratib ko'rsatish mumkin:"}
                </p>
              </div>
              <ul className="mt-5 space-y-1">
                <li className={`${styles.footerItem} text-base lg:text-xl`}>
                  {lan ? "Прочность" : "Chidamlilik"}
                </li>
                <li className={`${styles.footerItem} text-base lg:text-xl`}>
                  {lan ? " Простота установки" : "O'rnatish uchun juda oson"}
                </li>
                <li className={`${styles.footerItem} text-base lg:text-xl`}>
                  {lan ? "Красивые и ярки цвета" : "Chiroyli va yorqin ranglar"}
                </li>
                <li className={`${styles.footerItem} text-base lg:text-xl`}>
                  {lan ? "Стильный дизайн" : "Zmonaviy dizayn"}
                </li>
                <li className={`${styles.footerItem} text-base lg:text-xl`}>
                  {lan ? "Высокое качество" : "Yuqori sifat"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nearbies;
