import { useEffect, useState } from "react";
import axios from "axios";

const CountryView = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
      )
      .then((response) => setWeatherData(response.data));
  }, []);

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
      {weatherData && (
        <>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {weatherData.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>wind {weatherData.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

const MultiCountryView = ({ country }) => {
  const [show, setShow] = useState();

  return (
    <div>
      {country.name.common}{" "}
      <button type="button" onClick={() => setShow(!show)}>
        {show ? "hide" : "show"}
      </button>
      {show && <CountryView country={country} />}
    </div>
  );
};

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
  if (!searchTerm) return null;

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  if (filteredCountries.length === 0) return <p>No countries found</p>;

  if (filteredCountries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    return (
      <div>
        {filteredCountries.map((country) => {
          return (
            <MultiCountryView country={country} key={country.name.common} />
          );
        })}
      </div>
    );

  const country = filteredCountries[0];

  return <CountryView country={country} />;
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
