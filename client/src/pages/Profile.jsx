import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user); 
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log("file......", file);
  console.log("formData......", formData);
  console.log("file upload percentage......", filePer);
  console.log(fileUploadError);

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    //to make file name unique
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + 'done');
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => 
          setFormData({...formData, avatar: downloadURL})
        );
      }
    );
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>
        {/* connect the input and img using useRef */}
        <input 
          onChange={(e) => setFile(e.target.files[0])} 
          type='file' ref={fileRef} 
          hidden 
          accept='image/*'
        />
        <img 
          onClick={() => fileRef.current.click()} 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
          //condition to show new image if uploaded else show old image of currentUser
          src={formData.avatar || currentUser.avatar} 
          alt='profile'
        />
        <p className='text-small self-center'>
          {
            fileUploadError ? (
              <span className='text-red-700'>Error Image Upload (image must be less than 2MB)</span>
            ) : filePer > 0 && filePer < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePer}%`}</span>
            ) : filePer === 100 ? (
              <span className='text-green-700'>Image Successfully Uploaded!</span>
            ) : (
              ''
            )
          }
        </p>
        <input 
          type="text" 
          placeholder='username' 
          id='username' 
          className='border p-3 rounded-lg' 
        />
        <input 
          type="email" 
          placeholder='email' 
          id='email' 
          className='border p-3 rounded-lg' 
        />
        <input 
          type="text" 
          placeholder='password' 
          id='password' 
          className='border p-3 rounded-lg' 
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80'>
          Update
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
