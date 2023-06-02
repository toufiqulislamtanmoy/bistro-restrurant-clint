import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
   const {user} = useContext(AuthContext);
   const [axiosSecure] = useAxiosSecure();
   
   const {data: isAdmin, isLoading:adminLoading} = useQuery({
    queryKey:['isAdmin',user?.email],
    queryFn: async () => {
        const response = await axiosSecure.get(`/users/admin/${user?.email}`);
        return response.data.admin;
        
    }
   })
   return [isAdmin,adminLoading];
};

export default useAdmin;