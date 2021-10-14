import React, { useState } from "react";

//QmWLKrTQRhyDcgPiPCLLoLssh5MA4DvLRQc1YEey34RSa3

export default function ImageUpload({ buffer, setBuffer, ipfs }) {
  const [image, setImage] = useState({});
  const [description, setDescription] = useState("");

  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const file = URL.createObjectURL(image);

    ipfs.add(image, (err, result) => {
      if (err) {
        window.prompt(err.message);
        console.log(err);
      } else {
        console.log("https://ipfs.infura.io/ipfs/" + result);
      }
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
