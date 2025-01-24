export function Appbar({image}){
    return (
        <div className="flex justify-between h-12 shadow-md border-1 w-full p-1 mb-3">
            <h2 className="text-xl font-semibold ml-1 my-auto">PayTM App</h2>
            <div className="flex ">
                <div className="my-auto">Hello</div> 
                <img src="src/assets/react.svg" className="h-full my-auto rounded-full bg-slate-500 ml-2 mr-3" alt="icon" />
            </div>
        </div>
    )
//     return <div className="shadow h-14 flex justify-between">
//     <div className="flex flex-col justify-center h-full ml-4">
//         PayTM App
//     </div>
//     <div className="flex">
//         <div className="flex flex-col justify-center h-full mr-4">
//             Hello
//         </div>
//         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//             <div className="flex flex-col justify-center h-full text-xl">
//                 U
//             </div>
//         </div>
//     </div>
// </div>
}