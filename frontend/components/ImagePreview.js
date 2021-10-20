import React, { useState } from "react";
import Identicon from "identicon.js";
import Web3 from "web3";
import decentragram from "../src/Decentragram";

export default function ImagePreview({ image, user, setLoading }) {
  const sendTip = async () => {
    setLoading(true);
    let tipAmount = Web3.utils.toWei("0.01", "Ether");
    try {
      await decentragram.methods.tipImageOwner(image.id).send({
        from: user,
        value: tipAmount,
      });
      setLoading(false);
      window.alert(
        "Tip send success!  It may take sometime to be updated. Please refresh sometimes later to see the update."
      );
    } catch (err) {
      console.log(err);
      window.alert(err.message);
    }
  };

  return (
    <div className='imagePreview'>
      <div className='imagePreview__head'>
        <img
          className='ml-2'
          width='30'
          height='30'
          src={`data:image/png;base64,${new Identicon(
            image.author,
            30
          ).toString()}`}
        />
        <div className='p-3'>
          <p>{image.author}</p>
        </div>
      </div>

      <div className='imagePreview__body'>
        <p className='mb-2'>{image.description}</p>
        <img src={`https://ipfs.io/ipfs/${image.hash}`} />
      </div>

      <div className='imagePreview__footer'>
        <p>
          <b>
            Tipped Amount:{" "}
            <span className='text-success'>
              {Web3.utils.fromWei(image.tipAmount, "Ether")}
            </span>{" "}
            ETH
          </b>
        </p>
        <button onClick={sendTip} className='btn btn-success'>
          Tip 0.01 ETH
        </button>
      </div>
    </div>
  );
}
