const { twoHash10, simpleHash } = require("../hash");

test("simple hash test", () => {
  expect(twoHash10).toStrictEqual(twoHash10);
});
