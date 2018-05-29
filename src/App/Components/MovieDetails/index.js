import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'is-empty';
import { ToastContainer, toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import 'react-toastify/dist/ReactToastify.css';
import { ScaleLoader } from 'react-spinners';
import { Genres, GetMovie, SimilarMovies } from './../../Actions';
import Movie from './../Common/Movie';
import Header from './../Common/Header';
import history from './../../../Utils/history';


class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similar_movies: [],
      genres:[],
      favorites:[],
      errMsg: '',
      isRes: true,
      movie: {},
      loading:true
    }
  }

  componentDidMount() {
    this.props.Genres();
    if (this.props.match.params.id) {
      this.props.GetMovie(this.props.match.params.id);
      this.props.SimilarMovies(this.props.match.params.id);
    }
    if(!isEmpty(localStorage.getItem('FAV_MOV'))){
      this.setState({
        favorites: JSON.parse(localStorage.getItem('FAV_MOV'))
      })
    }
  }

  handleFavorite = (movie) =>{
    let fav_mov = [];
    if(!isEmpty(localStorage.getItem('FAV_MOV'))){
      fav_mov = JSON.parse(localStorage.getItem('FAV_MOV'));
      let index = fav_mov.findIndex(x =>  x.id === movie.id );
      if(index !== -1){
        toast.success("Removed from favorite list successfully!");
        fav_mov.splice(index,1);
      }else{
        toast.success("Added to favorite list successfully!");
        fav_mov.push(movie)
      }
    }else{
      fav_mov.push(movie);
    }
    localStorage.setItem('FAV_MOV', JSON.stringify(fav_mov));
    this.setState({
      favorites:fav_mov
    })
  }

  goToDetails = (id) =>{
    history.push(`/movie-details/${id}`);
    this.props.GetMovie(id);
    this.props.SimilarMovies(id);
    this.setState({
      loading:true
    })
    window.scrollTo(0, 0);
  }


  componentWillReceiveProps(nextProps) {
    const {movie,similar_movies,genres} = nextProps;
    if(genres){
      this.setState({
        genres:genres.genres
      })
    }
    if(movie){
      this.setState({
        movie:movie,
        loading:false
      })
    }
    if(similar_movies){
      this.setState({
        similar_movies:similar_movies.results
      })
    }
  }
  render() {
    const { genres ,movie,similar_movies,favorites,loading } = this.state;
    const substr = (str) => str ? str.length > 180 ? str.substr(0, 180) + `...` : str : '';
    const Runtime = (time) => `${parseInt(time/60,10)}h ${time%60}m`;
    const getGenres = (ids) => {
      const res = genres.filter(genre => ids.includes(genre.id));
      const name = res.map(val =>val.name);
      return name.toString();
    }
const checkkFav = (id)=>favorites.findIndex(x =>  x.id === id );
    return (
      <div className="container">
       {loading ?
        <div className='sweet-loading'>
          <ScaleLoader
            loading={loading} 
          />
        </div>:
        <div className="content">
          <Header title={movie.title} search={false} />
          <div className="row">

          <div className="col-md-12">
                <div className="category-list-card" style={{'height':'auto'}}>
                    <div className="category-image" style={{'height':'auto','width':'320px'}}>
                        <img alt={movie.original_title} src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
                    </div>
                    <div className="category-name">
                        <h3>{movie.original_title}</h3>
                        <p>{movie.overview}</p>
                       
                        <p><strong>Tagline</strong> : {movie.tagline}</p>
                        <p><strong>Runtime</strong> : {Runtime(movie.runtime)}</p>
                        <p><strong>Release date</strong> : {movie.release_date}</p>
                        <p><strong>Status</strong> : {movie.status}</p>
                        <p><strong>Budget</strong> : {movie.budget ?<NumberFormat value={movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} />: ' -'}</p>
                        <p><strong>Revenue</strong> : {movie.revenue?<NumberFormat value={movie.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} />:' -'}</p>
                        <p><strong>Home Page</strong> : {movie.homepage? <a href={movie.homepage} target="blank">{movie.homepage}</a>:' -'}</p>
                        <p><strong>Release date</strong> : {movie.release_date}</p>
                        <p><b>Genres</b> : { movie.genres && movie.genres.map((item,index)=>{
                           return <span key={index}> {item.name}{ index < movie.genres.length -1 ? ',':''} </span>
                         })}</p>
                    </div>
                    
                </div>
            </div>
            </div>
            <div class="row">
            <div class="page-header">
              <h4>Similar Movies</h4>
            </div>
           {  similar_movies && similar_movies.map((item, index) => {
              return <Movie key={index} movie={item} genres={getGenres(item.genre_ids)} desc={substr(item.overview)} onFavorite={this.handleFavorite} viewDetals={this.goToDetails} fav={checkkFav(item.id)} />
            })} 
          </div>
        </div>}
        <ToastContainer />
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  const res = {};
  if (state.action === 'SIMILAR_MOIVES') {
    res['similar_movies'] = state.data;
  }
  if (state.action === 'MOVIE') {
    res['movie'] = state.data;
  }
  if (state.action === 'GENRES') {
    res['genres'] = state.data;
  }

  return res;
}

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({ Genres: Genres, GetMovie:GetMovie, SimilarMovies:SimilarMovies}, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(Movies);
