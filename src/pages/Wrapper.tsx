import { useEffect, useState } from "react";
import supabase from "../api/supabase";
import { Navigate } from "react-router-dom";

type props = {
  children: React.ReactNode;
  setAuthenticatedState: (value: boolean) => void;
};

function Wrapper({ children, setAuthenticatedState }: props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthenticated(!!session);
      setAuthenticatedState(!!session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (authenticated) {
      return <>{children}</>;
    }

    return <Navigate to="/login" />;
  }
}

export default Wrapper;
