const {
  toBinaryArray,
  binaryHello,
  addedNulls,
  binaryAddNulls,
  word,
} = require("../toBinary");

// https://tproger.ru/translations/sha-2-step-by-step/

const toBinary = toBinaryArray(word);

test("binary split test", () => {
  expect(toBinary).toStrictEqual(binaryHello);
});

test("adds 1 + 2 to equal 3", () => {
  expect(binaryAddNulls(toBinary)).toStrictEqual(addedNulls.split(" "));
});
