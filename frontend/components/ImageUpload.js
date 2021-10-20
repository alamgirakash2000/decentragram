import React, { useState } from "react";
import decentragram from "../src/Decentragram";

import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

export default function ImageUpload({ user, setLoading }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // A function to upload image on ipfs and blockchain
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const added = await client.add(image);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      // Add to Blockchain
      await decentragram.methods
        .uploadImage(added.path, description)
        .send({ from: user })
        .on("transactionHash", (hash) => {
          setLoading(false);
          window.alert(
            "Image upload successful! It may take sometime to be updated. Please refresh sometimes later to see the update."
          );
        });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <div className='uploadImage'>
      <form action='' onSubmit={submitHandler} className='uploadImage__form'>
        <h1>Upload an Image with description:</h1>
        <textarea
          required
          type='text'
          className='my-3'
          placeholder='Write a description for your image'
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type='file'
          accepts='image/*'
          placeholder='choose an image'
          required
          onChange={handleImageSelect}
        />
        <button type='submit' className='btn-lg btn-success my-3'>
          Submit
        </button>
      </form>
    </div>
  );
}
