import { supabase } from "../../supabase/supabaseClient";

export const signUpApi = async (payload) => { 
   
       
    const { data, error } = await supabase.auth.signUp({
        email: payload?.email,
        password: payload?.password,
    });

    if (error) throw new Error(error.message);

    if (data?.user) {
        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert(payload ) 
            .select()
            .single();

        if (userError) throw new Error(userError.message);
        return userData; 
    }
};

export const SignInApi = async (payload) => {
    const {email, password} = payload;
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

       if (data?.user) { 
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select()
            .eq("email", data?.user?.email)
            .single();

        if (userError) throw new Error(userError.message);
        return userData; 
    }

    };


          //  HandleLogout
//   export const handleLogout = async () => {
//     setLoading(true);
//     try {
//         let { error } = await supabase.auth.signOut();
//         if(error) throw error;
//         setUser(null);
//         clear();
//         navigate("/auth/login");
//     } catch (error) {
//         toast.error(error.message);
//     }finally{
//         setLoading(false);
//     }
// };

