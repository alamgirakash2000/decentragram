import "../styles/index.scss";
import Head from "next/head";
import web3 from "../src/web3";
import decentragram from "../src/Decentragram";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
import ImagePreview from "../components/ImagePreview";

export default function Home() {
  const [user, setUser] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadBlockchain();
  }, []);

  // Load Blockchain data like name, imageCount and user
  const loadBlockchain = async () => {
    const users = await web3.eth.getAccounts();
    setUser(users[0]);
    let name = await decentragram.methods.name().call();
    setName(name);
    let imagesCount = await decentragram.methods.imageCount().call();
    setImageCount(imagesCount);

    // Load Images
    for (let i = 1; i <= imagesCount; i++) {
      const image = await decentragram.methods.images(i).call();
      setImages([...images, image]);
    }
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
        <Header user={user} name={name} />
        <div className='container'>
          <ImageUpload user={user} />
        </div>
        <div className='container'>
          {images?.map((img) => (
            <ImagePreview user={user} key={img.id} image={img} />
          ))}
        </div>
      </main>
    </>
  );
}
