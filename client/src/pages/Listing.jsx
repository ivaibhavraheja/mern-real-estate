import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {FaBath, FaBed, FaChair, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaShare} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import Contact from '../components/Contact.jsx'

export default function Listing() {
    SwiperCore.use([Navigation]);
    const {currentUser} = useSelector((state) => state.user);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [userBookmarks, setUserBookmarks] = useState(null);
    
    // console.log(currentUser._id);
    // console.log(listing?.userRef);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    const handleBookmark = async() => {
        setLoading(true);
        try{
            if(isBookmarked){
                //remove bookmark
                const res = await fetch(`/api/bookmark/remove`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUser._id,
                        listingId: params.listingId,
                    }),
                })
                const data = await res.json();
                setIsBookmarked(false);
            }
            else{
                //add bookmark
                const res = await fetch(`/api/bookmark/add`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUser._id,
                        listingId: params.listingId,
                    }),
                })
                const data = await res.json();
                setIsBookmarked(true);
            }
            setLoading(false);
        }
        catch(error){
            console.error(error);
            setLoading(false);
        }
    }

    //since useEffect is sync so if we need to use async function in it, we need to create and call it separatly in it, not write down function directly
    useEffect(() => {
        const fetchListing = async() => {
            try{
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            }
            catch(error){
                setError(true);
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId]);
    // render each time the listinId in params changes

    useEffect(() => {
        const fetchUserBookmarks = async() => {
            setLoading(true);
            try{
                // console.log("hitting getuserbookmarks api")
                const userId = currentUser._id;
                const res = await fetch(`/api/bookmark/user?userId=${userId}`);
                const data = await res.json();
                // console.log("user bookmarks --> ", data);
                setUserBookmarks(data?.bookmarks);
                // console.log(userBookmarks);
            }
            catch(error){
                console.log("COULD NOT FETCH USER BOOKMARKS");
                console.log(error);
            }
            setLoading(false);
        }
        fetchUserBookmarks();
    }, [])

    useEffect(() => {
        // Check if the current listing is in the user's bookmarks
        if (Array.isArray(userBookmarks) && userBookmarks.length > 0) {
            for (let i = 0; i < userBookmarks.length; i++) {
                if (userBookmarks[i]._id === params.listingId) {
                    setIsBookmarked(true);
                    break;
                }
            }
        }
    }, [params.listingId, userBookmarks])

    return (
        <main className='-z-50'>
            {
                // replace with spinner
                loading && <p className='text-center my-7 text-2xl'>Loading...</p>
            }
            {
                //create a return to home page button in case of error
                error && <p>Something Went Wrong</p>
            }
            {
                listing && !loading && !error && (
                    <div>
                        <Swiper navigation className='-z-10'>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div className='h-[550px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className='fixed top-[13%] right-[16%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                            <FaShare className='text-slate-500' onClick={() => handleCopy()}/>
                        </div>
                        {
                            copied && (
                                <p className='fixed top-[20%] right-[11%] z-10 rounded-md bg-slate-100 p-2'>Link Copied</p>
                            )
                        }
                        
                        <div className='flex flex-col max-w-5xl mx-auto p-3 my-7 gap-4'>
                            <div className='flex justify-between items-center'>
                                <p className='text-3xl font-bold italic font-sans uppercase'>
                                    {listing.name} - ₹{''}
                                    {listing.offer
                                        ? listing.discountPrice.toLocaleString('en-in')
                                        : listing.regularPrice.toLocaleString('en-in')
                                    }
                                    {listing.type === 'rent' && ' /month'}
                                </p>
                                <button onClick={handleBookmark} className='text-blue-500 hover:text-blue-900'>
                                    {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                                </button>
                            </div>
                            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
                                <FaMapMarkedAlt className='text-green-700'/>
                                {listing.address}
                            </p>
                            <div className='flex gap-4'>
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                                </p>
                                {listing.offer && (
                                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                        ₹{+listing.regularPrice - +listing.discountPrice} OFF
                                    </p>
                                )}
                            </div>
                            <p className='text-slate-800'>
                                <span className='font-semibold text-black'>Description - </span>
                                {listing.description}
                            </p>
                            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'> 
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBed className='text-lg' />
                                    {listing.bedrooms > 1
                                        ? `${listing.bedrooms} beds`
                                        : `${listing.bedrooms} bed`
                                    }
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBath className='text-lg' />
                                    {listing.bathrooms > 1
                                        ? `${listing.bathrooms} baths `
                                        : `${listing.bathrooms} bath `
                                    }
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaParking className='text-lg' />
                                    {listing.parking ? 'Parking spot' : 'No Parking'}
                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaChair className='text-lg' />
                                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                                </li>
                            </ul>
                            {
                                // we want to see the button only if someone is logged in and is not tshe creator of the listing
                                currentUser && listing.userRef !== currentUser._id && !contact && (
                                    <button onClick={() => setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 p-3 font-semibold'>
                                        Contact Landlord
                                    </button>
                                )
                            }
                            {
                                contact && (
                                    <Contact listing={listing}/>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </main>
    )
}
