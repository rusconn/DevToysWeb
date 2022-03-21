import type { NextPage } from "next";
import Head from "next/head";

import { staticPath } from "@/libs/$path";

const Page: NextPage = () => (
  <>
    <Head>
      <title>DevToysWeb</title>
      <link rel="icon" href={staticPath.favicon_ico} />
    </Head>
    <p>hello</p>
  </>
);

export default Page;
