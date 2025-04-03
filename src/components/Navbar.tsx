import Searchbar from "./Searchbar";
import Userpanel from "./Userpanel";

function Navbar() {
  return (
    <>
      <div className="flex items-center">
        <Searchbar />
        <Userpanel />
      </div>
    </>
  );
}

export default Navbar;
