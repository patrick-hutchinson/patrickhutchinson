export default function randomColorScheme() {
  let colorSchemes = [
    { background: "#FE1B1C", font: "#fff" }, // vetted
    { background: "#00FE03", font: "#121111" }, // vetted
    { background: "#03FFFF", font: "#012AFF" }, // vetted
    { background: "#03FFFF", font: "#eeff5a" }, // vetted
    { background: "#FE1B1C", font: "#00FE03" }, // vetted
    { background: "##FFEF02", font: "#00FE03" }, // vetted
    { background: "#00FE03", font: "#FE01FE" }, // vetted
    { background: "#FE01FE", font: "##fff" }, // vetted
    { background: "#012AFF", font: "#eeff5a" }, // vetted
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
