const { sha256, UTF8toBlocks } = require("../sha256");
const { addedNulls, toBinaryArray } = require("../toBinary");
// const hwBinary =
//   "01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100 01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100 ";
// const blocks = UTF8toBlocks("hello world");
// let res = blocks.reduce((acc, v) => (acc += toBinaryArray(v)), "0");
// res = res
//   .split("")
//   .reduce((acc, v, i) => (acc += i % 8 === 0 && i > 0 ? " " + v : v), "");

test("simple hash test", () => {
  // expect(UTF8toBlocks("c")).toStrictEqual([
  //   1669332992,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   0,
  //   8,
  // ]);

  expect(UTF8toBlocks("ca")).toStrictEqual([
    1669332992,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    8,
  ]);

  // expect(sha256("c")).toStrictEqual(
  //   "2E7D2C03A9507AE265ECF5B5356885A53393A2029D241394997265A1A25AEFC6".toLowerCase()
  // );

  // expect(sha256("The quick brown fox jumps over the lazy dog")).toStrictEqual(
  //   "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592"
  // );

  // expect(sha256("семейства")).toStrictEqual(
  //   "ecda56fdfaa962f60f177a20c8454376cfc841f08df924efae01344c354e2a5f"
  // );
});

const k =
  "0x428a2f98 0x71374491 0xb5c0fbcf 0xe9b5dba5 0x3956c25b 0x59f111f1 0x923f82a4 0xab1c5ed5 0xd807aa98 0x12835b01 0x243185be 0x550c7dc3 0x72be5d74 0x80deb1fe 0x9bdc06a7 0xc19bf174 0xe49b69c1 0xefbe4786 0x0fc19dc6 0x240ca1cc 0x2de92c6f 0x4a7484aa 0x5cb0a9dc 0x76f988da 0x983e5152 0xa831c66d 0xb00327c8 0xbf597fc7 0xc6e00bf3 0xd5a79147 0x06ca6351 0x14292967 0x27b70a85 0x2e1b2138 0x4d2c6dfc 0x53380d13 0x650a7354 0x766a0abb 0x81c2c92e 0x92722c85 0xa2bfe8a1 0xa81a664b 0xc24b8b70 0xc76c51a3 0xd192e819 0xd6990624 0xf40e3585 0x106aa070 0x19a4c116 0x1e376c08 0x2748774c 0x34b0bcb5 0x391c0cb3 0x4ed8aa4a 0x5b9cca4f 0x682e6ff3 0x748f82ee 0x78a5636f 0x84c87814 0x8cc70208 0x90befffa 0xa4506ceb 0xbef9a3f7 0xc67178f2";
