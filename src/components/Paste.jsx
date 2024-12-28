import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
import { removeFromPaste } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formateDate";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const shareUrl = window.location.href; //my own

  // // Filter pastes based on search term (by title or content)
  // const filteredData = pastes.filter((paste) =>
  //   paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // Filter pastes based on search term (by title or content)
  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[1000px] h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-[1000px] flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            className="focus:outline-none w-full bg-transparent"
            type="search"
            placeholder="search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col w-[1000px] border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl text-left font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  {/* heading and Description */}

                  <div className="w-[50%] text-left flex flex-col space-y-3">
                    <p className="text-4xl font-semibold ">{paste?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                      {paste?.content}
                    </p>
                  </div>
                  {/* icons */}

                  <div className="flex flex-col gap-y-4 sm:items-end">
                    
                    <div className="flex flex-row gap-2 flex-wrap sm:flex-nowrap justify-items-end">
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                        // onClick={() => toast.error("Not working")}
                      >
                        <Link
                          to={`/?pasteId=${paste?._id}`}
                          className="text-black group-hover:text-blue-500"
                          size={20}
                        >
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        
                        </Link>
                      </button>

                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                        <Link to={`/pastes/${paste?._id}`}>
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </Link>
                      </button>

                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>

                    
                      <div className="flex  gap-1 flex-row justify-end ">
                        <FacebookShareButton url={shareUrl}>
                          <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>

                        <WhatsappShareButton url={shareUrl}>
                          <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>

                        <LinkedinShareButton url={shareUrl}>
                          <LinkedinIcon size={30} round={true} />
                        </LinkedinShareButton>

                        <TelegramShareButton url={shareUrl}>
                          <TelegramIcon size={30} round={true} />
                        </TelegramShareButton>

                        <TwitterShareButton url={shareUrl}>
                          <TwitterIcon size={30} round={true} />
                        </TwitterShareButton>
                      </div>

                      <div className="flex flex-row justify-end items-end">
                    <Calendar size={30} />
                    {FormatDate(paste?.createdAt)}
                  </div>
                     
                  </div>

                  {/* <div className="flex flex-row justify-end items-end">
                    <Calendar size={30} />
                    {FormatDate(paste?.createdAt)}
                  </div> */}
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
