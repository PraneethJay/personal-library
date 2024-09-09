import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search for books"
        value={query}
        onChange={handleChange}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchBar;
