import { useEffect, useState } from "react";
import axios from "axios"
import contributeABI from "src/abi/contribute.json";
import Config from "src/settings/config";
import { useAccount, useConfig } from "wagmi";
import { multicall, getBalance } from '@wagmi/core'
import { formatUnits } from "viem";
import  PresaleABI  from "src/abi/presale.json";


export function useContractStatus(refresh) {
  const [data, setData] = useState({
    ethBal: 0,
    endDate: 0,
    presaleMaxSupply: 0,
    presalePrice: 0,
    presaleSupply: 0,
    presaleMintedByUser: 0,
  })
  // console.log("fly_data", data)
  const config = useConfig()
  const account =  useAccount();
  // console.log("fly_d_account", account)
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
          },
          {
            address: Config.CONTRIBUTE,
            abi: PresaleABI,
            functionName: "presaleSupply"
          },
          {
            address: Config.CONTRIBUTE,
            abi: PresaleABI,
            functionName: "presaleMinted",
            args: [account.address]
          }
        ]

        // if (account.address) {
        //   contracts.push({
        //     address: Config.CONTRIBUTE,
        //     abi: PresaleABI,
        //     functionName: 'ownerOf',
        //   })
        // }

        const _d = await multicall(config, {
          contracts
        })

        // console.log('fly_d', _d)

        const rawPresalePrice = _d[2].status === "success" ? _d[2].result : 0;
        const presalePrice = parseFloat(formatUnits(rawPresalePrice, Config.BEPE_DEC));
        setData({
          endDate: _d[0].status === "success" ? Number(_d[0].result)  : 0,
          presaleMaxSupply: _d[1].status === "success" ? Number(_d[1].result)  : 0,
          presalePrice,
          presaleSupply:  _d[3].status === "success" ? Number(_d[3].result)  : 0,
          presaleMintedByUser: _d[4].status === "success" ? Number(_d[4].result)  : 0,
        })
      } catch (error) {
        console.log('useContractStatus err', error)
      }
    };
    fetchData();
  }, 
  [account.address, refetch, refresh, config])
  // [ refetch, refresh])

  return data
}
