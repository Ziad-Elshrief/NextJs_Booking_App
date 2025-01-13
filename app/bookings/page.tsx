import Heading from "@/components/Heading";
import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from "@/components/BookedRoomCard";

export default async function BookingsPage() {
  const { bookings } = (await getMyBookings()) || [];
  return (
    <>
      <Heading title="Bookings" />
      {bookings.length > 0 ? (
        bookings?.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mt-4">You have no bookings</p>
      )}
    </>
  );
}
