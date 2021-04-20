const { twoHash10, simpleHash } = require("../hash");

test("simple hash test", () => {
  expect(simpleHash(2)).toStrictEqual(twoHash10);
});
