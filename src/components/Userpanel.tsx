import { FaBell } from "react-icons/fa";
import { Menu, MenuButton } from "@headlessui/react";
import userProfile from "../assets/userProfile.png";
import { useState, useEffect } from "react";
import supabase from "../api/supabase";
import NotificationDropDown from "./NotificationDropDown";

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
    <div className="flex w-full items-center gap-2.5">
      <div className="pr-5 pl-5">
        <NotificationDropDown />
      </div>
      <Menu>
        <MenuButton className="user-dropdown hover:bg-highlight active:bg-highlight flex cursor-pointer items-center justify-start gap-1.5 rounded-2xl pr-4">
          <div className="p-2.5">
            <img
              className="w-15 rounded-full"
              src={userProfile}
              alt="userProfile"
            ></img>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-2xl font-semibold">{userName}</div>
            <div className="text-sm opacity-50">Administrator</div>
          </div>
        </MenuButton>
      </Menu>
    </div>
  );
}

export default Userpanel;
