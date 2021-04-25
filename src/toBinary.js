const toBinaryArray = (input) => {
  if (typeof input === "string") {
    const result = input.split("").reduce((acc, v) => {
      const bin = v.charCodeAt().toString(2);
      const binaryValue = Array(8 - bin.length + 1).join("0") + bin;
      acc.push(binaryValue);
      return acc;
    }, []);
    return result;
  } else if (typeof input === "number") {
    return dec2bin(input);
  }
};

const binaryHello = [
  "01101000",
  "01100101",
  "01101100",
  "01101100",
  "01101111",
  "00100000",
  "01110111",
  "01101111",
  "01110010",
  "01101100",
  "01100100",
];

const word = "hello world";

const addedNulls =
  "01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100 10000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000"; // 51

const addedLength = (512 - 64) / 8;

const binaryAddNulls = (input) => {
  if (input.length < addedLength) {
    input.push("10000000");
    for (let i = 0; i < addedLength; i++) {
      if (i < input.length) {
        continue;
      }
      input.push("00000000");
    }
  }
  return input;
};

function dec2bin(dec) {
  return (dec >>> 0)
    .toString(2)
    .split("")
    .reduce((acc, v, i) => (acc += i % 8 === 0 && i > 0 ? " " + v : v), "");
}

module.exports = {
  toBinaryArray,
  binaryHello,
  addedNulls,
  binaryAddNulls,
  word,
  addedLength,
};
