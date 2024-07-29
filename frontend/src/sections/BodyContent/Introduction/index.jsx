import GradientButton from "src/components/GradientButton";
import PageHeader from "./PageHeader";
import First from "@assets/images/first.png";
import zkSync from "@assets/images/zksync.png";
import Syncswap from "@assets/images/syncswap.png";

import Second1 from "@assets/images/second-1.png";
import Second2 from "@assets/images/second-2.png";
import Second3 from "@assets/images/second-3.png";
import Link from "next/link";

const SocialItems = [
  {
    item: zkSync,
    href: "/zkSync",
  },
  {
    item: Syncswap,
    href: "/syncswap",
  },
];

const Introduction = () => {
  return (
      <div className="w-full flex flex-col justify-items-start h-fit z-50">
          <div className="p-6 pt-0">
              <PageHeader pageTitle="$SOB TOKEN PRESALEs" />
              <div className="lg:text-xl text-sm text-white font-normal lg:w-7/12 ">
                  The SOB Token is a gateway to the new SOB world. It integrates with all products, serving as a tool to accelerate processes. For more information, read the GitBook.
              </div>
              <GradientButton name="GITBOOK" />
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
              <img className="lg:fixed lg:bottom-0 lg:left-0 lg:w-[36rem] w-[36rem] lg:h-80 h-40" src={First.src} alt="First" />
          </div>
      </div>
  )

//   return (
//     <div className="w-full flex flex-col items-center h-fit z-50 p-4 bg-[url('/images/buy_background.png')] bg-cover bg-center">
//       <div className="w-full max-w-[1200px] flex flex-col items-center p-6 pt-0">
//         <PageHeader pageTitle="$SOB TOKEN PRESALEs" />
//         <div className="text-lg lg:text-xl text-white font-normal lg:w-7/12 text-center lg:text-left mb-4">
//           The SOB Token is a gateway to the new SOB world. It integrates with
//           all products, serving as a tool to accelerate processes. For more
//           information, read the GitBook.
//         </div>
//         <GradientButton name="GITBOOK" />
//         <div className="w-full flex flex-wrap mt-3 justify-center lg:justify-start gap-4 lg:pr-28">
//           {SocialItems.map((social, index) => (
//             <Link href={social.href} key={`${social}_${index}`}>
//               <img
//                 className="cursor-pointer w-24 h-24 lg:w-32 lg:h-32"
//                 src={social.item.src}
//                 alt={social.item}
//               />
//             </Link>
//           ))}
//         </div>
//       </div>
//       {/* Image at the bottom */}
//       <div className="relative w-full flex justify-center lg:justify-start lg:bottom-0 lg:left-0 lg:w-[36rem] w-[80%] h-40 lg:h-80">
//         <img
//           className="w-full h-full object-cover"
//           src={First.src}
//           alt="First"
//         />
//       </div>
//     </div>
//   );
};

export default Introduction;
