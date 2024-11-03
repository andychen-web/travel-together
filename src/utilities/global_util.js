import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// 過濾圖片格式
export const filterImgFormat = (data) => {
  const imageFormats = [".jpg", ".png", ".gif", ".JPG"];
  const result = data.filter((element) =>
    imageFormats.some((format) => element.Picture.PictureUrl1?.endsWith(format))
  );
  return result;
};
// ISO 轉民國日期
export function ISOtoROCTime(dateString, separator) {
  const date = new Date(dateString);
  const year = (date.getFullYear() - 1911).toString().padStart(3, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  if (separator) {
    return `${year}${separator}${month}${separator}${day}`;
  }
  return `${year}${month}${day}`;
}
// 民國日期轉 ISO
export function ROCDateToISO(dateString, separator) {
  let year;
  let month;
  let day;
  if (separator) {
    const parts = dateString.split(separator);

    year = (+parts[0] + 1911).toString();
    month = parts[1].padStart(2, "0");
    day = parts[2].padStart(2, "0");
  } else {
    year = +dateString.substring(0, 3) + 1911;
    month = dateString.substring(3, 5);
    day = dateString.substring(5, 7);
  }
  return DateConvertToIsoStr(new Date(`${year}-${month}-${day}`));
}
//日期轉ios字串
export function DateConvertToIsoStr(date) {
  if (date === undefined || date == null) {
    return null;
  } else {
    return date.toISOString();
  }
}

// 產生 UUID / GUID
// 引用:https://cythilya.github.io/2017/03/12/uuid/
export function gen_uuid() {
  let d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
// 取得今日(民國)
export const getROCTimeToday = () => {
  let date = new Date();
  return (
    date.getFullYear() -
    1911 +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(date.getDate()).padStart(2, "0")
  );
};

// 查詢條件處理
export function filterHandle(filter) {
  for (let key in filter) {
    if (filter[key] === "" || filter[key] === undefined) {
      delete filter[key];
    }
  }
  return filter;
}
// 省略符
export const createEllipsis = (string, maxLength) => {
  return string?.length > maxLength
    ? string.slice(0, maxLength) + "..."
    : string;
};

// toast 錯誤通知
export const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
  });
};
// toast 成功通知
export const showToast = ({ message, type }) => {
  if (type === "SUCCESS") {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  } else if (type === "ERROR") {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  }
};

// 多個loading處理
export const updateLoadingArrayState = (setLoadingArray, index, value) => {
  setLoadingArray((arr) => {
    const newArr = [...arr];
    newArr[index] = value;
    return newArr;
  });
};
//****************
// 瀏覽器 tab跳窗
//****************
export function openNewWindow(path) {
  // 若Public Path有改
  // const newWindow = window.open(
  //   process.env.NODE_ENV === "production"
  //     ? process.env.REACT_APP_PRODUCTION_PUBLIC_PATH + path
  //     : path,
  //   "_blank"
  // );
  const newWindow = window.open(path, "_blank");

  if (!newWindow) {
    notifyError("操作失敗，請允許瀏覽器彈出窗");
  }
  return newWindow;
}
