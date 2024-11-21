const { test, expect } = require("@playwright/test");
// test routes (可以從router index 跑迴圈取得)
const testRoutes1 = [
  "/",
  "/login",
  "/register",
  "/account",
  "/account/places",
  "/account/places/new",
  "/account/places/1",
  "/place/1",
  "/account/bookings",
  "/account/bookings/1",
];
// const baseUrlOfficial = "https://cloud-demo.sjen.com.tw/chc-demo-f";
const baseUrlTest = "https://ease-nest.netlify.app";


// TODO response body不知為何取不到
test(`get all responses`, async ({ page }) => {
  let errs = [];
  let okRes = [];
  let bodyPromises = []; // Array to store promises for body parsing
  // Intercept responses
  page.on("response", (response) => {
    // method
    const request = response.request();
    const method = request.method();
    const status = response.status();
    // request bearer token
    // const header = request.headers();
    // const token = header["Authorization"];
    // console.log(header);
    // if (!response.ok()) {
    //   // Ignore redirect responses
    //   if (status >= 300 && status < 400) {
    //     // console.log(`Redirect response ignored: ${response.url()} (${status})`);
    //     return;
    //   }

    //   // Create a placeholder for this error
    //   const err = {
    //     url: response.url(),
    //     status: response.status(),
    //     method: method,
    //   };
    //   // Push the error into the list
    //   errs.push(err);

    //   // Process the body and add it to the error object
    //   const bodyPromise = response.body().then((bodyBuffer) => {
    //     const bodyText = bodyBuffer.toString("utf-8");
    //     try {
    //       err.body = JSON.parse(bodyText); // Parse JSON if possible
    //     } catch (e) {
    //       err.body = bodyText; // Use raw text if JSON parsing fails
    //     }
    //   });

    //   // Store the promise for later synchronization
    //   bodyPromises.push(bodyPromise);
    // } else {
    // }
    // Ignore redirect responses
    if (status >= 300 && status < 400) {
      // console.log(`Redirect response ignored: ${response.url()} (${status})`);
      return;
    }

    if (!response.url().includes(baseUrlTest)) return;
    const res = {
      url: response.url(),
      status: response.status(),
      method: method,
    };

    okRes.push(res);
    // Process the body and add it to the error object
    // TODO 有bug待改
    const bodyPromise = response.body().then((bodyBuffer) => {
      const bodyText = bodyBuffer.toString("utf-8");
      // console.log(bodyText);
      // try {
      //   res.body = JSON.parse(bodyText); // Parse JSON if possible
      // } catch (e) {
      //   res.body = bodyText; // Use raw text if JSON parsing fails
      // }
      // console.log(res.body);
    });

    // // Store the promise for later synchronization
    // bodyPromises.push(bodyPromise);
  });
  // Navigate through the routes
  for (const path of testRoutes1) {
    await page.goto(`${baseUrlTest}${path}`);
  }

  // Wait for all body promises to complete
  // await Promise.all(bodyPromises);

  // // Now log the errors after all bodies are processed
  // const uniqErrs = errs.filter((current, index, arr) => {
  //   return arr.findIndex((item) => item.url === current.url) === index;
  // });
  // console.log("uniqErrs", uniqErrs);

  const uniqRes = okRes.filter((current, index, arr) => {
    return arr.findIndex((item) => item.url === current.url) === index;
  });

  console.log("uniqRes", uniqRes);
});

// TODO 新增編輯刪除可能以postman "Run Folder"測試較容易
