import axios from "../api/axios";

export const checkUserSession = async (setAuth, setLoading) => {
  try {
    // Check local storage for authentication information
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { isAuthenticated, user } = JSON.parse(storedAuth);
      setAuth({ isAuthenticated, user });
    }

    // Fetch user session from the server
    const response = await axios.get("/users/user");
    const isAuthenticated = response.data.isAuthenticated;
    const user = response.data.user;

    // Update the auth context
    setAuth({ isAuthenticated, user });

    // Store authentication information in local storage
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated, user }));
  } catch (error) {
    console.error("Error checking user session: ", error);
  } finally {
    setLoading(false);
  }
};
