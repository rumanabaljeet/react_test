import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'is-empty';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Genres } from './../../Actions';
import Movie from './../Common/Movie';
import Header from './../Common/Header';
import history from './../../../Utils/history';


class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],      
      errMsg:'',
      total_pages:0,
      currentPage:0,
      isRes : true,
      favorites:[],
      result:[]
    }
  }

  componentDidMount() {
    this.props.Genres();
    if(!isEmpty(localStorage.getItem('FAV_MOV'))){
      const  movies = JSON.parse(localStorage.getItem('FAV_MOV'));;
      this.setState({
        movies: movies,
        total_pages : movies.length/10,
        result:movies.slice(0, 10)
      })
    }
  }

  onPageChange = (page)=>{
    const movies = this.state.movies;
    let result = movies.slice(page.selected * 10, (page.selected + 1) * 10);
    this.setState({
      currentPage:page.selected,
      result:result
    });
    window.scrollTo(0, 0)
  }

  handleFavorite = (movie) =>{
     let fav_mov = JSON.parse(localStorage.getItem('FAV_MOV'));
     let index = fav_mov.findIndex(x =>  x.id === movie.id );
     if(index !== -1){
        fav_mov.splice(index,1);
        toast.success("Removed from favorite list successfully!");
     }
    localStorage.setItem('FAV_MOV', JSON.stringify(fav_mov));
    this.setState({
      movies:fav_mov,
      total_pages : fav_mov.length/10,
      result:fav_mov.slice(0, 10)
    });
  }

  goToDetails = (id) =>{
    history.push(`/movie-details/${id}`);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.genres){
      const { genres } = nextProps.genres;
      this.setState({
        genres:genres
      })
    }
    
  }
  render() {
    const { result,total_pages,currentPage,genres, favorites } = this.state;
    console.log(result,'aaaaafff');
    const substr = (str) => str.length > 200 ? str.substr(0, 200)+`...` :str ; 
    const getGenres = (ids) => {
            const res = genres.filter(genre => ids.includes(genre.id));
            const name = res.map(val =>val.name);
            return name.toString();
          }
    const checkkFav = (id)=>favorites.includes(id); 
    const centerStyle = {textAlign:'center'};
    return (
        <div className="container">
          <div className="content">
          <Header title={'Favorites'} search={false} />
        <div className="row">
          {result.map((item, index) => {
            return  <Movie key={index}  movie={item} genres={getGenres(item.genre_ids)} desc={substr(item.overview)} onFavorite={this.handleFavorite} viewDetals={this.goToDetails} fav={checkkFav(item.id)}/>
             })}
          </div>
          { result.length < 1 ?
          <div className="col-md-12">
            <div className="category-list-card" style={{height:'auto'}}>
                <h3 style={centerStyle}>Favorite list is empty</h3>
            </div>
          </div>:
            <ReactPaginate initialPage={currentPage} activeClassName={'active'} breakLabel={''} onPageChange={this.onPageChange} containerClassName={'pagination'} pageCount={total_pages} pageRangeDisplayed={1} marginPagesDisplayed={1} />
          }
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  const res = {};
  if (state.action === 'GENRES') {
    res['genres'] = state.data;
  }
  return res;
}

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({ Genres: Genres }, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(Movies);
