import "../styles/index.scss";
import Head from "next/head";
import web3 from "../src/web3";
import decentragram from "../src/Decentragram";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
import ImagePreview from "../components/ImagePreview";
import Loading from "./../components/Loading";

export default function Home() {
  const [user, setUser] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  let arr = [];

  useEffect(() => {
    loadBlockchain();
  }, []);

  // Load Blockchain data like name, imageCount and user
  const loadBlockchain = async () => {
    setLoading(true);
    const users = await web3.eth.getAccounts();
    setUser(users[0]);
    let imagesCount = await decentragram.methods.imageCount().call();
    setImageCount(imagesCount);

    // Load Images
    for (let i = 1; i <= imagesCount; i++) {
      const image = await decentragram.methods.images(i).call();
      arr.push(image);
    }
    setImages(arr);
    setLoading(false);
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

      <main className='body'>
        {loading && <Loading />}
        <Header user={user} />
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <ImageUpload user={user} setLoading={setLoading} />
            </div>
            <div className='col-md-8'>
              {images.reverse().map((img) => (
                <ImagePreview
                  user={user}
                  key={img.id}
                  image={img}
                  setLoading={setLoading}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
