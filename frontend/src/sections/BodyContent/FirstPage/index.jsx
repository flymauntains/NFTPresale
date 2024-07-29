import First from "@assets/images/first-preview.png";
import Second from "@assets/images/first-preview.png";
import Minus from "@assets/images/minus.png";
import Plus from "@assets/images/plus.png";
import GradientButton from "src/components/GradientButton";
import Progress from "src/components/Progress";
import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import PresaleABI from "src/abi/presale.json";
import { formatUnits, parseUnits, encodeFunctionData } from "viem";
import {
  simulateContract,
  writeContract,
  prepareWriteContract,
  waitForTransactionReceipt,
  estimateGas,
  createConfig,
  http,
} from "@wagmi/core";
import { usePrepareTransactionRequest } from "wagmi";
import { config } from "./config.ts";
// import {config1} from "./config1";
import { abis } from "./abi.ts";
import Config from "src/settings/config";
import { mainnet, sepolia, bscTestnet } from "@wagmi/core/chains";

import { ConnectorNotConnectedError, getConnectorClient } from "@wagmi/core";

const Contribute = () => {

  const [ethValue, setEthValue] = useState(0.001);
  const [pending, setPending] = useState(false);
  const { chain } = useAccount();
  console.log("fly_chain", chain);
  const { address } = useAccount();
  // console.log("fly_config-----------", config)
  // const client =  getConnectorClient(config, {
  //   chainId :sepolia.id
  // })

  // console.log("fly_client", client)

  const handleBuyBtn = async (account) => {
    console.log("fly");
    console.log("fly_first_config", Config);
    const data = {
      address: "0xEE63B693B98d39ac5786903306acBb5D39E08cfc",
      abi: PresaleABI,
      functionName: "mintPresale",
      args: ["100"],
      value: 0.001,
    };
    console.log("fly_data", data);
    const encodedData = encodeFunctionData(data);
    console.log("fly_encodeddata", encodedData);
    try {
      // console.log("fly_config11:", config);
      const gas = await estimateGas(Config,  {
        ...account,
        // ..."0x0858EACE1906612aD2C050DD65D892660027e5b7",
        data: encodedData,
        to: data.address,
      });
      const chianId = chain.id;
      const txHash = await writeContract(config, {
        ...account,
        // ..."0x0858EACE1906612aD2C050DD65D892660027e5b7",
        ...data,
      });
      const txPendingData = waitForTransactionReceipt(config, {
        hash: txHash,
      });
    } catch (error) {
      console.error("fly_error in handlebuybtn", error);
    }
  };
  // const handleBuyBtn = async () => {
  //     if (ethValue !== null) {
  //       setPending(true);
  //       try {
  //         let data;
  //           data = writeContractAsync({
  //               chainId: chain.id,
  //               // __mode: "prepared",
  //               abis,
  //               address: "0xEE63B693B98d39ac5786903306acBb5D39E08cfc",
  //               functionName: "mintPresale",
  //               args: [
  //                 //   parseUnits(ethValue.toString(), 18),
  //                 //   'ethValue' / 0.000001,
  //                 "0.001",
  //                 "100"
  //                 ],
  //                 // value: parseUnits(ethValue.toString(), 18),
  //                 value: 0.001
  //             });
  //             console.log("fly_data", data)
  //             // return data;
  //             console.log("fly_data", ethValue.toString())

  //         const preparedData = await simulateContract(data);
  //         console.log("fly_prepareddata", preparedData)
  //         const writeData = await writeContract(preparedData);
  //         const txPendingData = waitForTransactionReceipt(writeData);
  //         toast.promise(txPendingData, {
  //           pending: "Waiting for pending... 👌",
  //         });

  //         const txData = await txPendingData;
  //         if (txData && txData.status === "success") {
  //           if (btnMsg === "ENABLE") {
  //             toast.success(`Successfully enabled to buy! 👌`);
  //           } else {
  //             toast.success(
  //               `Successfully bought ${formatNumber(
  //                 parseFloat(outTokenAmount)
  //               )} ${global.PROJECT_TOKEN.name}! 👍`
  //             );
  //           }
  //         }
  //         else {
  //           toast.error("Error! Transaction failed.");
  //         }
  //       } catch (error) {
  //         console.log("fly:",error);
  //         try {
  //           if (error?.shortMessage) {
  //             toast.error(error?.shortMessage);
  //           } else {
  //             toast.error("Unknown Error! Something went wrong.");
  //           }
  //         } catch (error) {
  //           toast.error("Error! Something went wrong.");
  //         }
  //       }
  //       try {
  //         if (props.setRefresh !== undefined && props.refresh !== undefined) {
  //           props.setRefresh(!props.refresh);
  //         }
  //       } catch (error) {}
  //       setPending(false);
  //       return;
  //     }

  //     toast.warn(errMsg);
  //   };
  //   const handleBuyBtn = () => {
  //       console.log("fly")
  //       alert('buytoken');
  //   };
  const handleMinus = () => {
    setEthValue((prev) => parseFloat(Math.max(0, prev - 0.001).toFixed(6)));
  };

  const handlePlus = () => {
    setEthValue((prev) => parseFloat((prev + 0.001).toFixed(6)));
  };

  return (
    <div className="w-full flex flex-col items-center z-10 p-3 lg:mt-[-4rem] lg:p-0">
      {/* <img className="lg:w-96 w-[20rem] pt-8 lg:pt-36" src={Fist.src} alt="Fist" /> */}
      <img
        className="lg:w-[33rem] w-[20rem] lg:pt-0 pt-8"
        src={Second.src}
        alt="Second"
      />
      <div className="lg:w-96 w-[20rem] h-60 p-2 flex flex-col items-center text-white bg-[url('/images/buy_background.png')] lg:mb-0 mb-4">
        <div className="text-2xl">$SOB SALE</div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="lg:w-80 w-72 flex text-white text-xs justify-end">
            <label>15 $ETH</label>
          </div>
          <Progress value={70} />
          <div className="lg:w-80 w-72 flex text-[#EA4FD7] text-xs justify-end">
            <label className="cursor-pointer">ALL FUNDS GO TO LIQUIDITY</label>
          </div>
          <div className="flex">
            <div
              onClick={handleMinus}
              className="w-12 h-12 flex items-center border border-solid border-[#EA4FD7] cursor-pointer"
            >
              <img src={Minus.src} alt="Minus" />
            </div>
            <input
              className="bg-transparent text-[20px] py-[3px] w-48 border-t border-b border-[#EA4FD7] border-solid text-center"
              value={`${ethValue} $ETH`}
              readOnly
            />
            <div
              onClick={handlePlus}
              className="w-12 h-12 flex items-center border border-solid border-[#EA4FD7] cursor-pointer"
            >
              <img src={Plus.src} alt="Plus" />
            </div>
          </div>
          <div className="flex w-72 text-[#FF8DF9] text-xs justify-between">
            <label>1 $SOB = 0.00000015 $ETH</label>
            <label className="cursor-pointer">max</label>
          </div>
        </div>
        <GradientButton name="Buy1" onClick={handleBuyBtn} />
      </div>
    </div>
  );
};

export default Contribute;
