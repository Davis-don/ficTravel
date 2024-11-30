export const fetchAgents = async () => {
    const response = await fetch(`http://localhost:4000/get-all-agents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch agents");
    }
    return response.json();
  };