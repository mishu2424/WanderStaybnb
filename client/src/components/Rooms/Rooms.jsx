import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../shared/LoadingSpinner";
import Card from "./Card";
import useAxiosCommon from "../../hooks/useAxiosCommon";
const Rooms = ({rooms}) => {
    // const axiosCommon=useAxiosCommon();
    // const {data:rooms=[],isLoading}=useQuery({
    //     queryKey:['rooms'],
    //     queryFn:async()=>{
    //         const {data}=await axiosCommon('/rooms');
    //         return data;
    //     }
    // })

    // if(isLoading) return <LoadingSpinner/>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {
                rooms.length>0 && rooms.map(room=><Card key={room?._id} room={room}></Card>)
            }
        </div>
    );
};

export default Rooms;