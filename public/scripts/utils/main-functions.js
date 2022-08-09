const post = (url, body, callback) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => callback(json));
};
const patch = (url, body, callback) => {
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => callback(json));
};

const get = (url, callback) => {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json));
};
function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capPhrase(string) {
  const phraseArray = string.split(" ");
  const removeSpaces = phraseArray.filter((word) => word !== " ");
  const capped = removeSpaces.map((word) => cap(word.toLowerCase()));
  return capped.join(" ");
}
