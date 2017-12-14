const emojifilter = document.getElementById("emoji");
const output = document.getElementById("output");

const filter = (emojimap, query) => {
  if(query === ""){
    output.innerHTML = "<li>ready</li>"
    return;
  }

  result = Object.entries(emojimap).filter(([name, emoji]) => name.includes(query) || emoji === query)
  if(result.length > 0){
    output.innerHTML = result.map(([name, emoji]) => `<li>${emoji} :${name}:</li>`).join("")
  } else {
    output.innerHTML = "<li>no results</li>"
  }
}

fetch("https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json")
  .then(res => res.json())
  .then(emojimap => {
    filter(emojimap, "");
    emojifilter.oninput = (e) => {filter(emojimap, e.target.value)};
  })
  .catch(e => {
    output.innerHTML = "<li>could not load emoji list</li>"
  })

