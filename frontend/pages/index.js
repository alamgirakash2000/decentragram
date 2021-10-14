import "../styles/index.scss";
import Head from "next/head";
import web3 from "../src/web3";
import decentragram from "../src/Decentragram";

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJs Starter By Akash</title>
        <meta name='description' content='NextJs Starter By Akash' />
      </Head>

      <main className='home text-center'>
        <h1>
          <i>NextJs Starter By Akash</i>
        </h1>
        <p></p>
      </main>
    </>
  );
}
