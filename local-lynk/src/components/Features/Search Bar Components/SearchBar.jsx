// Think this search bar should go up on the navbar once that is officially built out!

import { useState } from "react";
import {FaSearch} from "react-icons/fa"

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

        // we need to have this go to backend with the services, but for now I am just using Jsonplaceholder so we can see how it works!
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((post) => {
                return (
                    value &&
                    post &&
                    post.title &&
                    post.title.toLowerCase().includes(value)
                );
                });
                setResults(results);
            });
        };
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)}/>

        </div>

    );
};
