import { useState } from "react";
import { ModalContext } from "./ModalContext";

const ContextProvider = ({ children }) => {
  const [walletModalvisibility, setModalvisibility] = useState(false);
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(false);
  const [accounts, setAccounts] = useState(null);

  const [visibility, setVisibility] = useState(false);
  const [isPopup, setPopup] = useState(true);
  //meta mask

  const handleAccountConnect = (acc) => {
    setAccounts(acc);
  };

  const walletModalHandle = () => {
    setModalvisibility(!walletModalvisibility);
  };

  const shareModalHandle = (e) => {
    e.preventDefault();
    setShareModalvisibility(!shareModalVisibility);
  };

  const handleMetamaskModal = () => {
    setModalvisibility(!walletModalvisibility);
    setMetamaskModal(!metamaskModal);
  };

  const mintModalHandle = () => {
    setVisibility(!visibility);
  };

  const popupHandle = () => {
    setPopup(!isPopup);
  };

  return (
    <ModalContext.Provider
      value={{
        walletModalHandle,
        walletModalvisibility,
        shareModalVisibility,
        shareModalHandle,
        metamaskModal,
        handleMetamaskModal,
        handleAccountConnect,
        accounts,
        visibility,
        mintModalHandle,
        isPopup,
        popupHandle,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
