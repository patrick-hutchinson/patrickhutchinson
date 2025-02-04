export default function randomColorScheme() {
  let colorSchemes = [
    { background: "#bfff31", font: "1c1e69" }, // vetted
    { background: "#eeff5a", font: "#121111" }, // vetted
    { background: "#BBBDD3", font: "#6EFF5E" }, // vetted
    { background: "#5B7D36", font: "#4EF1EA" }, // vetted
    { background: "#CBC5FF", font: "#BF770E" }, // vetted
    { background: "#100F0F", font: "#FD3863" }, // vetted
    { background: "#515054", font: "#BFBFBF" }, // vetted
    { background: "#C0C4C1", font: "#D8F74D" }, // vetted
    { background: "#DC3A2D", font: "#0C1F7E" }, // vetted
  ];

  let randomNumber = Math.floor(Math.random() * colorSchemes.length);

  return colorSchemes[randomNumber];
}

// document.querySelector("body").style.backgroundColor = `#${bg_colours[randomcolor]}`;
// document.querySelector("body").style.color = `#${font_colours[randomcolor]}`;
// document.querySelector("a").style.color = `#${font_colours[randomcolor]}`;
//document.querySelector('a').style.borderBottom = `1px solid #${font_colours[randomcolor]}`;

// document.querySelector(":root").style.setProperty("--inverted-font-color", "#" + invertedFontColor);
// document.querySelector(":root").style.setProperty("--inverted-bg-color", "#" + invertedBGColor);
// document.querySelector(":root").style.setProperty("--visited-link", "#" + font_colours[randomcolor]);
