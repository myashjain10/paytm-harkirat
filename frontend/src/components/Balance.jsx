import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button";
import axios from "axios";

export function Balance(){
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const handleButtonClick = ()=>{
        try{
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then(response => {
                setValue(response.data.balance);
            })
        }catch(err){
            console.log(err)
            alert("You need to Sign In first")
            navigate("/signin")
           }
    };
    
    return(
        <div className="flex gap-4 mb-4">
            <div className="font-bold text-lg my-auto ">
                Your balance
            </div>
            <div className="flex justify-center font-semibold my-auto text-lg">
                Rs. {(value=="")? "XXXX" : value }
            </div>
            <button  className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600" onClick={handleButtonClick}>Show Balance</button>
        </div>
    )
}