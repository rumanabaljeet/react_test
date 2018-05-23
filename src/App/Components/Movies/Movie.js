import React from 'react';

const Movie = ({original_title,poster_path,desc})=>{
    return ( <div className="col-md-6">
                <div className="category-list-card">
                    <div className="category-image">
                        <img alt={original_title} src={`http://image.tmdb.org/t/p/w185/${poster_path}`} />
                    </div>
                    <div className="category-name">
                        <h3>{original_title}</h3>
                        <p>{desc}</p>
                    </div>
                </div>
            </div>)
}

export default Movie;