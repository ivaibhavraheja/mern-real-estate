import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper';
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  SwiperCore.use([Navigation]);

  // console.log(offerListings);

  useEffect(() => {
    // we need to render it only one time when page launches --> []

    const fetchOfferListings = async () => {
      try{
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        //we will call other fetch function inside it because we need to load and fetch 1 by 1 from top to bottom not,  all at one time and take more time
        fetchRentListings();
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchRentListings = async() => {
      try{
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchSaleListings = async() => {
      try{
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      }
      catch(error){
        console.log(error);
      }
    }

    fetchOfferListings();
  }, [])

  const handlePostProperty = () => {
    if(currentUser === null){
      navigate('/sign-in')
    }
    else{
      navigate('/create-listing')
    }
  }

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span><br/>place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          xKinG Estate is the best place to find your next perfect place to live
          <br/>
          We have a wide range of properties for you to chose from
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Lets get started...
        </Link>
      </div>


      {/* swiper */}
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && 
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: "cover"}} className='h-[550px]'>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 my-10 ml-14'>
        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more Offers</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }

        <div className='flex items-center justify-between bg-indigo-800 text-white rounded-lg px-8 py-4 max-w-5xl'>
          <div>
            <p className='text-2xl font-bold leading-8 tracking-wide'>Post your property for <span className='font-semibold italic text-3xl'>Free</span></p>
            <p className='italic tracking-wide'>List it on xKinG Estate and get genuine leads</p>
          </div>
          <div className='flex gap-3 items-center'>
            <button className='bg-sky-100 p-4 rounded-full text-black font-semibold' onClick={handlePostProperty}>
              Post Property
              <span className='text-xs bg-white p-1 rounded-full items-center'> Free</span>
            </button>
          </div>
        </div>

        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for rent</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for sale</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>

      <Footer/>
    </div>
  )
}
