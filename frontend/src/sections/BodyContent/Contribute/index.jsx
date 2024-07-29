"use client"
import First from "@assets/images/first-preview.png";
import Second from "@assets/images/second-preview.png";
import Minus from "@assets/images/minus.png";
import Plus from "@assets/images/plus.png";
import GradientButton from "src/components/GradientButton";
import Progress from "src/components/Progress";
import React, { useState, useEffect } from "react";
import { useAccount, useWriteContract, useNetwork, useDisconnect, useSigner, useConfig } from "wagmi";
import { toast } from "react-toastify";
import PresaleABI from "src/abi/presale.json";
import { formatUnits, parseUnits, encodeFunctionData, encodeErrorResult } from "viem";
import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
  estimateGas,
  createConfig,
  http, getSigner
} from "@wagmi/core";
import { useConnect } from "wagmi";
import Config from "src/settings/config";
import { useRouter } from "next/router";
import { mainnet, sepolia, bscTestnet } from "@wagmi/core/chains";
import { injected } from 'wagmi/connectors';
import { parseEther } from 'viem'
import { useContractStatus } from "src/hooks/useContractStatus";

const Contribute = () => {
  const [refresh, setRefresh] = useState(false)
    const {
       endDate,
       presalePrice
    } = useContractStatus(refresh)
    // const endDate = 1768512000
  console.log("flycontribute_presalePrice", presalePrice)
  const router = useRouter();
  const [ethValue, setEthValue] = useState(0.001);
  const [pending, setPending] = useState(false);
  const { address, isConnected } = useAccount();
  const [client, setClient] = useState(null);
  const {disconnect} = useDisconnect()
  const [isTryingToConnect, setIsTryingToConnect] = useState(false);
  const account = useAccount();
  // console.log("fly_contribute_account", account);
  const config = useConfig();
  // console.log("fly_contribute_config", config)
  // const { endDate } = useContractStatus();
  console.log("fly_endDate", endDate)

  // const { writeContract} = useWriteContract();
  
  
  const handleBuyBtn = async () => {
    // console.log('fly_isconnected', isConnected);
    if (!isConnected) {
      console.log('flyWallet not connected. Attempting to connect...');
      try {
        setIsTryingToConnect(true);
        await connect(connectors[0]);
        setIsTryingToConnect(false);
        console.log('Wallet connected');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setIsTryingToConnect(false);
        return;
      }
    }

    if (isConnected) {
      console.log('fly_Wallet is connected. Proceeding with contract call...');
      try {
        const transactionParams = {
          abi: PresaleABI,
          functionName: 'mintPresale',
          address: "0x7dca35fb77185E00E3a8b120A10F96290F3F6305",
          args: ["1"],
          value: parseEther(ethValue.toString())
        };
        const encodedData = encodeFunctionData(transactionParams)
        console.log("fly_encodedData", encodedData)
      // console.log("fly_estimateGas_final")
      // console.log("fly_writecontract_config", config);
      // console.log("fly_writecontract_account", account);
      // console.log("fly_tranasactionParms",  transactionParams)
        const txHash = await writeContract(config, {
          ...account,
          ...transactionParams
        })
        
        // console.log('flyTransaction hash11:', txHash);
        router.push("/buytoken")
      } catch (error) {
        console.error('fly_error in handlebuybtn', error);
      }
    } else {
      console.error('flyWallet is not connected after attempting to connect.');
    }
  };

  useEffect(() => {
    const fetchClient = async () => {
      // Your fetch client logic here
    };

    fetchClient();
  }, [address, isConnected]);

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
        className="lg:w-[24rem] w-[20rem] lg:pt-0 pt-8"
        src={First.src} // Replace with correct path
        alt="First"
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
              value={`${ethValue} $ETH`}
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
        {/* <GradientButton name="Buy1" onClick={handleBuyBtn} /> */}
        <GradientButton name="Buy1" onClick={() => handleBuyBtn()} />
        <div className="text-white text-sm">
          {/* Display the end date */}
          {endDate && (
            <div>Presale ends on: {new Date(endDate * 1000).toLocaleString()}</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Contribute;


// const Contribute = () => {
//   const router = useRouter();
//   const [ethValue, setEthValue] = useState(0.001);
//   const [pending, setPending] = useState(false);
//   const { address, isConnected } = useAccount();
//   const { disconnect } = useDisconnect();
//   const [isTryingToConnect, setIsTryingToConnect] = useState(false);
//   const [data, setData] = useState({
//     ethPriceInUSD: 0,
//     ethBal: 0,
//     userAmount: 0,
//     userLimit: 0,
//     endDate: 1
//   });
//   console.log("fly_contribute_data.enddate", data.endDate)
//   const [refetch, setRefetch] = useState(false);

//   const config = useConfig();
//   const account = useAccount();
//   console.log("fly_contribute_account_adress", account.address);
//   console.log("fly_contribute_config", config)

//   useEffect(() => {
//     const timerID = setInterval(() => {
//       setRefetch((prevData) => !prevData);
//     }, Config.REFETCH_INTERVAL);

//     return () => {
//       clearInterval(timerID);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // if (!account || !account.address || !config) {
//         //   console.log('fly_Account or Config is not available');
//         //   return;
//         // }

//         const contracts = [
//           {
//             address: Config.CONTRIBUTE,
//             abi: PresaleABI,
//             functionName: "endDate"
//           },
//           {
//             address: Config.CONTRIBUTE,
//             abi: PresaleABI,
//             functionName: "presaleMaxSupply"
//           },
//           {
//             address: Config.CONTRIBUTE,
//             abi: PresaleABI,
//             functionName: "presalePrice"
//           }
//         ];

//         const _d = await multicall(config, { contracts });
//         console.log('fly_d', _d);

//         let ethBal = 0;
//         if (account.address) {
//           const ethRawBalance = await getBalance(config, { address: account.address });
//           ethBal = parseFloat(formatUnits(ethRawBalance.value, ethRawBalance.decimals));
//         }

//         const ethPriceInUSD = await getEthPriceInUSD();

//         setData({
//           ethPriceInUSD,
//           ethBal,
//           userAmount: account.address && _d[0].status === "success" ? parseFloat(formatUnits(_d[0].result[0], Config.BEPE_DEC)) : 0,
//           userLimit: account.address && _d[0].status === "success" ? parseFloat(formatUnits(_d[0].result[1], Config.BEPE_DEC)) : 0,
//           endDate: _d[0].status === "success" ? _d[0].result[0] : null
//         });
//       } catch (error) {
//         console.log('fly_useContractStatus err', error);
//       }
//     };
//     fetchData();
//   }, [refetch, config, account]);

//   const getEthPriceInUSD = async () => {
//     try {
//       const response = await axios.get(Config.ETH_PRICE_API);
//       const ethPriceInUSD = parseFloat(response.data.result.ethusd);
//       return ethPriceInUSD;
//     } catch (error) {
//       console.error('Failed to fetch ETH price', error);
//       return 0;
//     }
//   };

//   const handleBuyBtn = async () => {
//     if (!isConnected) {
//       try {
//         setIsTryingToConnect(true);
//         // Your connect logic here
//         setIsTryingToConnect(false);
//       } catch (error) {
//         setIsTryingToConnect(false);
//         return;
//       }
//     }

//     if (isConnected) {
//       try {
//         const transactionParams = {
//           abi: PresaleABI,
//           functionName: 'mintPresale',
//           address: "0x7dca35fb77185E00E3a8b120A10F96290F3F6305",
//           args: ["1"],
//           value: parseEther(ethValue.toString())
//         };
//         const txHash = await writeContract(config, { ...account, ...transactionParams });
//         router.push("/buytoken");
//       } catch (error) {
//         console.error('Error in handleBuyBtn', error);
//       }
//     } else {
//       console.error('Wallet is not connected after attempting to connect.');
//     }
//   };

//   const handleMinus = () => {
//     setEthValue((prev) => parseFloat(Math.max(0, prev - 0.001).toFixed(6)));
//   };

//   const handlePlus = () => {
//     setEthValue((prev) => parseFloat((prev + 0.001).toFixed(6)));
//   };

//   return (
//     <div className="w-full flex flex-col items-center z-10 p-3 lg:mt-[-4rem] lg:p-0">
//       <img className="lg:w-[24rem] w-[20rem] lg:pt-0 pt-8" src={First.src} alt="First" />
//       <div className="lg:w-96 w-[20rem] h-auto p-2 flex flex-col items-center text-white bg-[url('/images/buy_background.png')] lg:mb-0 mb-4">
//         <div className="text-2xl"> $SOB SALE </div>
//         <div className="w-full flex flex-col items-center justify-center">
//           <div className="lg:w-80 w-72 flex text-white text-xs justify-end">
//             <label>15 $ETH</label>
//           </div>
//           <Progress value={70} />
//           <div className="lg:w-80 w-72 flex text-[#EA4FD7] text-xs justify-end">
//             <label className="cursor-pointer">ALL FUNDS GO TO LIQUIDITY</label>
//           </div>
//           <div className="flex">
//             <div onClick={handleMinus} className="w-12 h-12 flex items-center border border-solid border-[#EA4FD7] cursor-pointer">
//               <img src={Minus.src} alt="Minus" />
//             </div>
//             <input className="bg-transparent text-[20px] py-[3px] w-48 border-t border-b border-[#EA4FD7] border-solid text-center" value={`${ethValue} $ETH`} readOnly />
//             <div onClick={handlePlus} className="w-12 h-12 flex items-center border border-solid border-[#EA4FD7] cursor-pointer">
//               <img src={Plus.src} alt="Plus" />
//             </div>
//           </div>
//           <div className="flex w-72 text-[#FF8DF9] text-xs justify-between">
//             <label>1 $SOB = 0.00000015 $ETH</label>
//             <label className="cursor-pointer">max</label>
//           </div>
//         </div>
//         <GradientButton name="Buy1" onClick={() => handleBuyBtn()} />
//         <div className="text-white text-sm">
//           {data.endDate && (
//             <div>Presale ends on: {new Date(data.endDate * 1000).toLocaleString()}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contribute;