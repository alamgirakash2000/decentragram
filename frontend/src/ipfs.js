import IpfsApi from "ipfs-api";

const ipfsApi = IpfsApi({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default ipfsApi;
