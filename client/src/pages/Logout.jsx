
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import { Redirect } from 'react-router'
const Logout = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.currentUser);



  
   useEffect(()=>{
    logout(dispatch, { user });
   },[])
      
  
    return (
        <div>
              <Redirect to='/'/>;
        </div>
      
    )
}

export default Logout;