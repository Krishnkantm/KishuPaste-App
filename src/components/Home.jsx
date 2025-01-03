import { useState } from "react";//second
import { Copy, PlusCircle } from "lucide-react";///first
import { useSearchParams } from "react-router-dom";//sixth
import toast from "react-hot-toast";//tird
import {useDispatch, useSelector} from "react-redux"//fourth
import { addToPaste, updateToPaste } from "../redux/pasteSlice";//fifth
import { useEffect } from "react";//second
// import { Copy, PlusCircle } from "lucide-react";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state)=>state.paste.pastes);
  const dispatch = useDispatch();
  
  
  function createPaste() {
    const paste = {
       title : title,
       content : value,
       _id : pasteId ||
            Date.now().toString(36)+Math.random().toString(36).substring(2),
       createdAt:new Date().toISOString(),
    }

    if(pasteId){
      //update the paste
        dispatch(updateToPaste(paste));
    }
    else{
      //create a paste
      dispatch(addToPaste(paste));
    }
     // after updateion or creation 

     setTitle('');
     setValue('');
     setSearchParams({});
  }

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  useEffect(() => {
    if(pasteId){
     const paste = pastes.find((p) => p._id === pasteId);
     setTitle(paste.title);
     setValue(paste.content);
    }
 }, [pasteId,pastes]);

    

  return (
    <div className="w-full h-full py-10 max-w-[1180px] mx-auto px-5 lg:px-0">
    <div className="flex flex-col gap-y-5 items-start">
      <div className="w-full flex flex-row gap-x-4 justify-between items-center">
        <input
          // className="p-1 rounded-2xl mt-2 w-[66%] pl-5"
          type="text"
          placeholder="Enter title here...✒️"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${
            pasteId ? "w-[80%]" : "w-[85%]"
          } text-red-600 border border-input rounded-md p-2`}

        />

        <button onClick={createPaste} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
        
        {pasteId &&  <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={resetPaste}
          >
            <PlusCircle size={20} />
          </button>}
      </div>
      <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >

      <div className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
          
      <div className="w-full flex gap-x-[6px] items-center select-none group" >
      
      <div className="w-[13px] h-[13px] rounded-full flex p-[1px]  items-center justify-center overflow-hidden bg-[rgb(255,95,87)]" />

      <div className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`} />
      
      <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
      </div>
      {/* Circle and copy btn */}
      <div className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}>
      
                {/*Copy  button */}
                <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
              <Copy className="group-hover:text-sucess-500" size={20} />
          </button>
          </div>
          </div>
      
        <textarea
          value={value}
          placeholder="Write Your Content here..."
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3  focus-visible:ring-0"
          style={{
            caretColor: "#000",
          }}

          rows={12}
        />
      </div>
    </div>
   </div>
  );
};

export default Home;
