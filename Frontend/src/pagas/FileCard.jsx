import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeFile } from "../../redux/slices/fileSlice";
import { Modal } from "../utils/modal";
import { Link } from "react-router-dom";

const FileCard = ({ name, url, type, _id }) => {
    const dispatch = useDispatch();
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    const [showModal, setShowModal] = useState(false);
const [isCopy, setisCopy] = useState(false)

    const handleDelete = () => {
        dispatch(removeFile({ url: `${backendUrl}/files`, fileId: _id }));
        setShowModal(false);
    };

    const hendelCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(url); 
           setisCopy(true);
           setTimeout(()=>setisCopy(false),10000)
        } catch (err) {
            console.error("Failed to copy URL:", err);
        }
    }

            return (
        <div className="flex flex-col text-center gap-3 p-2 bg-gray-50 rounded shadow">
                    <Link to={`/dashboard/file/${_id}`}>
                        <span className="flex justify-center text-center p-3 h-[150px] md:h-[200px]">
                {type.includes("video") ? (
                    <video controls src={url} className="h-full w-full" />
                ) : (
                    <img width={"100%"} height={"100%"} src={url} />
                )}
            </span>
                    </Link>
            <p>{name}</p>
            <div className="flex justify-center gap-3">
                <button onClick={hendelCopyUrl} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md font-bold">
                    {isCopy ? "Copied!" : "Copy URL"}
                </button>
                <button
                    onClick={() => setShowModal(true)} // Open the modal
                    className="bg-black hover:bg-gray-700 text-white px-3 py-2 rounded-md font-bold"
                >
                    delete
                </button>
            </div>

            {showModal && (
                <Modal sucessHendeler={handleDelete} setShowModal={setShowModal} quation={"Are you sure you want to delete this file?"}/>
            )}
        </div>
   
    );
};

export default FileCard;
