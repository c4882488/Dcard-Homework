## Dcard Homework 2023

### 執行專案

設定.evn檔案

```
REACT_APP_CLIENT_ID=xxx
REACT_APP_CLIENT_SECRETS=xxx
```

執行專案

```
npm install && npm run start
```

---



### Demo

[heroku](https://dcardhomework.herokuapp.com/)

---



### 專案架構

```
src/
├── components/
│   ├── HomeAppBar.js
│   ├── ProjectStatus.js
│   ├── ProjectStatusItem.js
│   ├── FormModal.js
│   ├── TaskForm.js
│   ├── TaskList.js
│   ├── TaskListItem.js
│   └── useInput.js
├── pages/
│   ├── Callback.js
│   ├── HomePage.js
│   └── TaskPage.js
├── utils/
│   ├── query.js
│   └── api.js
├── App.js
└── index.js
```

- `App.js` 是 React App 的進入點，配置路由和其他全局配置。

- `index.js` 是 React App 的渲染點，負責將 App 渲染至指定 DOM 上。

- `components/` 存放所有共用的 React component。
  
  - `HomeAppBar.js` 為 NavBar
  
  - `ProjectStatus.js` 為 Task 狀態下拉選單
  
  - `ProjectStatusItem.js` 為 Task 狀態下拉選單選項
  
  - `FormModal.js` 為彈出視窗模組
  
  - `TaskForm.js` 為 Task 新增/修改表單
  
  - `TaskList.js` 為 Task 列表
  
  - `TaskListItem.js` 為 Task 資料顯示
  
  - `useInput.js` 為 Task 表單驗證

- `pages/` 存放所有頁面 component，比如 HomePage.js、TaskPage.js 等。
  
  - `Callback.js` 為 Github Oath 導向頁面
  
  - `HomePage.js` 為首頁
  
  - `TaskPage.js` 為 Task 頁面

- `utils/` 存放所有與 API 互動的 function，比如 api.js 等。
  
  - `api.js` 為呼叫 Github api function
  
  - `query.js` 為呼叫 Github Graphql api

---



### 改進

- [ ] `query.js` 可以改成用apollo-server、graphql來寫

- [ ] 共用變數可以改成redux
