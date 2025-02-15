
//這行程式碼從 React 物件中解構出 useState 和 useEffect 這兩個 Hook。
//因為使用的是 CDN 版本的 React，所以不能用 import，但 React 本身已經在全域可用，因此可以直接從 React 取出這些 Hook。
const { useState, useEffect } = React;



function App() {
  //定義 useState 來存放使用者資料
  //useState([])：建立一個狀態變數 users，初始值為 空陣列 []。因為api資料是陣列包著10筆物件
  //setUsers：當我們獲取 API 資料時，會呼叫這個函式來更新 users，並讓 React 重新渲染畫面。

  //為什麼要 useState？
  //當 users 更新時，React 會自動重新渲染 UI，這樣我們的資料才會出現在畫面上。
  //如果不使用 useState，資料改變時畫面不會更新。

  const [users, setUsers] = useState([]);

  //使用 useEffect 來取得 API 資料
  //useEffect 會在 元件載入時 自動執行這段程式碼
  //useEffect 在 React 中 負責處理副作用（side effects），例如 發送 API 請求、訂閱事件、操作 DOM，這些操作不應該直接寫在組件內，否則會導致 不必要的重複請求 或 錯誤行為。
  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=10")
      .then(
        //當 API 回應成功，我們用 setUsers 更新 users 狀態
        //response.data.results 是 API 回傳的 使用者陣列
        response => setUsers(response.data.results)
      )
      .catch(
        error => console.error("Error fetching data:", error)
      );
      //為什麼 useEffect 第二個參數是 []？
      //[] 代表 這個 Effect 只執行一次，就像 網頁載入時只執行一次 API 請求
      //如果沒有 []，每次狀態變更時，useEffect 都會執行，導致無限迴圈！
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        {
        /*用 .map() 遍歷 users 陣列，動態產生 UI 
        users 是 useState 儲存的資料，API 回傳後這裡就會有 5 筆資料
        .map((user, index) => ( ... )) 會 對 users 陣列的每個項目執行一次，並產生 HTML*/
        users.map((user, index) => (
          /*key={index}：React 要求每個動態列表的項目都有唯一的 key，這裡用 index（索引值） */
          <div key={index} className="col-md-4 bg-light p-3">
            <img src={user.picture.large} className="img-fluid rounded-circle" alt="頭像" />
            <h2 className="mb-0">{`${user.name.first} ${user.name.last}`}</h2>
            <p className="mb-0">{user.email}</p>
          </div>
        ))
        }
      </div>
    </div>
  );
}




//原始碼
// function App() {
//   return (
//     <div className="container mx-auto p-4">
//       <div className="row">
//         <div className="col-md-4">
//           <div className="bg-light p-3">
//             <img
//               src="https://randomuser.me/api/portraits/women/61.jpg"
//               alt="頭像"
//               className="img-fluid rounded-circle"
//             />
//             <h2 className="mb-0">Mona Heen</h2>
//             <p className="mb-0">mona.heen@example.com</p>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="bg-light p-3">
//             <img
//               src="https://randomuser.me/api/portraits/women/10.jpg"
//               alt="頭像"
//               className="img-fluid rounded-circle"
//             />
//             <h2 className="mb-0">Susan Craig</h2>
//             <p className="mb-0">susan.craig@example.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//渲染 App 組件
//取得 id="root" 的 <div>，這是 React 要顯示的地方
//用 ReactDOM.createRoot().render(<App />) 渲染 App 組件
//App 內的 HTML（JSX）會顯示在網頁上
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
