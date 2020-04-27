import React, { useState } from 'react';

const  SearchBar = (props) => {
    const [term, setTerm] = useState([]);

   const onFormSubmit = (event) => {
        event.preventDefault();
        console.log("SUBMIT--->", term)
        props.onSearch(term);

    };

        return (
            <div className="ui segment">
                <form onSubmit={onFormSubmit} className="ui form" autoComplete="off">
                    <div className="field">
                        <label><h2>Search:</h2></label>
                        <div style={{display:"flex"}}>
                            <input id="input" type="text" value={term}
                                onChange={(e) => setTerm(e.target.value)} />
                            <button type="submit" >Search</button>
                        </div>

                    </div>
                </form>
            </div>
        );
}

export default SearchBar;