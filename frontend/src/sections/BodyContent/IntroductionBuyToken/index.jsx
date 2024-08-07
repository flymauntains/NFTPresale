import GradientButton from "src/components/GradientButton"
import PageHeader from "./PageHeader"
import First from "@assets/images/first.png"
import zkSync from "@assets/images/zksync.png"
import Syncswap from "@assets/images/syncswap.png"

import Second1 from "@assets/images/second-1.png"
import Second2 from "@assets/images/second-2.png"
import Second3 from "@assets/images/second-3.png"
import Link from "next/link"

const SocialItems = [
    {
        item: zkSync,
        href: "/zkSync"
    },
    {
        item: Syncswap,
        href: "/syncswap"
    }
]

const IntroductionBuyToken = () => {
    
    return (
        <div className="w-full flex flex-col justify-items-start h-fit z-50">
            <div className="p-6 pt-0">
                <PageHeader pageTitle="$SOB TOKEN PRESALE" />
                <div className="lg:text-xl text-sm text-white font-normal lg:w-7/12 ">
                    The SOB Token is a gateway to the new SOB world. It integrates with all products, serving as a tool to accelerate processes. For more information, read the GitBook.
                </div>
                <GradientButton name="GITBOOK" style={{ width: '13rem' }}/>
                <div className="w-full flex mt-3 justify-between lg:pr-28">
                    {SocialItems.map((social, index) => {
                        return (
                            <Link href={social.href} key={`${social}_${index}`}>
                                <img className="cursor-pointer max-lg:w-60" src={social.item.src} alt={social.item} />
                            </Link>
                        )
                    })}
                </div>
            </div>
            {/* <img className="lg:fixed lg:w-[36rem] bottom-0 left-0 w-full" src={First.src} alt="First" /> */}
            <div className="flex w-full items-end">
                <img className="lg:fixed lg:bottom-0 lg:left-0 lg:w-[26rem] w-[12rem] lg:h-80 h-40" src={Second1.src} alt="First" />
                <img className="lg:fixed lg:bottom-0 lg:left-96 lg:w-[26rem] w-[12rem] lg:h-80 h-40" src={Second3.src} alt="First" />
                <img className="lg:fixed lg:bottom-0 lg:left-32 lg:w-[33rem] w-[16rem] lg:ml-0 ml-[-20rem] lg:h-96 h-56" src={Second2.src} alt="First" />
            </div>
        </div>
    )
}

export default IntroductionBuyToken