import Heading from "@/components/Heading";
import RoomCard from "@/components/RoomCard";
import getAllRooms from "./actions/getAllRoms";

export default async function Home() {
  const rooms = await getAllRooms()
  return (
    <>
      <Heading title='Available Rooms'/>
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room.$id} room={room}/>)
      ) : (
        <p className="text-gray-700 dark:text-gray-300 ">No rooms available at the moment.</p>
      )}
    </>
  );
}
