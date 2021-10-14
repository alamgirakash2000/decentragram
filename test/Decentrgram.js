const Decentrgram = artifacts.require("Decentragram.sol");

contract("Decentragram", () => {
  it("Should show the written data", async () => {
    const decentrgram = await Decentrgram.new();

    await decentrgram.set(20);
    const data = await decentrgram.get();
    assert(data.toString() === "20");
  });
});
