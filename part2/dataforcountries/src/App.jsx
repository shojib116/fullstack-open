import { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ searchTerm, handleTermChange, disabled }) => {
  return (
    <div>
      find countries{" "}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleTermChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

const Result = ({ searchTerm, countries }) => {
  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  if (!searchTerm || filteredCountries.length === 0) return null;

  if (filteredCountries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    return (
      <div>
        {filteredCountries.map((country) => {
          return <div key={country.name.common}>{country.name.common}</div>;
        })}
      </div>
    );

  const country = filteredCountries[0];

  const languages = [];
  for (const key of Object.keys(country.languages)) {
    languages.push(country.languages[key]);
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleTermChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Search
        searchTerm={searchTerm}
        handleTermChange={handleTermChange}
        disabled={countries === null}
      />
      {countries === null ? (
        <div>Please wait. Loading the data</div>
      ) : (
        <Result searchTerm={searchTerm} countries={countries} />
      )}
    </>
  );
};

export default App;
