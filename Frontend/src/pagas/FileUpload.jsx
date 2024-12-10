import React, { useState } from "react";
import axios from "axios";
import Error from "../components/errorPage";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../../redux/slices/fileSlice";
export const FileUploader = () => {
  const [name, setname] = useState("")
  const [file, setfile] = useState("")
  const [isError, setisError] = useState({ isErr: false, message: "" });
  const [successMessage, setsuccessMessage] = useState("");
  // const [isLodding, setisLodding] = useState(false);

  const dispatch = useDispatch()
  const {isLodding} = useSelector(state=>state.files)

  const url = import.meta.env.VITE_APP_BACKEND_URL

  const hendelUpload = async () => {
    
    if (!file) {
      setisError({ isErr: true, message: "Please select a valid file" });
      return;
    }
    if(!name){
      setname(file.name)
      dispatch(addFile({ file, name: file.name , url : `${url}/files`}))
    }
    else{
      dispatch(addFile({ file, name, url: `${url}/files` }))
      // setisError({ isErr: false, message: "" })
    }
  };

  return (
    <>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {isError.isErr && <p className="text-red-500">{isError.message}</p>}
      <div className="flex flex-col md:flex-row md:justify-around items-center text-center bg-gray-200 p-4 rounded shadow-md mb-4 gap-3">
        
        <input
          className="border border-black px-3 py-1 rounded-md md:w-[30%]"
          placeholder="Please enter file name"
          type="text"
          onChange={(e) => setname(e.target.value )}
          value={name}
        />
        <input
          onChange={(e) =>
            setfile(e.target.files[0])
          }
          type="file"
          className="px-3 py-1 rounded-md md:w-[30%] cursor-pointer border hover:border-black "
        />
        
        <button
          onClick={hendelUpload}
          disabled={isLodding}
          className={`relative flex items-center justify-center px-4 py-2 text-white font-medium rounded ${
            isLodding
              ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 md:w-[20%]"
          }`}
        >
          {isLodding ? (
            <>
              <div className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2"></div>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </>
  );
};
