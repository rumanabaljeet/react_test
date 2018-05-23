import React from 'react';

const Movie = ({id, original_title,poster_path,desc,genres,onFavorite,fav})=>{
    return ( <div className="col-md-6">
                <div className="category-list-card">
                    <div className="category-image">
                        <img alt={original_title} src={`http://image.tmdb.org/t/p/w185/${poster_path}`} />
                    </div>
                    <div className="category-name">
                        <h3>{original_title}</h3>
                        <p>{desc}</p>
                        <p><b>Genres</b> : {genres}</p>
                        <button title="Add to Favorite" onClick={()=> onFavorite(id)} type="button" className={"btn btn-sm " +(fav?'btn-danger':'btn-success')}><span className={"glyphicon " + (fav?'glyphicon-minus':'glyphicon-plus')}></span> </button>
                         
                    </div>
                    
                </div>
            </div>)
}

export default Movie;