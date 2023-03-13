// import Success from "../ui/Success";
import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form() {

    const [addVideo, { isSuccess }] = useAddVideoMutation()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [duration, setDuration] = useState('')
    const [date, setDate] = useState('')
    const [views, setViews] = useState('')
    //videodata 
    const videoData = { title, description, author, link, thumbnail, duration, date, views }
    console.log(videoData);

    const resetForm = () => {
        setTitle('')
        setAuthor('')
        setDescription('')
        setDate('')
        setDuration('')
        setViews('')
        setLink('')
        setThumbnail('')
    }
    const handleCreateVideo = (e) => {
        e.preventDefault()
        addVideo(videoData)
        resetForm()
    }
    return (
        <form onSubmit={handleCreateVideo} method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                title="Video Title" />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput onChange={(e) => setAuthor(e.target.value)}
                                value={author}
                                title="Author" />
                        </div>

                        <div className="col-span-6">
                            <TextArea onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                title="Description" />
                        </div>

                        <div className="col-span-6">
                            <TextInput onChange={(e) => setLink(e.target.value)}
                                value={link}
                                title="YouTube Video link" />
                        </div>

                        <div className="col-span-6">
                            <TextInput onChange={(e) => setThumbnail(e.target.value)}
                                value={thumbnail}
                                title="Thumbnail link" />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput onChange={(e) => setDate(e.target.value)}
                                value={date}
                                title="Upload Date" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput onChange={(e) => setDuration(e.target.value)}
                                value={duration}
                                title="Video Duration" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput onChange={(e) => setViews(e.target.value)}
                                value={views}
                                title="Video no of views" />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>

                {isSuccess && <Success message="Video was added successfully" />}
            </div>
        </form>
    );
}
