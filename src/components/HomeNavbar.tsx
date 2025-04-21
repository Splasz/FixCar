import fixcarLogo from "../assets/FixCar_Logo.svg";
import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <div className="fixed w-full flex justify-between items-center border-b-1 bg-background p-2 pl-5 pr-5">
      <Link to={"/"}>
        <div className="flex gap-4.5 items-center text-5xl font-medium">
          <div>
            <img className="w-16" src={fixcarLogo} alt="fixcar logo" />
          </div>
          <div>FixCar</div>
        </div>
      </Link>
      <div className="flex gap-5">
        <Link to="/login">
          <div className="p-2.5 text-text font-medium rounded-xl bg-white border-1 border-gray-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Zaloguj
          </div>
        </Link>
        <Link to="/rejestracja">
          <div className="p-2.5 text-background font-medium rounded-xl bg-linear-120 from-[#307EC7] to-[#173D61] border-blue-950 border-1 shadow-[0_4px_4px_rgba(0,0,0,0.35)]">
            Rejestracja
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomeNavbar;
