import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import AccountSettings from "./pages/AccountSettings";
//import Collections from "./pages/Collections";
import Home from "./pages/Home";
import MarketPlace from "./pages/MarketPlace";
import SingleBuy from "./pages/SingleBuy";
/*import MyCollections from "./JSX/MyCollections";
import MyItems from "./components/MyItems";
import Notifications from "./components/Notifications";
import Favorites from "./components/Favorites";
import SigninModal from "./pages/SigninModal";
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
  }
])


  return (
    <RouterProvider router={router}  />
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
