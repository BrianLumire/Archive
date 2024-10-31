"use client"; // If using in a Next.js environment
import { useRouter } from "next/navigation";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (newToken: string | null) => void; // Allow null to clear the token
  setRefreshToken: (newToken: string | null) => void; // Allow null to clear the token
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => {}, // Default function to avoid undefined errors
  setRefreshToken: () => {}, // Default function to avoid undefined errors
});

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isClient, setIsClient] = useState(false);

  // State to hold the authentication tokens
  const [accessToken, setAccessToken_] = useState<string | null>(null);
  const [refreshToken, setRefreshToken_] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    //refresh access token
    async function refreshSession() {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(refreshToken)
      if (refreshToken !== null) {
        await axios({
          method: "post",
          url: "https://gmotivate.mwalimufinder.com/api/v1/auth/token/refresh/",
          data: {
            refresh: refreshToken,
          },
        }).then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            setAccessToken_(response?.data.access);

            const currentTime = new Date().getTime();
            const refreshTime = currentTime + 3 * 24 * 60 * 60 * 1000; // 3 days in ms
            localStorage.setItem("refreshTime", refreshTime.toString());
          } else {
            localStorage.clear();
            router.push("/agent/auth/sign-in");
          }
        });
      }
    }

    //Check token expiry
    const checkTokenExpiry = (refreshTime: number) => {
      const currentTime = new Date().getTime();

      if (currentTime >= refreshTime) {
        refreshSession();
      } else {
        const storedAccessToken = localStorage.getItem("accessToken");

        setAccessToken_(storedAccessToken);
      }
    };

    //The isClient state gets rid of prerendering errors
    if (isClient) {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      setRefreshToken_(storedRefreshToken);

      const refreshTime = localStorage.getItem("refreshTime");
      checkTokenExpiry(Number(refreshTime));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  // Function to set the access token
  const setAccessToken = (newToken: string | null) => {
    setAccessToken_(newToken);
    if (newToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
      localStorage.setItem("accessToken", newToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken"); // Clear token from localStorage if null
    }
  };

  // Function to set the refresh token
  const setRefreshToken = (newToken: string | null) => {
    setRefreshToken_(newToken);
    if (newToken) {
      localStorage.setItem("refreshToken", newToken);
    } else {
      localStorage.removeItem("refreshToken"); // Clear token from localStorage if null
    }
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
    }),
    [accessToken, refreshToken]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
