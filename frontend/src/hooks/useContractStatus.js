import { useEffect, useState } from "react";
import axios from "axios"
import contributeABI from "src/abi/contribute.json";
import Config from "src/settings/config";
import { useAccount, useConfig } from "wagmi";
import { multicall, getBalance } from '@wagmi/core'
import { formatUnits } from "viem";
import  PresaleABI  from "src/abi/presale.json";

// const getEthPriceInUSD = async () => {
//   const ethPriceInUSD = parseFloat((await axios.get(Config.ETH_PRICE_API)).data.result.ethusd)
//   return ethPriceInUSD
// }

export function useContractStatus(refresh) {
  const [data, setData] = useState({
    ethPriceInUSD: 0,
    ethBal: 0,
    userAmount: 0,
    userLimit: 0,
    endDate: 0,
    presaleMaxSupply: 0,
    presalePrice: 0
  })
  console.log("fly_usecontract", data.presalePrice)
  const config = useConfig()
  console.log("fly_config_read",config);
  const account =  useAccount();
  console.log("fly_account", account);

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    const timerID = setInterval(() => {
      setRefetch((prevData) => {
        return !prevData;
      })
    }, Config.REFETCH_INTERVAL);

    return () => {
      clearInterval(timerID);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contracts = [
          {
            address: Config.CONTRIBUTE,
            abi: PresaleABI,
            functionName: "endDate"
          },
          {
            address: Config.CONTRIBUTE,
            abi: PresaleABI,
            functionName: "presaleMaxSupply"
          },
          {
            address: Config.CONTRIBUTE,
            abi: PresaleABI,
            functionName: "presalePrice"
          }
        ]

        if (account.address) {
          contracts.push({
            address: Config.CONTRIBUTE,
            abi: PresaleABI,
            functionName: 'ownerOf',
          })
        }

        const _d = await multicall(config, {
          contracts
        })

        console.log('fly_d', _d[2].result)

        // let ethBal = 0;
        // if (account.address) {
        //   const ethRawBalance = await getBalance(config, { address: account.address })
        //   ethBal = parseFloat(formatUnits(ethRawBalance.value, ethRawBalance.decimals))
        //   // console.log('ethBal', ethBal)
        // }

        // const ethPriceInUSD = await getEthPriceInUSD();
        const rawPresalePrice = _d[2].status === "success" ? _d[2].result : 0;
        const presalePrice = parseFloat(formatUnits(rawPresalePrice, Config.BEPE_DEC));
        setData({
          // ethPriceInUSD,
          // ethBal,
          // userAmount: account.address && _d[0].status === "success" ? parseFloat(formatUnits(_d[0].result[0], Config.BEPE_DEC)) : 0,
          // userLimit: account.address && _d[0].status === "success" ? parseFloat(formatUnits(_d[0].result[1], Config.BEPE_DEC)) : 0,
          // endDate: _d[0].status === "success" ? parseFloat(formatUnits(_d[0].result))  : 5
          endDate: _d[0].status === "success" ? Number(_d[0].result)  : 0,
          presaleMaxSupply: _d[1].status === "success" ? Number(_d[1].result)  : 0,
          // presalePrice: _d[2].status === "success" ? parseFloat(formatUnits(_d[2].result), 18)  : 5
          presalePrice
        })
      } catch (error) {
        console.log('useContractStatus err', error)
      }
    };
    fetchData();
  }, 
  [account.address, refetch, refresh, config])
  // [ refetch, refresh])
  // console.log("fly_final_address", account.address);
  // console.log("fly_final_config", config)

  return data
}
