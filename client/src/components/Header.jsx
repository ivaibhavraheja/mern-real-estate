import {FaSearch} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import {logo} from "../assets/index"
import { CgProfile } from "react-icons/cg";
import { IoBookmarks } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { deleteUserFailure, signOutStart, signOutFailure, signOutSuccess} from "../redux/user/userSlice";


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [optionVisible, setOptionVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleAvatarClick = () => {
    if(optionVisible)
      setOptionVisible(false);
    else
      setOptionVisible(true);
  }

  const handleLogOut = async() => {
    setOptionVisible(false);
    try{
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    }
    catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }
  // use useEffect hook to render the searchTerm in searchBar of header if it has been changed in search bar of the browser directly
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser])
  return (
    <header className='bg-slate-200 shadow-md relative'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <div className="flex gap-x-2 items-center">
          <img src={logo} alt="logo" className="h-16 rounded-md"/>
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-slate-500'>xKinG</span>
              <span className='text-slate-700'>Estate</span>
            </h1>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input 
          type='text' 
          placeholder='Search...' 
          className='bg-transparent focus:outline-none w-24 sm:w-64'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600"/>
          </button>
        </form>

        <ul className="flex gap-4 font-semibold">
          <Link to='/'>
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to='/about'>
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          <button onClick={handleAvatarClick} className="relative">
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile"/>
            ) : (
              <Link to={'/sign-in'} className="text-slate-700 hover:underline">Sign In</Link>
            )}
          </button>
        </ul>
      </div>
            {
              currentUser && optionVisible ? (
                <div className="z-10">
                  <div className="absolute top-14 translate-y-4 right-1 2xl:right-24 bg-slate-300 flex flex-col rounded-lg p-1">
                    <Link to={'/profile'} className="flex items-center gap-2 border-b-2 p-2" onClick={() => setOptionVisible(false)}>
                      <CgProfile/>
                      <p>Profile</p>  
                    </Link>
                    <Link to={'/bookmarks'} className="flex items-center gap-2 border-b-2 p-2" onClick={() => setOptionVisible(false)}>
                      <IoBookmarks/>
                      <p>Bookmarks</p>
                    </Link>
                    <Link to={'/'} className="flex items-center gap-2 border-b-2 p-2" onClick={handleLogOut}>
                      <IoIosLogOut/>
                      <p>Log Out</p>
                    </Link>
                  </div>
                </div>
              ) : (
                <div></div>
              )
            }
    </header>
  )
}
