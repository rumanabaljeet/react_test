import React from 'react';

const Search = (props)=>{
    return (
        <div className="pull-right">
            <form className="navbar-form navbar-left" >
                <input className="form-control" type="text" placeholder="Search..." onChange={props.onSearch} />
            </form>
        </div>
   )
}

export default Search;