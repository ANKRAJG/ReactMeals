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


const App = () => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);
  const authCtx = useContext<AuthCtxObj>(AuthContext);

  const toggleCartModal = (flag: boolean) => {
      setCartIsShown(flag);
  };

  const loggedInPages = (<Fragment>
    <Route path="/home" element={<Home cartIsShown={cartIsShown} toggleCartModal={toggleCartModal} />} />
    <Route path="/admin/*" element={<Admin />}>
        <Route path="meals" element={<AdminMeals />} />
        <Route path="meal/new" element={<AdminNewMeal />} />
        <Route path="meals/:mealId" element={<AdminMealDetails />} />
    </Route>
  </Fragment>);

  return (
    <Fragment>
      <Header onToggleCart={toggleCartModal} />
      <MainLayout>
        <Routes>
          <Route path="/" element={authCtx.isLoggedIn ? <Home cartIsShown={cartIsShown} toggleCartModal={toggleCartModal} /> : <Navigate to="/login" />} />
          {!authCtx.isLoggedIn && 
              <Route path="/login" element={<Login />} />
          }
          {authCtx.isLoggedIn && loggedInPages}
          {/* For not found <Route path="*" /> */}
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default App;


