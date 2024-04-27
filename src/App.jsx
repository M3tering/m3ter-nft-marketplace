import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import AccountSettings from "./pages/AccountSettings";
//import Collections from "./pages/Collections";
import Home from "./pages/Home";
import MarketPlace from "./pages/MarketPlace";
import SingleBuy from "./pages/SingleBuy";
import SigninModal from "./pages/SigninModal";
import MyItems from "./components/MyItems";
import useWeb3 from "./web3/hooks/useWeb3";
import Web3Context from "./contexts/Web3Context";
import ListModal from "./pages/ListModal";
/*import MyCollections from "./JSX/MyCollections";
import Notifications from "./components/Notifications";
import Favorites from "./components/Favorites";
import SignOut from "./pages/SignOut";
import ProjectDeveloper from "./pages/ProjectDeveloper";*/


function App() {
  let router = createBrowserRouter([{
    path: "/",
    element: <Home />
  }, {
    path: "/marketplace",
    element: <MarketPlace />
  },{
    path: "/marketplace/single-buy",
    element: <SingleBuy />
  },{
    path: "/account",
    element: <SigninModal />
  },{
    path: "/new-meter",
    element: <ListModal />
  },{
    path: "/my-items",
    element: <MyItems />
  }
])

let web3 = useWeb3()



return (
  <Web3Context.Provider value={web3}>
      <RouterProvider router={router}  />
  </Web3Context.Provider>
  );
}

{/*<Routes>
<Route path="/" element={<Home />} />
<Route path="/marketplace" element={<MarketPlace />} />
<Route path="/collections" element={<Collections />} />
  <Route path="/signin" element={<SigninModal />}></Route>
  <Route
    path="/account-settings"
    element={<AccountSettings />}
  />
  <Route path="/my-items" element={<MyItems />}></Route>
  <Route path="/my-collections" element={<MyCollections />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/favorites" element={<Favorites />} />
  <Route path="/signout" element={<SignOut />}></Route>
  <Route
    path="/marketplace/single-buy"
    element={<SingleBuy />}
  ></Route>
  <Route
    path="/project-developer"
    element={<ProjectDeveloper />}
/>
</Routes>*/}
export default App;
