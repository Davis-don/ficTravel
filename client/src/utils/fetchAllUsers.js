export const fetchUsers = async () => {
    const response = await fetch(`http://localhost:4000/get-all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch all users");
    }
    return response.json();
  };