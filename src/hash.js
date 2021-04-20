const twoHash16 = 0x6a09e667;
const twoHash10 = 1779033703;

const twoDouble = 41421356237309510;

const simpleHash = (num) => {
  const sqr = Math.sqrt(num);
  const trunc = Math.trunc(sqr);
  const t = (trunc - sqr).toString();
  const afterDot = Number.parseInt(t.slice(3, t.length), 10);
  return Number.parseInt("4", 16);
};

module.exports = {
  simpleHash,
  twoHash16,
  twoHash10,
};
