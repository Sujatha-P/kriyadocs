import React, { useState } from 'react';

const continentsData = [
  {
    name: 'Africa',
    countries: [
      { name: 'Country 1', population: '100,000', totalCases: '1,000' },
      { name: 'Country 2', population: '200,000', totalCases: '2,000' },
    ],
  },
  {
    name: 'Asia',
    countries: [
      { name: 'Country 3', population: '300,000', totalCases: '3,000' },
      { name: 'Country 4', population: '400,000', totalCases: '4,000' },
    ],
  },
  {
    name:'india',
    countries: [
        { name: 'Country 5', population: '300,000', totalCases: '3,000' },
        { name: 'Country 6', population: '400,000', totalCases: '4,000' },
      ],
  }
];

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
        <table className="country-table table border w-50  m-auto table-hover">
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

const AppData = () => {
  const [searchQuery, setSearchQuery] = useState('');
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

export default AppData;
