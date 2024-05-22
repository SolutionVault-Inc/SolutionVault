'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SearchBar.css';

const SearchBar = () => {
  const [searchContent, setSearchContent] = useState('');

  const router = useRouter();

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    setSearchContent(e.target.value);
  };

  const handleClick = async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerms: searchContent }),
    });
    setSearchContent('');
    console.log(response.json());
    router.refresh();
  };

  return (
    <div className="searchBarContainer">
      <input type="text" placeholder="Search" onChange={handleSearch} value={searchContent}></input>
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default SearchBar;
