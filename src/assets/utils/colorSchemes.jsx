export default function randomColorScheme() {
  let colorSchemes = [
    { background: "#FFEF02", font: "#00FE03" }, // vetted
    { background: "#00FE03", font: "#FE01FE" }, // vetted
    { background: "#FE01FE", font: "#ffffff" }, // vetted
    { background: "#012AFF", font: "#eeff5a" }, // vetted
  ];

  let randomNumber = Math.floor(Math.random() * colorSchemes.length);

  return colorSchemes[randomNumber];
}
