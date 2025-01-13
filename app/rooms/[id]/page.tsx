import BookingForm from "@/components/BookingForm";
import Heading from "@/components/Heading";
import getSingleRoom from "@/app/actions/getSingleRoom";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default async function RoomPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const room = await getSingleRoom(id);
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;
  const imageSrc = room.image ? imageUrl : "/images/no-image.jpg";
  return (
    <>
      {room ? (
        <>
          <Heading title={room.name} />
          <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6">
            <Link
              href="/"
              className="flex items-center text-gray-600 dark:text-gray-200  hover:text-gray-800 dark:hover:text-gray-400 mb-4"
            >
              <FaChevronLeft className="inline mr-1" />
              <span className="ml-2 ">Back to Rooms</span>
            </Link>

            <div className="flex flex-col sm:flex-row sm:space-x-6">
              <Image
                src={imageSrc}
                width={400}
                height={100}
                alt={room.name}
                className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
              />

              <div className="mt-4 sm:mt-0 sm:flex-1">
                <p className="text-gray-600 mb-4 dark:text-gray-300">{room.description}</p>

                <ul className="space-y-2">
                  <li className="dark:text-white">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Size:</span>{" "}
                    {room.sqft}
                  </li>
                  <li className="dark:text-white">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Availability:
                    </span>
                    {room.availability}
                  </li>
                  <li className="dark:text-white">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Price: </span>
                    ${room.price_per_hour}/hour
                  </li>
                  <li className="dark:text-white">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Address:
                    </span>{" "}
                    {room.address}
                  </li>
                </ul>
              </div>
            </div>
            <BookingForm room={room} />
          </div>
        </>
      ) : (
        <Heading title="Room Not Found" />
      )}
    </>
  );
}
