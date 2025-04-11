import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link
          className="bg-primary text-background shadow-2xl p-2.5 rounded-2xl"
          to="/login"
        >
          Zaloguj
        </Link>
      </div>
      <div>
        <Link
          className="bg-primary text-background shadow-2xl p-2.5 rounded-2xl"
          to="/rejestracja"
        >
          Rejestracja
        </Link>
      </div>
    </div>
  );
}

export default Home;
