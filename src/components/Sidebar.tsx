import { LuLogOut } from "react-icons/lu";
import fixcarLogo from "../assets/FixCar_Logo.svg";
import { GoHome } from "react-icons/go";
import { MdOutlineTask } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import supabase from "../api/supabase";

const sidebarItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <GoHome />,
    id: "dashboard",
  },
  {
    name: "Zlecenia",
    path: "/zlecenia",
    icon: <MdOutlineTask />,
    id: "zlecenia",
  },
  {
    name: "Klienci",
    path: "/klienci",
    icon: <BsPerson />,
    id: "klienci",
  },
  {
    name: "Ustawienia",
    path: "/ustawienia",
    icon: <GoGear />,
    id: "ustawienia",
  },
];

type SidebarProps = {
  authenticated: (vale: boolean) => void;
};

function Sidebar({ authenticated }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/");
    authenticated(false);
  };

  return (
    <div className="flex h-dvh w-2xs flex-col justify-between gap-2.5 p-2.5 text-2xl">
      <div className="flex gap-2.5 p-2.5">
        <div className="flex items-center">
          <img className="w-16" src={fixcarLogo} alt="fixcar logo" />
        </div>
        <div className="flex items-center text-3xl font-medium">FixCar</div>
      </div>
      <div className="h-full p-5 pt-10">
        <nav>
          <ul className="flex flex-col gap-6">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`sideBar ${
                    location.pathname === item.path
                      ? "active bg-primary text-background"
                      : ""
                  }`}
                >
                  <div>{item.icon}</div>
                  <div>{item.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <button
          onClick={signOut}
          className="sideBar hover:text-accent opacity-40 hover:opacity-90"
        >
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
