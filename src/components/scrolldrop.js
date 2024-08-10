import React, { useState, useEffect } from 'react';
import { fetchLanguages } from '../apis/apis';
import '../css/scrolldrop.css';

const CustomDropdown = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const getLanguages = async () => {
            try {
                const data = await fetchLanguages();
                const languageOptions = data.map(language => ({
                    label: language.english_name,
                    code: language.iso_639_1
                }));
                setLanguages(languageOptions);
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };

        getLanguages();
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option.code);  // Pass the selected option code
        setIsOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredOptions = languages.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="custom-dropdown" style={{ width: '150px', marginRight: '20px' }}>
            <div className="custom-dropdown-header" onClick={toggleDropdown}>
                {selectedOption.label || 'Select Language'}
            </div>
            {isOpen && (
                <div className="custom-dropdown-options">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="dropdown-search-input"
                    />
                    <div
                        className="custom-dropdown-option"
                        onClick={() => handleOptionClick({ label: 'Popular', code: '' })}
                    >
                        Popular
                    </div>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="custom-dropdown-option"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="custom-dropdown-option">
                            No languages found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
