import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { InputwithLabel } from "../components/InputwithLabel";
import { useState } from "react";
import axios from "axios";

export function SendMoney(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name").split('_');
    const [amount,setAmount] = useState(0);

    const handleButtonClick = async ()=>{
        if(amount === 0 || amount < 0){
            return alert("Amount should be greater than 0");
        }
        
        try{
            const token = localStorage.getItem("token")
            axios.post("http://localhost:3000/api/v1/account/transfer",{
                to: id,
                amount: Number(amount)
            },{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then(response => {
                alert(response.data.message)
                navigate("/dashboard");
            })
        }catch(err){
            if(err.response && (err.response.status == 401 || err.response.status == 403)){
                alert("You need to Sign In first")
                navigate("/signin")
            }else if(err.response.status == 400){
                alert(err.reponse.data.message);
            }else{
                console.log(err);
            }
        }

    } 

    return(
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="flex flex-col m-auto h-min text-card-foreground max-w-md p-8 w-96 bg-white shadow-lg rounded-xl">
                <h1 className=" font-semibold text-center text-3xl mb-20">Send Money</h1>
                <div className="flex gap-2">
                    <div className="flex flex-col text-xl justify-center text-center h-12 w-12 bg-blue-400 rounded-full">{name[0][0]}</div>
                    <h3 className="my-auto text-2xl font-medium">{name[0] + " " + name[1]}</h3>
                </div>
                <InputwithLabel type="number" onChange={e => setAmount(e.target.value)} label="Amount (in Rs)" placeholder="Enter amount"></InputwithLabel>
                <Button onClick={handleButtonClick} label="Initiate Transfer" />
                
            </div>
        </div>
    )
}