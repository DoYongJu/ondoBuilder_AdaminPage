import React, { useState } from 'react';
import './SelectBox.css';
import { FaAngleDown } from "react-icons/fa";
type Option = {
  id: number;
  name: string;
};
type SelectBoxProps = {
    handleSelect: (e: any) => void;
    selectList: Option[];
  };
  
const SelectBox: React.FC<SelectBoxProps> = ({ handleSelect, selectList })=> {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="custom-select-box">
        <div className="select-header" onClick={handleToggle}>
          {selectedOption || selectList[0].name}
          {isOpen && (
          <ul className="options-list">
            {selectList.slice(1).map((option, index) => (
              <li key={index} onClick={() => { handleSelect(option); setSelectedOption(option.name) }} value={option.name}>
                {option.name}
              </li>
            ))}
          </ul>
          )}
          <FaAngleDown />
        </div> 
    </div>
);
};
export default SelectBox;