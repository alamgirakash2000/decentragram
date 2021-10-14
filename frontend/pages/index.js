import "../styles/index.scss";
import Head from "next/head";
import web3 from "../src/web3";
import decentragram from "../src/Decentragram";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
const IPFS = require("ipfs-mini");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default function Home() {
  const [user, setUser] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [buffer, setBuffer] = useState();

  useEffect(() => {
    loadBlockchain();
    console.log(imageCount);
  }, []);

  const loadBlockchain = async () => {
    const users = await web3.eth.getAccounts();
    const imageCount = await decentragram.methods.imageCount().call();
    setUser(users[0]);
    setImageCount(imageCount);
  };

  return (
    <>
      <Head>
        <title>Decentragram-Dapp</title>
        <meta
          name='description'
          content='This is decentralized clone of instagram'
        />
      </Head>

      <main>
        <Header user={user} />
        <div className='container'>
          <ImageUpload ipfs={ipfs} buffer={buffer} setBuffer={setBuffer} />
        </div>
      </main>
    </>
  );
}
