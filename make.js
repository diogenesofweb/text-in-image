const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const width = 1200;
const height = 630;
const midWidth = width / 2;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

loadImage("./card-empty.png").then((image) => {
  // 1 step
  ctx.drawImage(image, 0, 0, width, height);

  // 2 step
  ctx.font = "bold 60pt Nimbus Mono PS";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0.33, "hsla(200, 100%, 75%, 1)");
  gradient.addColorStop(0.66, "hsla(300, 100%, 75%, 1)");
  ctx.fillStyle = gradient;

  const text = "*** /To be /or /not to be /***";
  const lines = text.split(" /");

  const paddingTop = 60;
  const lineHeight = 90;

  lines.forEach((line, i) => {
    ctx.fillText(line, midWidth, paddingTop + lineHeight * i);
  });

  // 3 step
  ctx.fillStyle = "hsla(300, 100%, 75%, .75)";
  ctx.font = "bold 30pt monospace";
  ctx.fillText("*** www.example.com ***", midWidth, height - 100);

  // 4 step
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("card-with-text.png", buffer);
});
