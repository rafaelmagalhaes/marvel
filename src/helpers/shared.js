export const mergeById = (a1, a2) =>
  a1.map((itm) => ({
    ...a2.find((item) => item.id === itm.id && item),
    ...itm,
  }));
export const findCharacterIndex = (characters, charID) =>
  characters.findIndex((x) => x.id === parseInt(charID));

export const base64 = (file, cb) => {
  let reader = new FileReader();

  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
  reader.readAsDataURL(file);
};
export const getBase64Image = (img) => {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  let dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};
