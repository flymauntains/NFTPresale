import Config from "src/settings/config";
import { estimateGas, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { toast } from "react-toastify";
import { encodeFunctionData, parseUnits } from 'viem'
import contributeABI from "src/abi/contribute.json";

export const MSG_UNSTAKE = `Your lock time has been ended, you can unstake now instead of withdraw rewards`

export const toastConfig = {
    style: {
        fontFamily: "Orbitron",
        fontSize: "20px",
        textTransform: "uppercase",
        borderColor: "black",
        borderWidth: "2px",
        borderRadius: "0px",
    }
}

export function getDefaultGas() {
    return Config.DEFAULT_GAS
}

export function formatNumber(num) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + 'T';
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    } else {
        return num.toFixed(2);
    }
}

export const handleContribute = async (errMsg, btnMsg, config, setPending, refresh, setRefresh, amount, account) => {
    if (errMsg === `` && btnMsg === 'Contribute') {
        setPending(true)
        try {
            let data = {
                address: Config.CONTRIBUTE,
                abi: contributeABI,
                functionName: 'contribute',
                args: [parseUnits(amount.toString(), Config.BEPE_DEC)],
            }
            const encodedData = encodeFunctionData(data)
            await estimateGas(config, {
                ...account,
                data: encodedData,
                to: data.address,
            })

            const txHash = await writeContract(config, {
                ...account,
                ...data,
            })

            const txPendingData = waitForTransactionReceipt(config, {
                hash: txHash
            })
            toast.promise(txPendingData, {
                pending: "Waiting for pending... 👌",
            }, toastConfig);

            const txData = await txPendingData;
            if (txData && txData.status === "success") {
                toast.success(`Successfully contributed ${formatNumber(parseFloat(amount))} $BEPE! 👍`, toastConfig)
            } else {
                toast.error("Error! Transaction is failed.", toastConfig);
            }
        } catch (error) {
            // console.log('unstake error: ', error)
            try {
                if (error?.shortMessage) {
                    toast.error(error?.shortMessage, toastConfig);
                } else {
                    toast.error("Unknown Error! Something went wrong.", toastConfig);
                }
            } catch (error) {
                toast.error("Error! Something went wrong.", toastConfig);
            }
        }
        try {
            if (setRefresh !== undefined && refresh !== undefined) {
                setRefresh(!refresh)
            }
        } catch (error) { }
        setPending(false)
        return
    }

    toast.warn(errMsg, toastConfig)
}
