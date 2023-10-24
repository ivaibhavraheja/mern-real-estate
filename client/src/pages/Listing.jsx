import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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

    return (
        <main>
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
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div className='h-[550px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                )
            }
        </main>
    )
}
