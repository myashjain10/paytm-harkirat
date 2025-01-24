import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { InputwithLabel } from "../components/InputwithLabel";
import { SubHeader } from "../components/SubHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
   try{ 
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
        username,
        firstName,
        lastName,
        password
      })
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      return;
   }catch(err){
    if(err.response && err.response.status === 409){
      console.log("inside Catch if")
      alert("User Already Exists");
    }else{
      alert("Please Try Again")
    }
   }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <Header label="Sign Up" />
        <SubHeader label="Enter your information to create an account" />

        <InputwithLabel onChange={(e)=>{
          setFirstName(e.target.value)
          }} label="First Name" placeholder="John" />

        <InputwithLabel onChange={(e)=>{
          setLastName(e.target.value)
          }} label="Last Name" placeholder="Doe" />

        <InputwithLabel onChange={(e)=>{
          setUsername(e.target.value)
          }} label="Email" placeholder="example@example.com" type="email" />

        <InputwithLabel onChange={(e)=>{
          setPassword(e.target.value)
          }} label="Password" placeholder="Your Password" type="password" />
        
        <Button onClick={handleSignUp} label="Sign Up" />
       <BottomWarning label="Already have an Account?" buttonText="Sign In" to="/signin" />
      </div>
    </div>
  );
}
