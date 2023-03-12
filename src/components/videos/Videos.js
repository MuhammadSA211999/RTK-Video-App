import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const { data: videos, isError, isLoading, error } = useGetVideosQuery()
    let content;
    if (isLoading) content = <VideoLoader />
    if (!isLoading && isError) content = <Error error={error} />
    if (!isLoading && !isError && videos.length === 0) content = <div>No videos found</div>
    if (!isLoading && !isError && videos.length > 0) content = videos.map(video => <Video video={video} key={video.id} />)
    return content
}
