import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'is-empty';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Genres, GetMovie, SimilarMovies } from './../../Actions';
import Movie from './../Common/Movie';
import Header from './../Common/Header';


class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      errMsg: '',
      total_pages: 0,
      currentPage: 0,
      isRes: true,
      movie: {},
    }
  }

  componentDidMount() {
    this.props.Genres();
    if (this.props.match.params.id) {
      this.props.GetMovie(this.props.match.params.id);
      this.props.SimilarMovies(this.props.match.params.id);
    }
  }




  componentWillReceiveProps(nextProps) {
    if (nextProps.genres) {
      const { genres } = nextProps.genres;
      this.setState({
        genres: genres
      })
    }
    const {movie} = nextProps;
    if(movie){
      this.setState({
        movie:movie
      })
    }
  }
  render() {
    const { result, total_pages, currentPage, genres ,movie } = this.state;
    const substr = (str) => str.length > 200 ? str.substr(0, 200) + `...` : str;
    const getGenres = (ids) => {
      const res = genres.filter(genre => ids.includes(genre.id));
      const name = res.map(val => val.name);
      return name.toString();
    }
    const centerStyle = { textAlign: 'center' };
    return (
      <div className="container">
        <div className="content">
          <Header title={movie.title} search={false} />
          <div className="row">
           {/*  {result.map((item, index) => {
              return <Movie key={index} movie={item} genres={getGenres(item.genre_ids)} desc={substr(item.overview)} onFavorite={this.handleFavorite} viewDetals={this.goToDetails} fav={checkkFav(item.id)} />
            })} */}
          </div>
         {/*  {result.length < 1 ?
            <div className="col-md-12">
              <div className="category-list-card" style={{ height: 'auto' }}>
                <h3 style={centerStyle}>Favorite list is empty</h3>
              </div>
            </div> :
            <ReactPaginate initialPage={currentPage} activeClassName={'active'} breakLabel={''} onPageChange={this.onPageChange} containerClassName={'pagination'} pageCount={total_pages} pageRangeDisplayed={1} marginPagesDisplayed={1} />
          } */}
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
  if (state.action === 'MOVIE') {
    res['movie'] = state.data;
  }

  return res;
}

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({ Genres: Genres, GetMovie:GetMovie, SimilarMovies:SimilarMovies}, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(Movies);
