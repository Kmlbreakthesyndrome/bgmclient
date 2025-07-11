import React from 'react';
import { BrowserRouter, Route, Routes,Navigate, useLocation } from 'react-router-dom';
import{Navbar, Home, Brands, Fragrance, DropDownMenu, Search, SignUp, Login, AdminHome,
  OtpVerification, ForgotPassword, PageNotFound, Footer, UserProfile, Setting,Skincare } from './AllComponents';
import { AuthProvider, useAuth} from './component/context/AuthContext';

const AppRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const HideFooterRoutes = [
    '/login', '/signup', '/otpverification', '/userprofile',
    '/setting', '/adminhome'
  ];

  const shouldHideFooter = HideFooterRoutes.some(route => 
    location.pathname.toLowerCase().startsWith(route)
  );

  return (
    <>
      <Navbar />
      <Routes>
      {/* Public Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/brands' element={<Brands/>}/>
        <Route path='/fragrance' element={<Fragrance/>}/>
        <Route path='/search' element={<Search/>} />
        <Route path='/dropdownmenu' element={<DropDownMenu/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/skincare' element={<Skincare />} />

        
        <Route path='OtpVerification/:type/:userId' element={<OtpVerification />} />

        {/* Protected Routes */}
        <Route path='/userprofile' element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path='/setting' element={isLoggedIn ? <Setting /> : <Navigate to="/login" />} />
        <Route path='/adminhome' element={isLoggedIn ? <AdminHome /> : <Navigate to="/login" />} />

        {/* Catch-all */}
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
