import Image from "next/image";
import Link from "next/link";
import logo from "@assets/images/logo.png";

const MenuItems = [
  {
    name: "SOB COLLECTIONS",
    href: "/_about",
  },
  {
    name: "PRODUCTS",
    href: "/products",
  },
];

const MenuBar = () => {
  return (
    <div className="flex justify-between w-full items-center pr-10">
      <Link href="/" className="lg:w-40 lg:h-20 w-32 h-16">
        <img className="w-full h-full" src={logo.src} alt="logo" />
      </Link>
      <div className="lg:flex hidden">
        {MenuItems.map((item, index) => {
          return (
            <Link href={item.href} key={`${item.name}_${index}`}>
              <div className="h-full flex items-center text-white pl-8 text-[18px] font-bold">{item.name}</div>;
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default MenuBar;
