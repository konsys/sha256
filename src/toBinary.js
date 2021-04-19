const toBinaryArray = (input) => {
  const result = input.split("").reduce((acc, v) => {
    const bin = v.charCodeAt().toString(2);
    const binaryValue = Array(8 - bin.length + 1).join("0") + bin;
    acc.push(binaryValue);
    return acc;
  }, []);
  return result;
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

module.exports = {
  toBinaryArray,
  binaryHello,
  addedNulls,
  binaryAddNulls,
  word,
  addedLength,
};
