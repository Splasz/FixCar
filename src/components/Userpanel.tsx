import { FaBell } from "react-icons/fa";
import { Menu, MenuButton } from "@headlessui/react";
import userProfile from "../assets/userProfile.png";
import { useState, useEffect } from "react";
import supabase from "../api/supabaseClient";

function Userpanel() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user?.user_metadata.username) {
        setUserName(user.user_metadata.username);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className="pr-5 pl-5">
        <button className="cursor-pointer p-1 rounded-full hover:bg-highlight active:bg-highlight">
          <FaBell className="size-7 text-primary" />
        </button>
      </div>
      <Menu>
        <MenuButton className="user-dropdown flex items-center justify-start gap-1.5 pr-4 rounded-2xl hover:bg-highlight active:bg-highlight cursor-pointer">
          <div className="p-2.5">
            <img
              className="w-15 rounded-full"
              src={userProfile}
              alt="userProfile"
            ></img>
          </div>
          <div className=" flex flex-col items-start">
            <div className="text-2xl font-semibold">{userName}</div>
          </div>
        </MenuButton>
      </Menu>
    </div>
  );
}

export default Userpanel;
