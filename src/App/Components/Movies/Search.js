import React from 'react';

const Search = (props)=>{
    return ( <div className="col-md-4 col-md-offset-4">
        <input className="form-control" type="text" placeholder="Search..." onChange={props.onSearch} />
    </div>)
}

export default Search;