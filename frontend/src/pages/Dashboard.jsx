import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return(
        <div className="">
            <Appbar />
            <div className="mx-7">
                <Balance value={10000}/>
                <Users></Users>
            </div>
        </div>
    )
}