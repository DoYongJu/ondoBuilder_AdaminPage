import React, { useState, useRef, useEffect } from 'react';
import {useSetRecoilState} from 'recoil';
import {searchState } from '../../Resources/Recoil';
import './SearchBar.css';



const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setSearchState = useSetRecoilState(searchState);

  function handleIconClick(e: React.MouseEvent){
    
    if (inputRef.current) {
        inputRef.current.value = '';
      };
    
    setIsExpanded(!isExpanded);

    if (containerRef.current && !containerRef.current.classList.contains('active')) {
      containerRef.current.classList.add('active');
      e.preventDefault();
   
    } else if (containerRef.current && containerRef.current.classList.contains('active') && e.target instanceof HTMLElement && !e.target.closest('.input-holder')) {
      containerRef.current.classList.remove('active');
    };
  };
  
  const onSubmitSearch = (e:any) => {
    if (e.key === 'Enter'){
        if (inputRef.current) {
        const inputValue: string = inputRef.current?.value;    
        setSearchState(inputValue);
      };
    };
  };

  return (
    <div className={`search_wrapper ${isExpanded ? 'active' : ''}`} ref={containerRef}>
      <div className={`input_holder ${isExpanded ? 'active' : ''}`} >
        <input type="search" className='search_input' placeholder="Input word to search " ref={inputRef} onKeyPress={onSubmitSearch} />
        <button className='search_icon' onClick={handleIconClick} >
            <span></span>
        </button>

      </div>
     
    </div>
  );
};


export default SearchBar;
