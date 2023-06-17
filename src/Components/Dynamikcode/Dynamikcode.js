import React, { useState, useEffect } from 'react';

const apiKey = 'SIGN-UP-FOR-KEY';  

const Continent = ({ name, countries }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="continent" onClick={toggleExpanded}>
        {name} {expanded ? '[-]' : '[+]'}
      </div>
      {expanded && (
        <table className="country-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Population</th>
              <th>Total COVID Cases</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <td>{country.name}</td>
                <td>{country.population}</td>
                <td>{country.totalCases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const Task = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [continentsData, setContinentsData] = useState([]);

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchCountriesData = async () => {
    try {
      const response = await fetch('https://covid-193.p.rapidapi.com/countries', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const countriesData = data.response.map((country) => ({
        name: country,
        population: '',
        totalCases: '',
      }));

      setContinentsData([
        {
          name: 'All Continents',
          countries: countriesData,
        },
      ]);
    } catch (error) {
      console.error('Error fetching countries data:', error);
    }
  };

  const filteredContinents = continentsData.filter((continent) =>
    continent.countries.some((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <h1>Continents</h1>
      <input
        type="text"
        placeholder="Search by country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredContinents.map((continent, index) => (
        <Continent
          key={index}
          name={continent.name}
          countries={continent.countries}
        />
      ))}
    </div>
  );
};

export default Task;

