import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img 
                src={listing.imageUrls[0] || "https://www.omaxe.com/blog/wp-content/uploads/2023/04/Tax-Benefits-of-Investing-in-Real-Estate-in-India.png"} 
                alt='listing cover' 
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
            />

            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-sm text-gray-600 w-full'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'>
                    ₹ {' '}
                    {
                       listing.offer ? listing.discountPrice.toLocaleString('en-in') : listing.regularPrice
                    }
                    {
                        listing.type === 'rent' ? ' / month' : ''
                    }
                </p>
                <div className='text-slate-700 flex gap-4 items-center'>
                    <div className='text-s font-bold'>
                        {
                            listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`
                        }
                    </div>
                    <div className='text-s font-bold'>
                        {
                            listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`
                        }
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
