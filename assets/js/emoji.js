const emojifilter = document.getElementById("emoji");
const output = document.getElementById("el-content__output-container");

const templateString = {
  listEntry: (emoji, name) => {
    return `<li class="el-content__list-entry col-xs-6 col-sm-4 col-md-3"><p class="el-content__liste-entry-smile" alt="${name}" title=":${name}:">${emoji}</p>` + templateString.copyButton(name);
  },
  readyEntry: () => {
    return `<li class="el-content__list-ready-entry col-cs-12">🎉</li>`;
  },
  copyButton: (emojiName) => {
    return `<button class="el-button btn" data-clipboard-text="` + emojiName + `">copy to clipboard</button>`;
  },
  noResultBox: () => {
    return `<li class="el-content__list-entry-noresult">😭</br>No results</li>`
  },
  errorBox: () => {
    return `<li class="el-content__list-entry-error">🙈</br>Error loading emojis</li>`
  },
}

const filter = (emojimap, query) => {

  if(query === ""){
    output.innerHTML =  templateString.readyEntry();
    return;
  }

  result = Object.entries(emojimap).filter(([name, emoji]) => name.includes(query) || emoji === query)

  if(result.length > 0){
    output.innerHTML = result.map(([name, emoji]) => templateString.listEntry(emoji, name)).join("")
  } else {
    output.innerHTML = templateString.noResultBox();
  }
}

fetch("https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json")
  .then(res => res.json())
  .then(emojimap => {
    filter(emojimap, "");
    emojifilter.oninput = (e) => {filter(emojimap, e.target.value)
    };
  })
  .catch(e => {
    output.innerHTML = templateString.errorBox();
});

/**
 * Initialize Cliboard-plugin.
 */
new Clipboard(".el-button");

