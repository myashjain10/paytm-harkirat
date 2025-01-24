import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { InputwithLabel } from "../components/InputwithLabel";
import { SubHeader } from "../components/SubHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSignIn = async () => {
    try{ 
       const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
         username,
         password
       })
       localStorage.setItem("token", response.data.token);
       navigate("/dashboard");
       return;
    }catch(err){
     if(err.response && err.response.status === 409){
        alert("Incorrect Email or Password")
     }else{
        alert("Please Try Again")
     }
    }
   }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <Header label="Sign In" />
        <SubHeader label="Enter your information to Sign In" />

        <InputwithLabel onChange={(e)=>{
          setUsername(e.target.value)
          }} label="Email" placeholder="example@example.com" type="email" />

        <InputwithLabel onChange={(e)=>{
          setPassword(e.target.value)
          }} label="Password" placeholder="Your Password" type="password" />
          
        <Button onClick={handleSignIn} label="Sign In" />
        <BottomWarning label="Don't have an Account?" buttonText="Sign Up" to="/signup" />
      </div>
    </div>
  );
}
