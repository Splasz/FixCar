import "./Searchbar.css";
import { GoSearch } from "react-icons/go";
import { useState, useEffect } from "react";
import supabase from "../api/supabaseClient";

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
      const { data, error } = await supabase
        .from("searchbar")
        .select("*")
        .ilike("pelne_imie", `%${query}%`);

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
    <div className="min-w-4/5 relative">
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
        <div className="absolute z-10 w-full bg-white shadow-lg rounded mt-1 max-h-60 rounded-2xl overflow-auto">
          <ul>
            {results.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b-1 border-highlight"
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
