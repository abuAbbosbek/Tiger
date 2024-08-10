import React, { useState } from "react";

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const data = ["Apple", "Banana", "Orange", "Mango", "Pineapple"];

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        if (searchTerm === "") {
            setResults([]);
        } else {
            const filteredResults = data.filter((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
    }, [searchTerm]);

    return (
        <div>
            <input
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {results.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
