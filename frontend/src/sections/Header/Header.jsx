import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useModal } from "src/utils/ModalContext";
import {
  MdNotes,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import MobileMenu from "./MobileMenu";

import MenuBar from "./ManuBar"

// import { FaWallet } from "react-icons/fa";
import WalletConnectButton from "@components/WalletConnectButton";

const Header = () => {
  const { walletModalHandle } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };

  const handleWalletBtn = (e) => {
    e.preventDefault();
    walletModalHandle();
  };

  return (
    <header className="bg-transparent pt-1 w-full px-5 flex z-50">
      <div className="flex w-full justify-end z-50">
        <MenuBar />
      </div>
      <div className="flex w-full justify-end lg:pr-8 pr-1 items-center z-50">
        <WalletConnectButton />
      </div>
      {isMobileMenu && 
        <div className="bepe_menu_btns">
          <button className="menu_btn" onClick={() => handleMobileMenu()}>
            <MdNotes />
          </button>
        </div>
      }
      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </header>
  );
};

export default Header;
