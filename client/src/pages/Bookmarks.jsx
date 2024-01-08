import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Bookmarks() {
    const [userBookmarks, setUserBookmarks] = useState(null);
    const [loading, setLoading] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const [bookmarkError, setBookmarkError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserBookmarks = async() => {
            setLoading(true);
            try{
                const userId = currentUser._id;
                const res = await fetch(`/api/bookmark/user?userId=${userId}`);
                const data = await res.json();
                setUserBookmarks(data?.bookmarks);
            }
            catch(error){
                console.log("COULD NOT FETCH USER BOOKMARKS");
                console.log(error);
                setBookmarkError(true);
            }
            setLoading(false);
        }
        fetchUserBookmarks();
    }, [])

    const handleExplore = (id) => {
        // e.preventDefault();
        // e.stopPropagation();
        navigate(`/listing/${id}`);
    }

  return (
    <div>
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-3xl font-bold mb-4 ">Saved Properties</h2>
            {
                userBookmarks !== null && <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mb-6">
                    {
                        userBookmarks.map((item) => (
                            <div key={item._id}>
                                <div className="flex flex-col rounded-md gap-2 pb-3 border-4 border-x-indigo-900 border-y-indigo-300 hover:scale-110 transition-all ease-in-out">
                                    <img src={item.imageUrls[0]} alt="cover" className="h-52 w-70"/>
                                    <p className="font-bold text-center">{item.name}</p>
                                    <button onClick={() =>handleExplore(item._id)} className="ml-24 flex gap-2 text-sm items-center justify-center border-2 border-black rounded-full px-2 py-1 w-fit hover:text-blue-500 hover:border-blue-500">
                                        Explore Property
                                        <FaLongArrowAltRight/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

        </div>
        {
            bookmarkError && 
            <div>
                Error occured while fetching bookmarked listings
            </div>
        }
    </div>
  )
}
