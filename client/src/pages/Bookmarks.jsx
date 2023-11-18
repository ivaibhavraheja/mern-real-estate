import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Bookmarks() {
    const [userBookmarks, setUserBookmarks] = useState(null);
    const [loading, setLoading] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const [bookmarkError, setBookmarkError] = useState(false);

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

  return (
    <div>
        <div className="max-w-6xl mx-auto mt-6">
            <h2 className="text-3xl font-bold mb-4 ">Saved Properties</h2>
            {
                userBookmarks !== null && <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                    {
                        userBookmarks.map((item) => (
                            <Link key={item._id} to={`/listing/${item._id}`} className="flex flex-col gap-3 border-4 border-x-indigo-900 border-y-indigo-300 hover:scale-110 transition-all ease-in-out">
                                    <img src={item.imageUrls[0]} alt="cover" className="h-52 w-70"/>
                                    <p className="p-2 font-bold">{item.name}</p>
                            </Link>
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
