export const filterImgFormat = (data) => {
  const imageFormats = [".jpg", ".png", ".gif", ".JPG"];
  const result = data.filter((element) =>
    imageFormats.some((format) => element.Picture.PictureUrl1?.endsWith(format))
  );
  return result;
};
