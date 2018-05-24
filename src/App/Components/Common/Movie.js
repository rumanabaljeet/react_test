import React from 'react';

const Movie = (props,{onFavorite})=>{
    return ( <div className="col-md-6">
                <div className="category-list-card">
                    <div className="category-image">
                        <img alt={props.movie.original_title} src={`http://image.tmdb.org/t/p/w185/${props.movie.poster_path}`} />
                    </div>
                    <div className="category-name">
                        <h3>{props.movie.original_title}</h3>
                        <p>{props.desc}</p>
                        <p><b>Genres</b> : {props.genres}</p>
                        <button title="Add to Favorite" onClick={()=> props.onFavorite(props.movie)} type="button" className={"btn btn-sm " +(props.fav !== -1?'btn-danger':'btn-success')}><span className={"glyphicon " + (props.fav !== -1?'glyphicon-minus':'glyphicon-plus')}></span> </button>
                        {/*<button type="button" class="btn btn-info pull-right" onClick={ ()=>props.viewDetals(props.movie.id) }>View Details</button>*/}
                    </div>
                    
                </div>
            </div>)
}

export default Movie;