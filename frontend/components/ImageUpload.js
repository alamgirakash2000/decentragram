import React, { useState } from "react";
import ipfs from "../src/ipfs";
import decentragram from "../src/Decentragram";

export default function ImageUpload({ user }) {
  const [description, setDescription] = useState("");
  const [buffer, setBuffer] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    // upload image to IPFS
    ipfs.add(buffer, (error, result) => {
      if (error) {
        console.log(error);
        window.alert(error.message);
      }

      console.log(result);
      // Add data to the Blockchain
      decentragram.methods
        .uploadImage(result[0].hash, description)
        .send({ from: user })
        .on("transactionHash", (hash) => {
          setLoading(false);
        });
    });
  };

  return (
    <div className='uploadImage'>
      <form action='' onSubmit={submitHandler} className='uploadImage__form'>
        <h1>Upload an Image with description:</h1>
        <input
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
