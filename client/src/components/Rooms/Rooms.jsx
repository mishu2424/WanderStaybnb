
import Card from "./Card";
const Rooms = ({rooms}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {
                rooms.length>0 && rooms.map(room=><Card key={room?._id} room={room}></Card>)
            }
        </div>
    );
};

export default Rooms;