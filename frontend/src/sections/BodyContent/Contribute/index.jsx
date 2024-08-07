"use client";
import First from "@assets/images/first-preview.png";
import Second from "@assets/images/second-preview.png";
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
  const { 
    endDate, 
    presalePrice, 
    presaleSupply, 
    presaleMintedByUser
  } = useContractStatus(refresh);
  const router = useRouter();
  const [ethValue, setEthValue] = useState(0.001);
  const [pending, setPending] = useState(false);
  const { address, isConnected } = useAccount();
  const [client, setClient] = useState(null);
  const { disconnect } = useDisconnect();
  const [isTryingToConnect, setIsTryingToConnect] = useState(false);
  const account = useAccount();
  const config = useConfig();
  const chain = useAccount();

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


    setBtnMsg("BUY NOW");
  }, [address, pending]);
  const handleBuyBtn = async () => {
    // console.log("fly_error_btnmsg", errMsg);
    // console.log("fly_btnmsg", btnMsg);
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
          toast.error(error?.shortMessage);
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
  const handleMaxClick = () =>{
    // console.log("fly_max")
    alert("max value")
  }
  // const handleMaxClick = () => {
  //   // Assuming there's a max value you want to set ethValue to
  //   const maxEthValue = 1; // Replace with your actual max value
  //   setEthValue(maxEthValue);
  //   console.log("flyMax button clicked");
  // };

  const handleMinus = () => {
    setEthValue((prev) => parseFloat(Math.max(0, prev - 0.001).toFixed(6)));
  };

  const handlePlus = () => {
    setEthValue((prev) => parseFloat((prev + 0.001).toFixed(6)));
  };
  const ratio = (presaleMintedByUser / presaleSupply) * 100
  console.log("fly_data_minted_total", presaleMintedByUser, presaleSupply)

  return (
    <div className="w-full flex flex-col items-center z-10 p-3 lg:mt-[-4rem] lg:p-0">
      {/* Ensure that the image sizes are responsive */}
      <img
        className="lg:w-[24rem] w-[20rem] lg:pt-0 pt-8, mt-24"
        src={First.src} // Replace with correct path
        alt="First"
      />
      <div className="lg:w-96 w-[20rem] h-auto p-2 flex flex-col items-center text-white bg-[url('/images/buy_background.png')] lg:mb-0 mb-4">
        <div className="text-2xl"> $SOB SALE </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="lg:w-80 w-72 flex text-white text-xs justify-end">
            <label>15 $ETH</label>
          </div>
          <Progress value={ratio.toFixed(2)} />{" "}
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
            {/* <button className="cursor-pointer" onclick ={() => handleMaxClick()}>max</button> */}
            <button className="cursor-pointer" onclick ={handleMaxClick}>max</button>
          </div>
        </div>
        {/* <GradientButton name="Buy" onClick={handleBuyBtn} /> */}
        <GradientButton name="Buy" onClick={() => handleBuyBtn()} />
        <div className="text-white text-sm">
          {/* Display the end date */}
          {/* {endDate && (
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
//         <GradientButton name="Buy" onClick={() => handleBuyBtn()} />
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
