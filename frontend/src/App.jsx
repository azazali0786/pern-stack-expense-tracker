  import {useEffect, useState} from 'react';
  import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
  import SignIn from './pages/auth/sign_in';
  import SignUp from './pages/auth/sign_up';
  import Dashboard from './pages/dashboard';
  import Settings from './pages/settings';
  import AccountPage from './pages/account-page';
  import Transactions from './pages/transactions'; 
  import useStore from './store';
import { setAuthToken } from './libs/apiCall';
import { Toaster } from 'sonner';
import  Navbar  from "./components/navbar";

  const RootLayout = () => {
    const {user} = useStore((state)=>state);
    setAuthToken(user?.token||"");
    // console.log(user);
    return !user? (
      <Navigate to="sign-in" replace={true}/>
    ):(
      <>
         <Navbar/>
       <div className='min-h-[cal(h-screen-100px)]'>
        <Outlet/>
      </div>
      </>
    )
  }

  function App() {
    const {theme}= useStore((state)=>state);

    useEffect(() => {
      console.log("Theme changed to:", theme);
      if (theme === "dark") {
        document.body.classList.add("dark");  // ✅ Use document.documentElement
      } else {
        document.body.classList.remove("dark");
      }
    }, [theme]);

    return (
    <main>
      <div className='w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900'>
        <Routes>
          <Route element={<RootLayout/>}>
          <Route path="/" element={<Navigate to="/overview"/>}></Route>
          <Route path="/overview" element={<Dashboard/>}></Route>
          <Route path="/transactions" element={<Transactions/>}></Route>
          <Route path="/settings" element={<Settings/>}></Route>
          <Route path="/accounts" element={<AccountPage/>}></Route>
          </Route>
          <Route path="/sign-in" element={<SignIn/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
        </Routes>
      </div>
      <Toaster richColors position='top-center'/>
    </main>
    )
  }

  export default App
