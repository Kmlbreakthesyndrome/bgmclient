import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate,useParams} from 'react-router-dom';
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { RiMailAiFill, RiLockPasswordLine, RiImageAiFill } from "react-icons/ri";
import { HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";
import { motion } from 'framer-motion';
import UserSignUpSchema from './SignUpValidation';
import axios from 'axios';
import {APIURL} from '../../GlobalURL'
import {showSuccessToast,showErrorToast} from '../ToastifyNotification'


export default function SignUp() {
  const { userId }= useParams();
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, SetLoading] = useState(false);

  const { values, handleChange, handleSubmit, errors, touched, handleBlur,setFieldValue } = useFormik({
    initialValues: {profileImg: '', name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: UserSignUpSchema,

    onSubmit: async (values) => {
      try {
          SetLoading(true);
          const formData = new FormData();

          Object.keys(values).forEach((key) => {
              if (key !== "profileImg") formData.append(key, values[key]);
          });

          if (values.profileImg) {
            formData.append('profileImg', values.profileImg);
          }

         const response = await axios.post(`${APIURL}CreateUser`, formData);
         localStorage.setItem('UserEmail', response.data.email)

          if (response.status === 200 || response.status === 201) {
              showSuccessToast('Successfully Signed Up');
              navigate(`/OtpVerification/UserOtp/${response.data.id}`);
          }
      } catch (e) {
        showErrorToast(e.response?.data?.msg || 'Server Site Error')
      } finally {
        SetLoading(false);
      }
    }    
 });
  
  const INPUTDATA = [
    { name: 'name', placeholder: 'Enter Your Name', type: 'text', icon: <FaUserAlt className='text-gray-500 text-2xl' />},
    { name: 'email', placeholder: 'Enter Your Email', type: 'email', icon: <RiMailAiFill className='text-gray-500 text-2xl' /> },
    { name: 'password', placeholder: 'Enter Your Password', type: showPassword ? 'text' : 'password', icon: <RiLockPasswordLine className='text-gray-500 text-2xl' />, toggle: () => setshowPassword(!showPassword), show: showPassword },
    { name: 'confirmPassword', placeholder: 'Confirm Your Password', type: showConfirmPassword ? 'text' : 'password', icon: <RiLockPasswordLine className='text-gray-500 text-2xl' />, toggle: () => setShowConfirmPassword(!showConfirmPassword), show: showConfirmPassword },
  ];

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profileImg", file);
    }
  }

  return (
    <motion.form
               onSubmit={handleSubmit}
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="flex justify-center items-center h-screen bg-gray-100 md:pt-20 pt-0"
           >
               <motion.div
                   className="bg-white rounded-xl p-8 w-96"
                   initial={{ scale: 0.9 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.3, duration: 0.4 }}
               >
                   <h1 className="text-center text-2xl font-semibold pb-5 flex items-center justify-center gap-2 select-none">
                       <AiOutlineUserAdd className="text-blue-600" size={28} /> Sign Up
                   </h1>
   
                   <div className="flex flex-col gap-4">
                       {INPUTDATA.map(({ name, placeholder, type, icon, toggle, show }, index) => (
                           <div key={index} className="flex flex-col">
                               <div className="flex items-center bg-gray-200 rounded-md py-2 px-3 relative">
                                   {icon}
                                   <input
                                       name={name}
                                       type={type}
                                       placeholder={placeholder}
                                       value={values[name]}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       className='placeholder-gray-500 bg-transparent flex-1 ml-2 focus:outline-none'
                                   />
                                   {toggle && (
                                       <button type="button" onClick={toggle} className="absolute right-3 text-gray-600">
                                           {show ? <HiMiniEyeSlash /> : <HiMiniEye />}
                                       </button>
                                   )}
                               </div>
                               {touched[name] && errors[name] && (
                                   <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                               )}
                           </div>
                       ))}
   
                       {/* Upload Image */}
                       <div className="flex flex-col">
                           <div className="flex items-center bg-gray-200 rounded-md py-2 px-3 relative">
                               <input
                                   name='profileImg'
                                   type='file'
                                   onChange={handleImageChange}
                                   className='placeholder-gray-500 bg-transparent flex-1 ml-2 focus:outline-none'
                               />
                           </div>
                       </div>
                   </div>
   
                   <button
                       type="submit"
                       disabled={isLoading}
                       className="flex justify-center items-center gap-2 w-full mt-5 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                   >
                       {isLoading ? (
                           <>
                               <svg
                                   className="animate-spin h-5 w-5 text-white"
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 24 24"
                               >
                                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                               </svg>
                               Signing Up...
                           </>
                       ) : 'Sign Up'}
                   </button>
   
                   <p className="text-center text-sm mt-3">
                       Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                   </p>
               </motion.div>
           </motion.form>
       );
   }
   