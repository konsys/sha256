/*
 * js-sha256 v0.1.1
 * https://github.com/emn178/js-sha256
 *
 * Copyright 2014, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

const { toBinaryArray } = require("./toBinary");

("use strict");

const HEX_CHARS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
const HEX_TABLE = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

const K = [
  0x428a2f98,
  0x71374491,
  0xb5c0fbcf,
  0xe9b5dba5,
  0x3956c25b,
  0x59f111f1,
  0x923f82a4,
  0xab1c5ed5,
  0xd807aa98,
  0x12835b01,
  0x243185be,
  0x550c7dc3,
  0x72be5d74,
  0x80deb1fe,
  0x9bdc06a7,
  0xc19bf174,
  0xe49b69c1,
  0xefbe4786,
  0x0fc19dc6,
  0x240ca1cc,
  0x2de92c6f,
  0x4a7484aa,
  0x5cb0a9dc,
  0x76f988da,
  0x983e5152,
  0xa831c66d,
  0xb00327c8,
  0xbf597fc7,
  0xc6e00bf3,
  0xd5a79147,
  0x06ca6351,
  0x14292967,
  0x27b70a85,
  0x2e1b2138,
  0x4d2c6dfc,
  0x53380d13,
  0x650a7354,
  0x766a0abb,
  0x81c2c92e,
  0x92722c85,
  0xa2bfe8a1,
  0xa81a664b,
  0xc24b8b70,
  0xc76c51a3,
  0xd192e819,
  0xd6990624,
  0xf40e3585,
  0x106aa070,
  0x19a4c116,
  0x1e376c08,
  0x2748774c,
  0x34b0bcb5,
  0x391c0cb3,
  0x4ed8aa4a,
  0x5b9cca4f,
  0x682e6ff3,
  0x748f82ee,
  0x78a5636f,
  0x84c87814,
  0x8cc70208,
  0x90befffa,
  0xa4506ceb,
  0xbef9a3f7,
  0xc67178f2,
];

const sha256 = (message) => {
  return sha2(message, true);
};

const sha224 = (message) => {
  return sha2(message, false);
};

const sha2 = (message, is256) => {
  if (!is256) {
    is256 = true;
  }

  const blocks = isUTF8(message)
    ? UTF8toBlocks(message)
    : ASCIItoBlocks(message);

  let h0 = 0xc1059ed8;
  let h1 = 0x367cd507;
  let h2 = 0x3070dd17;
  let h3 = 0xf70e5939;
  let h4 = 0xffc00b31;
  let h5 = 0x68581511;
  let h6 = 0x64f98fa7;
  let h7 = 0xbefa4fa4;
  if (is256) {
    h0 = 0x6a09e667;
    h1 = 0xbb67ae85;
    h2 = 0x3c6ef372;
    h3 = 0xa54ff53a;
    h4 = 0x510e527f;
    h5 = 0x9b05688c;
    h6 = 0x1f83d9ab;
    h7 = 0x5be0cd19;
  }

  for (let i = 0; i < blocks.length; i += 16) {
    let w = [],
      s0,
      s1;

    for (let j = 0; j < 16; ++j) {
      w[j] = blocks[i + j];
    }

    for (let j = 16; j < 64; ++j) {
      s0 =
        rightrotate(w[j - 15], 7) ^
        rightrotate(w[j - 15], 18) ^
        (w[j - 15] >>> 3);
      s1 =
        rightrotate(w[j - 2], 17) ^
        rightrotate(w[j - 2], 19) ^
        (w[j - 2] >>> 10);
      w[j] = w[j - 16] + s0 + w[j - 7] + s1;
    }

    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    let f = h5;
    let g = h6;
    let h = h7;
    let maj, t1, t2, ch;

    for (let j = 0; j < 64; ++j) {
      s0 = rightrotate(a, 2) ^ rightrotate(a, 13) ^ rightrotate(a, 22);
      maj = (a & b) ^ (a & c) ^ (b & c);
      t2 = s0 + maj;
      s1 = rightrotate(e, 6) ^ rightrotate(e, 11) ^ rightrotate(e, 25);
      ch = (e & f) ^ (~e & g);
      t1 = (h + s1 + ch + K[j] + w[j]) & 0xffffffff;

      h = g;
      g = f;
      f = e;
      e = d + t1;
      d = c;
      c = b;
      b = a;
      a = t1 + t2;
    }

    h0 += a;
    h1 += b;
    h2 += c;
    h3 += d;
    h4 += e;
    h5 += f;
    h6 += g;
    h7 += h;
  }

  let hex =
    toHexString(h0) +
    toHexString(h1) +
    toHexString(h2) +
    toHexString(h3) +
    toHexString(h4) +
    toHexString(h5) +
    toHexString(h6);
  if (is256) {
    hex += toHexString(h7);
  }
  return hex;
};

const rightrotate = (x, c) => {
  return (x >>> c) | (x << (32 - c));
};

const toHexString = (num) => {
  let hex = "";
  for (let i = 0; i < 4; i++) {
    const offset = (3 - i) << 3;
    hex +=
      HEX_CHARS[(num >> (offset + 4)) & 0x0f] +
      HEX_CHARS[(num >> offset) & 0x0f];
  }
  return hex;
};

const isUTF8 = (message) => {
  let i = message.length;
  while (i--) {
    if (message.charCodeAt(i) > 127) {
      return true;
    }
  }
  return false;
};

const ASCIItoBlocks = (message) => {
  // a block is 32 bits(4 bytes), a chunk is 512 bits(64 bytes)
  const length = message.length;
  const chunkCount = ((length + 8) >> 6) + 1;
  const blockCount = chunkCount << 4; // chunkCount * 16
  const blocks = [];
  let i;
  for (i = 0; i < blockCount; ++i) {
    blocks[i] = 0;
  }

  for (i = 0; i < length; ++i) {
    blocks[i >> 2] |= message.charCodeAt(i) << ((3 - (i % 4)) << 3);
  }

  blocks[i >> 2] |= 0x80 << ((3 - (i % 4)) << 3);
  blocks[blockCount - 1] = length << 3; // length * 8
  return blocks;
};

const UTF8toBlocks = (message) => {
  const uri = encodeURIComponent(message);

  const blocks = [];
  let bytes = 0;

  for (let i = 0; i < uri.length; i++) {
    let c = uri.charCodeAt(i);

    // 37 - пробел
    if (c === 37) {
      const tb =
        ((HEX_TABLE[uri.charAt(++i)] << 4) | HEX_TABLE[uri.charAt(++i)]) <<
        ((3 - (bytes % 4)) << 3);

      const tr = tb << 4;

      blocks[bytes >> 2] |= tb;
    } else {
      const r = 3 - (bytes % 4); // 3 2 1 0 3 2 1 0...

      const r1 = r << 3; // умножаем на 8 (24, 16, 8, 0, 24, 16, 8, 0...)
      const bytesMult = bytes >> 2; // делим на 4 без дробной части (0 0 0 0 1 1 1 1 2 2 2 2 3 3 3 3 4...)

      console.log(11111, toBinaryArray(blocks[bytesMult]));
      blocks[bytesMult] = blocks[bytesMult] | (c << r1);
      console.log(22222, toBinaryArray(c << r1));
      console.log(33333, c, r1, c << r1);
    }

    ++bytes;
  }

  const chunkCount = ((bytes + 8) >> 6) + 1;

  const blockCount = chunkCount << 4; // chunkCount * 16
  const index = bytes >> 2;
  blocks[index] |= 0x80 << ((3 - (bytes % 4)) << 3);

  for (let i = index + 1; i < blockCount; i++) {
    blocks[i] = 0;
  }

  blocks[blockCount - 1] = bytes << 3; // bytes * 8

  return blocks;
};

module.exports = { sha256, sha224, UTF8toBlocks };
