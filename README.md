# 台灣旅遊景點導覽網站

[前往網站連結](https://travel-taiwan-three.vercel.app/)

<img width="70%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/79246459/280512235-61249a15-115e-4acb-91ba-65dd197b71a2.png" alt="Your Image Description">

- 串接交通部 TDX API

- 參考[設計稿 Figma](https://www.figma.com/file/5HQAZ2bunGNKma2fwU0aNZ/The-F2E-3rd---Week1-%E5%8F%B0%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BD?node-id=5%3A1106)。

## 使用技術

- Bootstrap 5
- React
- 串接 [TDX API](https://tdx.transportdata.tw/)

## 功能
- 使用者能根據分類查詢景點、活動、餐廳，並查看相關旅遊文章
- 網站管理員能對旅遊相關文章進行增刪查改
    - 測試帳號 test@foo.com
    - 密碼 mytest

## 資料夾結構
```
└─src
    │
    ├─api                          # API 相關，使用 Axios
    │
    ├─assets                       # 圖片素材、stylesheets
    │
    ├─components                   # 可重用的元件
    │
    ├─hooks                        # 自定義hooks
    │
    ├─pages                        # 各頁面
    │
    └─utilities                    # 可重用的 consants、functions
```
