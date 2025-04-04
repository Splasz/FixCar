import { LuLogOut } from "react-icons/lu";
import fixcarLogo from "../assets/FixCar_Logo.svg";
import { GoHome } from "react-icons/go";
import { MdOutlineTask } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { LuWarehouse } from "react-icons/lu";
import { TbPigMoney } from "react-icons/tb";
import { GoGear } from "react-icons/go";

import { Link } from "react-router-dom";
import "./Sidebar.css";

type SidebarProps = {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <div className="w-2xs h-dvh flex flex-col p-2.5 gap-2.5 justify-between text-2xl">
      <div className="flex p-2.5 gap-2.5">
        <div className="flex items-center">
          <img className="w-16" src={fixcarLogo} alt="fixcar logo" />
        </div>
        <div className="text-3xl flex items-center font-medium">FixCar</div>
      </div>
      <div className="h-full p-5 pt-10">
        <nav>
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                to="dashboard"
                onClick={() => setActivePage("dashboard")}
                className={`sideBar ${
                  activePage === "dashboard"
                    ? "active bg-primary text-background"
                    : ""
                }`}
              >
                <div>
                  <GoHome />
                </div>
                <div>Dashboard</div>
              </Link>
            </li>
            <li>
              <Link
                to="/zlecenia"
                onClick={() => setActivePage("zlecenia")}
                className={`sideBar ${
                  activePage === "zlecenia"
                    ? "active bg-primary text-background"
                    : ""
                }`}
              >
                <div>
                  <MdOutlineTask />
                </div>
                <div>Zlecenia</div>
              </Link>
            </li>
            <li>
              <button className="sideBar">
                <div>
                  <BsPerson />
                </div>
                <div>Klienci</div>
              </button>
            </li>
            <li>
              <button className="sideBar">
                <div>
                  <LuWarehouse />
                </div>
                <div>Magazyn</div>
              </button>
            </li>
            <li>
              <button className="sideBar">
                <div>
                  <TbPigMoney />
                </div>
                <div>Finanse</div>
              </button>
            </li>
            <li>
              <button className="sideBar">
                <div>
                  <GoGear />
                </div>
                <div>Ustawienia</div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <button className="sideBar opacity-40 hover:text-accent hover:opacity-90">
          <div className="flex items-center">
            <LuLogOut />
          </div>
          <div className="text-xl">Wyloguj</div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
