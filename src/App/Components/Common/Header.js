import React from 'react';
import { Link }from 'react-router-dom';
import Search from './Search';

const Header = ({title, onSearch, search }) =>{
    return(
        <div className="row">
          <div className="col-md-12">
          <h1 style={{textAlign:'center'}}>{title}</h1>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li className={(title === 'Movies'?'active':'')}><Link to="/movies">Home</Link></li>
                <li className={(title === 'Favorites'?'active':'')}><Link to="/favorites">Favorites</Link></li>
              </ul>
            { search ? <Search onSearch={onSearch}/> : ''}
              
            </div>
          </nav>
          </div>
        </div>
    )
}

export default Header;