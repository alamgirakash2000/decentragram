import web3 from "./web3";

const address = "0x8871A24C7129d736CFf960d07DdE07CfB2Bbb962";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

let contract = false;
if (web3) {
  contract = new web3.eth.Contract(abi, address);
}
export default contract;
