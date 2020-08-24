require("es6-promise").polyfill();
require("isomorphic-fetch");

var args = process.argv.slice(2);

function handle_error(res) {
  if (!res.ok) {
    throw new Error(`${res.statusText}: Please try again.`);
  }
  return res;
}

switch (args[0]) {
  case "-help":
  case "-h":
  case "help":
    console.log(
      "Usage: node index.js [GitHub Username]\nTo fetch given username's public repositories.\n\nOptions:\n-help / -h\t\t\tShow this help message."
    );
    break;
  default:
    fetch(`https://api.github.com/users/${args[0]}/repos`)
      .then(handle_error)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(`${args[0]}'s Public Repositories are:\n`);
        for (let i = 0; i < data.length; i++) {
          const repo = data[i];
          console.log(repo.name);
        }
      })
      .catch((error) => console.log(error));
    break;
}
