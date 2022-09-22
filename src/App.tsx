import { useState, Fragment, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import AuthContext, { AuthCtxObj } from './store/auth-context';
import Admin from './components/Admin/Admin';
import MainLayout from './components/Layout/MainLayout';
import AdminMeals from './components/Admin/AdminMeals/AdminMeals';
import AdminNewMeal from './components/Admin/AdminNewMeal/AdminNewMeal';
import AdminMealDetails from './components/Admin/AdminMeals/AdminMealDetails';
import Cart from './components/Cart/Cart';
import AdminWelcome from './components/Admin/AdminWelcome';


const App = () => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  const toggleCartModal = (flag: boolean) => {
      setCartIsShown(flag);
  };

  console.log('Hello');

  if(!authCtx.appLoaded) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Fragment>
      <Header onToggleCart={toggleCartModal} />
      <MainLayout>
          <Routes>
              <Route path="/login" element={!authCtx.isLoggedIn ? <Login /> : <Navigate to="/home" />} />

              <Route path="/home" element={authCtx.isLoggedIn ? <Home toggleCartModal={toggleCartModal} /> : <Navigate to="/login" />} />

              <Route path="/admin/*" element={authCtx.isLoggedIn ? <Admin /> : <Navigate to="/login" />}>
                  <Route path="" element={<AdminWelcome />} />
                  <Route path="meals" element={<AdminMeals />} />
                  <Route path="meal/new" element={<AdminNewMeal />} />
                  <Route path="meals/:mealId" element={<AdminMealDetails />} />
              </Route>

              <Route path="*" element={authCtx.isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
              {/* For not found <Route path="*" /> */}
        </Routes>
        { authCtx.isLoggedIn && cartIsShown && <Cart onCloseCart={toggleCartModal} />}
      </MainLayout>
    </Fragment>
  );
};

export default App;


