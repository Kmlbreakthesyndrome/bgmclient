import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { RiMailFill, RiLockPasswordLine } from "react-icons/ri";
import { HiEyeSlash, HiEye } from "react-icons/hi2";
import axios from 'axios';
import { APIURL } from '../../GlobalURL';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';
import UserLogInSchema from './LogInValidation';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/website-logo/website Logo.png';


export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoggedIn, setUserImage, setUserData, setIsAdminLoggedIn } = useAuth();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: UserLogInSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                if (isAdminLogin) {
                    await handleAdminLogin(values);
                } else {
                    await handleUserLogin(values);
                }
            } catch (error) {
                showErrorToast(error.response?.data?.msg || 'Invalid Credentials');
            } finally {
                setIsLoading(false);
            }
        }
    });

    const handleUserLogin = async (credentials) => {
        const response = await axios.post(`${APIURL}UserLogIn`, credentials);
        const { userid, token, data } = response.data;

        localStorage.setItem("UserId", userid);
        localStorage.setItem("usertoken", token);

        if (response.status === 200) {
            showSuccessToast('Successfully Logged In');
            setIsLoggedIn(true);
            // setUserImage(data.img[0].url);
            // setUserData(data);
            navigate('/');
        }
    };

    const handleAdminLogin = async (credentials) => {
        const response = await axios.post(`${APIURL}adminLogIn`, credentials);
        const { userid, token, email } = response.data;

        localStorage.setItem("AdminId", userid);
        localStorage.setItem("admintoken", token);
        localStorage.setItem("email", email);

        if (response.status === 200) {
            showSuccessToast('Admin Successfully Logged In');
            
            navigate(`/admnHome`);
        }
    };

    const toggleLoginMode = () => {
        setIsAdminLogin(!isAdminLogin);
        formik.resetForm();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center pt-30 pb-10">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden flex flex-col md:flex-row">
                {/* Left side - Form */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 flex flex-col justify-center">
                    <div className="text-center mb-4 sm:mb-6 md:mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                            {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                            {isAdminLogin ? 'Access your admin dashboard' : 'Login to your account'}
                        </p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300 hover:border-blue-400 focus-within:border-blue-500'}`}>
                                <RiMailFill className="text-gray-400 text-base sm:text-lg" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="flex-1 ml-2 py-1 text-xs sm:text-sm outline-none bg-transparent"
                                    aria-invalid={formik.touched.email && !!formik.errors.email}
                                    aria-describedby="email-error"
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p id="email-error" className="mt-1 text-xs sm:text-sm text-red-600">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className={`flex items-center border rounded-lg px-3 py-2 transition-all duration-200 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300 hover:border-blue-400 focus-within:border-blue-500'}`}>
                                <RiLockPasswordLine className="text-gray-400 text-base sm:text-lg" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="flex-1 ml-2 py-1 text-xs sm:text-sm outline-none bg-transparent"
                                    aria-invalid={formik.touched.password && !!formik.errors.password}
                                    aria-describedby="password-error"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <HiEyeSlash className="text-base sm:text-lg" /> : <HiEye className="text-base sm:text-lg" />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p id="password-error" className="mt-1 text-xs sm:text-sm text-red-600">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        {!isAdminLogin && (
                            <div className="flex justify-end">
                                <Link
                                    to="/forgot-password"
                                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                isAdminLogin ? 'Admin Login' : 'User Login'
                            )}
                        </button>

                        {/* Switch Mode Button */}
                        <button
                            type="button"
                            onClick={toggleLoginMode}
                            className="w-full py-2 sm:py-2.5 px-4 rounded-lg text-sm sm:text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                        >
                            Switch to {isAdminLogin ? 'User Login' : 'Admin Login'}
                        </button>

                        {!isAdminLogin && (
                            <p className="text-center text-xs sm:text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        )}
                    </form>
                </div>

                {/* Right side - Illustration */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-teal-500 items-center justify-center p-6 lg:p-8 xl:p-10 2xl:p-12">
                    <div className="text-center text-white w-full">
                        <img
                            src={logo}
                            alt="Login illustration"
                            className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[280px] rounded-full5/
                             lg:max-w-xs xl:max-w-sm 2xl:max-w-md mx-auto"
                        />
                        <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-4 sm:mt-6">
                            Welcome to our platform
                        </h2>
                        <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg opacity-90">
                            {isAdminLogin
                                ? 'Manage your system with powerful admin tools'
                                : 'Join thousands of happy users today'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}