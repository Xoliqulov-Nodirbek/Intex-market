import Image from "next/image";
import Client1 from "../../styles/assets/images/client1.png";
import Client2 from "../../styles/assets/images/client2.png";
import Client3 from "../../styles/assets/images/client3.png";

const Customers = ({ lan }) => {
  return (
    <>
      <div className="">
        <div className="bg-[#E8F5F6] mt-5 md:mt-16">
          <h2 className="font-bold text-2xl md:text-5xl text-[#009398] text-center py-2 md:py-5 tracking-[1px]">
            {lan ? "Ценности наших клиентов" : "Mijozlarni qadrlash"}
          </h2>
        </div>
        <ul className="lg:flex items-center w-[80%] md:w-[80%] lg:max-w-[1185px] justify-center mx-auto my-10 md:my-14 lg:my-20 space-x-2">
          <li className="flex items-center">
            <Image src={Client1} alt="Clients" />
            <div className="ml-8 w-[80%] ">
              <h3 className="font-bold text-xl md:text-4xl">
                {lan ? "Опыт" : "Tajriba"}
              </h3>
              <p className="font-normal text-xs md:text-xl leading-5 md:mt-2">
                {lan
                  ? "Профессионализм наших сотрудников"
                  : "Xodimlarimiz  professionalligi"}
              </p>
            </div>
          </li>
          <li className="flex items-center">
            <Image src={Client2} alt="Clients" />
            <div className="ml-5 w-[80%]">
              <h3 className="font-bold text-xl md:text-4xl">
                {lan ? "Доставка" : "Yetkazib berish"}
              </h3>
              <p className="font-normal text-xs md:text-xl leading-5 md:mt-2">
                {lan
                  ? "Бесплатная доставка по городу"
                  : "Shahar bo'ylab bepul yetkazib berish"}
              </p>
            </div>
          </li>
          <li className="flex items-center">
            <Image src={Client3} alt="Clients" />
            <div className="ml-5 w-[80%]">
              <h3 className="font-bold text-xl md:text-4xl">
                {lan ? "Качество" : "Sifat"}
              </h3>
              <p className="font-normal text-xs md:text-xl leading-5 md:mt-2">
                {lan
                  ? "Прочные, качественные бассейны"
                  : "Chidamli, sifatli basseynlar"}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Customers;
