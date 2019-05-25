# 神奇記帳本


 ## 使用Express & MySQL 打造的網頁，將所有的開銷都記錄下來。

 ## Pic

 ![畫面截圖](https://imgur.com/Qks2ges.jpg)

 ## Env Setting

 - [MySQL](https://downloads.mysql.com/archives/) - Database

 * [Node.js](https://nodejs.org/en/) - JavaScript runtime built

 - [Express](https://expressjs.com/zh-tw/starter/installing.html) - Node.js web framework

 在 [facebook for developers](https://developers.facebook.com/) 創一個新的應用程式，取得App的編號 (ID)和密鑰 (SECRET)

 開啟程式碼編輯器，在根目錄底下創建一個 `.env` 檔，輸入 ID 與 Secret

 ```
FACEBOOK_ID=******
FACEBOOK_SECRET=******
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

 ## Installing

 #### 安裝下載並啟動專案

 啟動 MySQL 資料庫，開啟終端機並下載專案，完成後會顯示 Done 訊息

 ```
git clone https://github.com/sukoyao/Expenses-MySQL.git
```

 從終端機導入目標檔案，並下載工具包

 ```
npm install
```

 開啟本地伺服器。

 ```
node app.js
```

 成功連結後，瀏覽器輸入 http://localhost:3000
網頁即可運行並執行動作。

 ## Register & Login

 #### 登入帳號即可使用網頁功能

- 使用者可以進行一般帳密註冊
- 使用者可以透過 Facebook 進行第三方登入
- 使用者登入、註冊時會依據狀況出現提示訊息

 ## Features

 #### 功能

- 可瀏覽全部的總花費與開支紀錄
- 使用月份欄快速查詢開支
- 使用類別欄快速查詢開支
- 點擊 `新增支出` 可新增開支紀錄
- 點擊 `修改` 可修改開支紀錄
- 點擊 `刪除` 可移除開支紀錄

 ## Contributor

 [Yao](https://github.com/sukoyao)
