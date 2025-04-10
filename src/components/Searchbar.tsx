import "./Searchbar.css";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "@mui/material";

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
    setShowResults(false); // Resetujemy pokazywanie wyników przy zmianie zapytania
  };

  const fetchData = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 1) {
        setResults([]);
        setLoading(false);
        return;
      }

      const startTime = Date.now();
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost/react_backend/searchbarAPI.php?query=${searchQuery}`
        );
        setResults(response.data);
        setShowResults(true); // Pokazujemy wyniki tylko gdy dane zostały pobrane
      } catch (error) {
        console.error("Błąd podczas wyszukiwania:", error);
        setResults([]);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(100 - elapsedTime, 0);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      }
    }, 100),
    []
  );

  useEffect(() => {
    if (query) {
      fetchData(query);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query, fetchData]);

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

      {showResults && !loading && results.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded mt-1 max-h-60 overflow-auto">
          <ul>
            {results.map((item, index) => (
              <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                {item.pelne_imie}
                <span className="pl-2.5"> {item.pojazd}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && !loading && results.length === 0 && query.length >= 3 && (
        <p className="py-2">Brak wyników</p>
      )}
    </div>
  );
}

export default Searchbar;
