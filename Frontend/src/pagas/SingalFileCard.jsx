import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpacificFile } from '../../redux/slices/fileSlice'
import { useParams } from 'react-router-dom'
const url = import.meta.env.VITE_APP_BACKEND_URL

export const SingalFileCard = () => {
    const { _id } = useParams()
    const dispach = useDispatch()
    const file = useSelector(state => state?.files?.file)
console.log("file" , file);


    useEffect(() => {
        dispach(getSpacificFile({ url: `${url}/files/${_id}` }))
    }, [])
    return (<div className='flex flex-col gap-3'>
        <div className='h-[400px] w-[500px]'>
            {type.includes("video") ? (
                <video controls src={url} className="h-full w-full" />
            ) : (
                <img width={"100%"} height={"100%"} src={url} />
            )}
        </div>
        <button className='bg-black px-3 py-2 rounded-md hover:bg-gray-700'>Close</button>
    </div>

    )
}
