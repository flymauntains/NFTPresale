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
import { formatUnits, parseUnits, encodeFunctionData } from "viem";
import {
  simulateContract,
  writeContract,
  prepareWriteContract,
  waitForTransactionReceipt,
  estimateGas,
  createConfig,
  http, getSigner
} from "@wagmi/core";
import { useConnect } from "wagmi";
import { config } from "./config.ts";
// import {config1} from "./config1";
import { abis } from "./abi.ts";
import Config from "src/settings/config";
import { useRouter } from "next/router";
import { mainnet, sepolia, bscTestnet } from "@wagmi/core/chains";
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { injected } from 'wagmi/connectors';
// import { injectedConnector} from 
import { ConnectorNotConnectedError, getConnectorClient } from "@wagmi/core";

const Contribute = () => {
  
  const router = useRouter();
  const [ethValue, setEthValue] = useState(0.001);
  const [pending, setPending] = useState(false);
  const { address, isConnected } = useAccount();
  const [client, setClient] = useState(null);
  const {disconnect} = useDisconnect()
  const [isTryingToConnect, setIsTryingToConnect] = useState(false);
  const account = useAccount();
  console.log("fly_contribute_account", account);
  const config = useConfig();
  console.log("fly_contribute_config", config)
  // const provider = useProvider();

  const { writeContract} = useWriteContract();
  // useEffect(() => {
  //   if (isTryingToConnect && isConnected) {
  //     setIsTryingToConnect(false);
  //     console.log('Wallet connected successfully');
  //   }
  // }, [isConnected]);
  // useEffect(() => {
  //   const fetchClient = async () => {
  //     console.log("fly_fetchdata");

  //     if (!isConnected) {
  //       console.log("fly_Not connected");
  //       return;
  //     }

  //     const connector = {
  //       name: "Metamask",
  //       supportedChainIds: [1, 3, 4, 5, 42, 97],
  //       getAccounts: async () => [address],
  //       getChainId: async () => bscTestnet.id,
  //       getProvider: async () => window.ethereum,
  //     };

  //     try {
  //       console.log("fly_Address:", address);
  //       console.log("fly_Chain ID:", bscTestnet.id);

  //       const client = await getConnectorClient(Config, {
  //         account: address,
  //         chainId: bscTestnet.id,
  //         connector,
  //       });

  //       console.log("fly_Client:", client);
  //       setClient(client);
  //       console.log("fly_setclient", client);
  
  //       handleBuyBtn({ client }); // Call handleBuyBtn after setting the client
  //     } catch (error) {
  //         console.error("fly_Error fetching connector client", error);
  //       }
  //     };
    
  //   const handleBuyBtn = async (client) => {
  //     console.log("fly");
  //     console.log("fly_first_config", Config);
  //     const data = {
  //       address: "0xEE63B693B98d39ac5786903306acBb5D39E08cfc",
  //       abi: PresaleABI,
  //       functionName: "mintPresale",
  //       args: ["100"],
  //       value: 0.001,
  //     };
  //     console.log("fly_data", data);
  //     const encodedData = encodeFunctionData(data);
  //     console.log("fly_encodeddata", encodedData);
  //     try {
  //       // console.log("fly_config11:", config);
  //       // const gas = await estimateGas(Config,  {
  //       //   ...account,
  //       //   // ..."0x0858EACE1906612aD2C050DD65D892660027e5b7",
  //       //   data: encodedData,
  //       //   to: data.address,
  //       // });
  //       // const chianId = chain.id;
  //       const txHash = await writeContract(Config, {
  //         ...account,
  //         chainId: 97,
  //         // ..."0x0858EACE1906612aD2C050DD65D892660027e5b7",
  //         ...data,
  //         connector,
  //       });
  //       const txPendingData = waitForTransactionReceipt(Config, {
  //         hash: txHash,
  //       });
  //       router.push("/buytoken");
  //     } catch (error) {
  //       console.error("fly_error in handlebuybtn", error);
  //     }
  //   };

  //   fetchClient();
  // }, [address, isConnected]);


  // useEffect(() => {
  //   const fetchClient = async () => {
  //     console.log("fly_fetchdata");

  //     if (!isConnected) {
  //       console.log("fly_Not connected");
  //       return;
  //     }

  //     const connector = {
  //       name: "Metamask",
  //       supportedChainIds: [1, 3, 4, 5, 42, 97],
  //       getAccounts: async () => [address],
  //       getChainId: async () => bscTestnet.id,
  //       getProvider: async () => window.ethereum,
  //     };

  //     try {
  //       console.log("fly_Address:", address);
  //       console.log("fly_Chain ID:", bscTestnet.id);

  //       const client = await getConnectorClient(Config, {
  //         account: address,
  //         chainId: bscTestnet.id,
  //         connector,
  //       });

  //       console.log("fly_Client:", client);
  //       setClient(client);
  //       console.log("fly_setclient", client);

  //       // Uncomment if you want to call handleBuyBtn immediately after setting the client
  //       // handleBuyBtn(client);
  //     } catch (error) {
  //       console.error("fly_Error fetching connector client", error);
  //     }
  //   };

  //   fetchClient();
  // }, [address, isConnected]);
  
  // useEffect (() => {
    // const fetchClient = async () => {
    const handleBuyBtn = async (account) => {
      // const signer = await getSigner(); 
      // console.log("fly_sigerne-----",signer)
      console.log('fly_isconnected', isConnected);
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
          console.log("flytwritecontract_config", config)
          console.log("flyt_address", address)
          const hash11 =  await writeContract(config, {
            // account: address,
            abi: PresaleABI,
            address: "0x7dca35fb77185E00E3a8b120A10F96290F3F6305",
            functionName: 'mintPresale',
            args: [5],
            value: 1000000000000000,
          }
        );
        console.log('flyTransaction hash11:', hash11);
        }
        // try {
        //   let data = {
        //     address: "0x7dca35fb77185E00E3a8b120A10F96290F3F6305",
        //     abi: PresaleABI,
        //     functionName: "setPresaleDates",
        //     args: ["1712236800", "1768512000"],
        //     // value: 10000000000000,
            
        //   }
        //   const encodedData = encodeFunctionData(data)
        //   console.log("fly_encodedData", encodedData)
        //   // await estimateGas(config, {
        //   //   ...account,
        //   //   data: encodedData,
        //   //   to: data.address,
        //   // })
        //   console.log("fly_tx_config", config)
        //   console.log("fly_tx_account", account)
        //   console.log("fly_tx_data", data)
        //   const txHash = await writeContract(config, {
        //     ...account,
        //     ...data,
        //   })
        //   console.log("fly_txHash", txHash)
        // }
        catch (error) {
          console.error('fly_error in handlebuybtn', error);
        }
      } 
      else {
        console.error('flyWallet is not connected after attempting to connect.');
      }
    };
    // fetchClient(); 
  // }, [address, isConnected])


  // const handleBuyBtn = async (account) => {
  //   const client = await getConnectorClient(Config, {
  //     account: address,
  //     chainId: bscTestnet.id,
  //     connector: Config.connector,
  //   });
  //   console.log("fly_setclient", client);
  //   // const connector = {
  //   //   name: "Metamask",
  //   //   supportedChainIds: [1, 3, 4, 5, 42, 97],
  //   //   getAccounts: async () => [address],
  //   //   getChainId: async () => bscTestnet.id,
  //   //   getProvider: async () => window.ethereum,
  //   // };
  //   console.log("fly");
  //   console.log("fly_first_config", Config);
  //   const data = {
  //     address: "0xEE63B693B98d39ac5786903306acBb5D39E08cfc",
  //     abi: PresaleABI,
  //     functionName: "mintPresale",
  //     args: ["100"],
  //     value: 0.001,
  //   };
  //   console.log("fly_data", data);
  //   const encodedData = encodeFunctionData(data);
  //   console.log("fly_encodeddata", encodedData);
  //   try {
  //     // console.log("fly_config11:", config);
  //     // const gas = await estimateGas(Config,  {
  //     //   ...account,
  //     //   chainId: 97,
  //     //   // ..."0x0858EACE1906612aD2C050DD65D892660027e5b7",
  //     //   data: encodedData,
  //     //   to: data.address,
  //     //   connector: Config.connector
  //     // });
  //     const chianId = chain.id;
  //     const txHash = await writeContract(Config, {
  //       ...account,
  //       chainId: 97,
  //       // ..."0x0858EACE1906612aD2C050DD65D892660027e5b7",
  //       ...data,
  //       connector: Config.connector,
  //     });
  //     const txPendingData = waitForTransactionReceipt(config, {
  //       hash: txHash,
  //     });
  //     router.push("/buytoken");
  //   } catch (error) {
  //     console.error("fly_error in handlebuybtn", error);
  //   }
  // };
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
  // const handleBuyBtn = () => {
  //   console.log("fly");
  //   alert("buytoken");
  // };
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
            <label>1 $SOB = 0.00000015 $ETH</label>
            <label className="cursor-pointer">max</label>
          </div>
        </div>
        {/* <GradientButton name="Buy1" onClick={handleBuyBtn} /> */}
        <GradientButton name="Buy1" onClick={() => handleBuyBtn()} />
      </div>
    </div>
  );
};
export default Contribute;
