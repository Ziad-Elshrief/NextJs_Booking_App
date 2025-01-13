import getMyRooms from "@/app/actions/getMyRooms";
import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";

export default async function MyRoomsPage() {
  const rooms = await getMyRooms();
  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <p className="text-gray-700 dark:text-gray-300">You have no room listings</p>
      )}
    </>
  );
}
