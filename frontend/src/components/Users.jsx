import { useEffect, useState } from "react"
import { Button } from "./Button"
import { Link } from "react-router-dom";
import axios from "axios";

export function Users(){
    const [users, setUsers] = useState([{
        firstName: "Yash",
        lastName: "Jain",
        userId: "123456"
    }]); 
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then((response)=>{
            setUsers(response.data.users);
        })
        
    },[filter]) 



    return (
        <div>
            <h2 className="font-semibold text-lg"> Users </h2>
            <div className="mb-2">
                <input
                onChange={(e)=> setFilter(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border rounded-lg hover:border-black"
                placeholder="Search users..."
                />
            </div>
            {users.map((user)=>{
                return <User key={user.userId} user={user} />
            })}
        </div>
    )
}

function User({user}){
    
    return(
        <div className="flex justify-between my-1">
            <div className="flex my-auto">
                <div className="flex flex-col justify-center text-center h-12 w-12 bg-slate-300 rounded-full">{user.firstName[0]}</div>
                <div className="my-auto ml-2">{user.firstName} {user.lastName}</div>
            </div>
            <div className="my-auto">
                <Link to={`/send?id=${user.userId}&name=${user.firstName}_${user.lastName}`}>
                    <Button label="Send Money" />
                </Link>
            </div>
        </div>
    )
}

