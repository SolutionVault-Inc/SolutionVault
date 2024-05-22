
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './SearchBar.css'



const SearchBar = (props) => {

  const [ searchContent,setSearchContent ] = useState("")

  const router = useRouter()
  
  const handleSearch = (e:any) => {
    setSearchContent(e.target.value)

  }

  const handleClick = async() => {
    const response = await fetch('/api/search',{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({searchTerms:searchContent})
    })
    setSearchContent("")
    const newProblems = await response.json()
    props.setProblems(newProblems)
    router.refresh()
  }

  return (
    <div className="searchBarContainer">
      <input className="search" type="text" placeholder="Search" onChange={handleSearch} value={searchContent}></input>
      <button className="search-btn" onClick={handleClick}>Search</button>
    </div>
  )
}

export default SearchBar