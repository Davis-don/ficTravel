export const fetchBookings = async () => {
    const response = await fetch(`http://localhost:4000/get-all-bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    return response.json();
  };
  