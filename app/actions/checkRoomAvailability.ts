"use server";

import { createSessionClient } from "@/config/appwrite";
import { Query } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";

function toUTCDateTime(dateString: string) {
  return DateTime.fromISO(dateString, { zone: "utc" }).toUTC();
}

function dateRangesOverlap(
  checkInA: DateTime,
  checkOutA: DateTime,
  checkInB: DateTime,
  checkOutB: DateTime
) {
  return checkInA < checkOutB && checkOutA > checkInB;
}

export default async function checkRoomAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
) {
  const sessionCookie = (await cookies()).get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS || "",
      [Query.equal("room_id", roomId)]
    );
    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);
      if (
        dateRangesOverlap(
          toUTCDateTime(checkIn),
          toUTCDateTime(checkOut),
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.log("Failed to check availability", error);
    return {
      error: "Failed to check availability",
    };
  }
}
