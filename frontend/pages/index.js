import { Fragment } from "react";
import Layout from "@components/Layout";
import SEO from "@components/SEO";
import Header from "@sections/Header/Header";

import LeftBackground from "@assets/images/left-background.png";
import RightBackground from "@assets/images/right-backgroud.png";

import Introduction from "src/sections/BodyContent/Introduction";
import Contribute from "src/sections/BodyContent/Contribute";

export default function ContributePage() {
  return (
    <Fragment>
      <SEO title="$SOB" />
      <Layout>
        <div className="h-full w-screen">
          <div className="fixed flex lg:flex-row flex-col">
            <img className="lg:w-1/2 h-[1800px] border-r border-solid border-[#FF56F6]" src={LeftBackground.src} alt="LeftBackground" />
            <img className="lg:w-1/2 lg:flex hidden" src={RightBackground.src} alt="RightBackground" />
          </div>
          <Header />
          <div className="flex w-full lg:h-full lg:flex-row flex-col">
            <Introduction />  
            <Contribute />
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}


