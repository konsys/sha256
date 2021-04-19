// содежимое index.js
const http = require("http");
const sha256 = require("js-sha256");
const port = 3000;

const requestHandler = (request, response) => {
  console.log(request.url);

  const word = "hello world";

  let res = sha256("hello world") + "-> " + text2Binary(word);
  response.end(res);
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});

function text2Binary(string) {
  return string
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");
}
