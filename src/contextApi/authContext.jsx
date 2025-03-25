import { createContext, useEffect, useState } from "react";
import LocalStorageService from "../utils/HandleLocalStorage";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { supabase } from "../supabase/supabaseClient";


const AuthContext = createContext({
    user: null,
    setdata: (data) => {},
    handleLogout: () => {},
    loading: false
});

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);

        //  Handle User
        const { getItem, setItem, clear } = LocalStorageService;
        const getUser = getItem("auth");
        const [user, setUser] = useState(getUser ? getUser : null);
        const navigate = useNavigate();
        useEffect(() => {
          if (user) {
            setItem("auth", user);
          }
        }, [user, setItem]);
      
               //  HandleLogout
  const handleLogout = async () => {
    setLoading(true);
    try {
        let { error } = await supabase.auth.signOut();
        if(error) throw error;
        setUser(null);
        clear();
        navigate("/auth/login");
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
};

     return (
        <AuthContext.Provider value={{
           user, 
           setUser,
           handleLogout,
           }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;