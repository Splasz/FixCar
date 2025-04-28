import "./Searchbar.css";
import { GoSearch } from "react-icons/go";
import { useState, useEffect } from "react";
import supabase from "../api/supabase";

interface Result {
  pelne_imie: string;
  pojazd: string;
}

function Searchbar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setShowResults(false);
  };

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchQuery = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase.rpc("searchbar", {
        query_text: query,
        user_uuid: user?.id,
      });

      setLoading(false);

      if (error) {
        console.error("Błąd zapytania:", error.message);
      } else {
        setResults(data);
        setShowResults(true);
        console.log(data);
      }
    };

    fetchQuery();
  }, [query]);

  return (
    <div className="relative min-w-4/5">
      <div className="input-wrapper opacity-40">
        <GoSearch className="input-icon size-6" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="input-field"
          placeholder="Szukaj"
        />
      </div>

      {loading && <p className="py-2">Ładowanie...</p>}

      {showResults && !loading && results.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white shadow-lg">
          <ul>
            {results.map((item, index) => (
              <li
                key={index}
                className="border-highlight cursor-pointer border-b-1 p-2 hover:bg-gray-100"
              >
                {item.pelne_imie}
                <span className="pl-2.5"> {item.pojazd}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && !loading && results.length === 0 && query.length >= 2 && (
        <p className="py-2">Brak wyników</p>
      )}
    </div>
  );
}

export default Searchbar;
