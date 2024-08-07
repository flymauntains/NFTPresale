"use client";
import First from "@assets/images/first-preview.png";
import Second from "../../../assets/images/second-preview.png";
import Minus from "@assets/images/minus.png";
import Plus from "@assets/images/plus.png";
import GradientButton from "src/components/GradientButton";
import Progress from "src/components/Progress";
import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useNetwork,
  useDisconnect,
  useSigner,
  useConfig,
} from "wagmi";
import { toast } from "react-toastify";
import PresaleABI from "src/abi/presale.json";
import {
  formatUnits,
  parseUnits,
  encodeFunctionData,
  encodeErrorResult,
} from "viem";
import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
  estimateGas,
  createConfig,
  http,
  getSigner,
} from "@wagmi/core";
import { useConnect } from "wagmi";
import Config from "src/settings/config";
import { useRouter } from "next/router";
import { mainnet, sepolia, bscTestnet } from "@wagmi/core/chains";
import { injected } from "wagmi/connectors";
import { parseEther } from "viem";
import { useContractStatus } from "src/hooks/useContractStatus";

const Contribute = () => {
  const [refresh, setRefresh] = useState(false);
  const { endDate, presalePrice } = useContractStatus(refresh);
  const router = useRouter();
  const [ethValue, setEthValue] = useState(0.001);
  const [pending, setPending] = useState(false);
  const { address, isConnected } = useAccount();
  const [client, setClient] = useState(null);
  const { disconnect } = useDisconnect();
  const [isTryingToConnect, setIsTryingToConnect] = useState(false);
  const account = useAccount();
  // console.log("fly_contribute_account", account);
  const config = useConfig();
  const chain = useAccount();
  // console.log("fly_contribute_config", config)
  // const { endDate } = useContractStatus();

  // const { writeContract} = useWriteContract();
  const [btnMsg, setBtnMsg] = useState("BUY NOW");
  const [errMsg, setErrMsg] = useState(false);
  useEffect(() => {
    if (!isConnected) {
      setBtnMsg("LOADING...");
      setErrMsg("Please wait! Loading...");
      return;
    }

    if (pending) {
      setBtnMsg("PENDING");
      setErrMsg("Please wait! Pending...");
      return;
    }

    if (!address) {
      setBtnMsg("Connect");
      setErrMsg("Please connect wallet!");
      return;
    }

    if (disconnect) {
      setBtnMsg("Wrong Network");
      // setErrMsg(`Please connect wallet to ${chain.name}!`);
      return;
    }

    // if (props.ethBalance < getDefaultGas()) {
    //   setBtnMsg(`Insufficient ${global.chain.name}`);
    //   setErrMsg(
    //     `Insufficient ${global.chain.name}! Please buy more ${global.chain.name}!`
    //   );
    //   return;
    // }

    // const validAmount = parseFloat(payTokenAmount);
    // if (!validAmount || validAmount < 0) {
    //   setBtnMsg("Enter amount");
    //   setErrMsg(`Please enter valid ${token.name} amount!`);
    //   return;
    // }

    // if (validAmount > getMaxValue(token.payTokenBalance, token.isNative)) {
    //   setBtnMsg(`Insufficient ${token.name}`);
    //   setErrMsg(`Insufficient ${token.name}! Please buy more ${token.name}!`);
    //   return;
    // }

    // if (token.payTokenAllowance < validAmount + 1000000) {
    //   setBtnMsg("ENABLE");
    //   setErrMsg(``);
    //   return;
    // }

    // if (props.icoStatus === ICO_BEFORE) {
    //   setBtnMsg(props.icoStatus);
    //   setErrMsg(`${props.icoStatusTitle} ${props.icoStatusDetail}`);
    //   return;
    // }

    setBtnMsg("BUY NOW");
  }, [address, pending]);
  const handleBuyBtn = async () => {
    console.log("fly_error_btnmsg", errMsg);
    console.log("fly_btnmsg", btnMsg);
    if (ethValue !== null) {
      setPending(true);

      if (!isConnected) {
        console.log("flyWallet not connected. Attempting to connect...");
        try {
          setIsTryingToConnect(true);
          await connect(connectors[0]);
          setIsTryingToConnect(false);
          console.log("Wallet connected");
        } catch (error) {
          console.error("Failed to connect wallet:", error);
          setIsTryingToConnect(false);
          return;
        }
      }

      if (isConnected) {
        console.log(
          "fly_Wallet is connected. Proceeding with contract call..."
        );
        const amount = (ethValue / presalePrice);
        const amount1 = amount.toString();
        // console.log("fly_amount", amount1);
        try {
          const transactionParams = {
            abi: PresaleABI,
            functionName: "mintPresale",
            address: "0x4F91aeDE07E943DB5D914ABfecc6E8489b60cC4f",
            // args: ["1"],
            args: [parseUnits(amount1)],
            value: parseEther(ethValue.toString()),
          };
          console.log("fly_transactionParams", transactionParams)
          const encodedData = encodeFunctionData(transactionParams);
          const txHash = await writeContract(config, {
            ...account,
            ...transactionParams,
          });

          const txPendingData = waitForTransactionReceipt(config, {
            hash: txHash,
          });
          toast.promise(txPendingData, {
            pending: "Waiting for pending... 👌",
          });
          const txData = await txPendingData;
          if (txData && txData.status === "success") {
            toast.success("Successfully minted ");
          } else {
            toast.error("Error1 Transaction is failed.");
          }

          // console.log('flyTransaction hash11:', txHash);
          router.push("/buytoken");
        } catch (error) {
          console.error("fly_error in handlebuybtn", error);
        }
        try {
          console.log("fly_user_reject", error.shortMessage);
          if (error?.shortMessage) {
            toast.error(error?.shortMessage);
          } else {
            toast.error("Unknown Error! Something went wrong");
          }
        } catch (error) {
          console.error("User rejected this request");
          // toast.error("User rejected this request");
        }
        try {
          if (setRefresh !== undefined && refresh !== undefined) {
            setRefresh(!refresh);
          }
        } catch (error) {}
        setPending(false);
        return;
      }
    }
    toast.warn(errMsg);
    // console.log('fly_isconnected', isConnected);
  };

  // useEffect(() => {
  //   const fetchClient = async () => {
  //     // Your fetch client logic here
  //   };

  //   fetchClient();
  // }, [address, isConnected]);

  const handleMinus = () => {
    setEthValue((prev) => parseFloat(Math.max(0, prev - 0.001).toFixed(6)));
  };

  const handlePlus = () => {
    setEthValue((prev) => parseFloat((prev + 0.001).toFixed(6)));
  };

  return (
    <div className="w-full flex flex-col items-center z-10 p-3 lg:mt-[-4rem] lg:p-0">
      {/* Ensure that the image sizes are responsive */}
      <img
        className="lg:w-[35rem] w-[20rem] lg:pt-0 pt-8, mt-24"
        src={Second.src}
        alt="Second"
      />
      <div className="lg:w-96 w-[20rem] h-auto p-2 flex flex-col items-center text-white bg-[url('/images/buy_background.png')] lg:mb-0 mb-4">
        <div className="text-2xl"> $SOB SALE </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="lg:w-80 w-72 flex text-white text-xs justify-end">
            <label>15 $ETH</label>
          </div>
          <Progress value={70} />{" "}
          {/* Ensure Progress component is responsive */}
          <div className="lg:w-80 w-72 flex text-[#EA4FD7] text-xs justify-end">
            <label className="cursor-pointer">ALL FUNDS GO TO LIQUIDITY</label>
          </div>
          <div className="flex">
            <div
              onClick={handleMinus}
              className="w-12 h-12 flex items-center border border-solid border-[#EA4FD7] cursor-pointer"
            >
              <img src={Minus.src} alt="Minus" />{" "}
              {/* Replace with correct path */}
            </div>
            <input
              className="bg-transparent text-[20px] py-[3px] w-48 border-t border-b border-[#EA4FD7] border-solid text-center"
              value={$`{ethValue} $ETH`}
              readOnly
            />
            <div
              onClick={handlePlus}
              className="w-12 h-12 flex items-center border border-solid border-[#EA4FD7] cursor-pointer"
            >
              <img src={Plus.src} alt="Plus" />{" "}
              {/* Replace with correct path */}
            </div>
          </div>
          <div className="flex w-72 text-[#FF8DF9] text-xs justify-between">
            <label>1 $SOB = {presalePrice} $ETH</label>
            <label className="cursor-pointer">max</label>
          </div>
        </div>
        {/* <GradientButton name="Buy" onClick={handleBuyBtn} /> */}
        <GradientButton name="Buy" onClick={() => handleBuyBtn()} />
        <div className="text-white text-sm">
          {/* Display the end date
          {endDate && (
            <div>
              Presale ends on: {new Date(endDate * 1000).toLocaleString()}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Contribute;
