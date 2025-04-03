import "./Searchbar.css";
import { GoSearch } from "react-icons/go";

function Searchbar() {
  return (
    <div className="min-w-4/5">
      <form>
        <div className="input-wrapper  opacity-40">
          <GoSearch className="input-icon size-6" />
          <input className="input-field" type="text" placeholder="Szukaj" />
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
