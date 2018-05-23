import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'is-empty';
import ReactPaginate from 'react-paginate';
import { Listing, Genres } from './../../Actions';
import Search from './Search';
import Movie from './Movie';


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
      favorites:[]
    }
  }

  componentDidMount() {
    this.props.Listing(1);
    this.props.Genres();
    if(!isEmpty(localStorage.getItem('FAV_MOV'))){
      this.setState({
        favorites: JSON.parse(localStorage.getItem('FAV_MOV'))
      })
    }
  }

  onPageChange = (page)=>{
    let currentPage = page.selected+1
    this.setState({
      currentPage:currentPage
    })
    this.props.Listing(currentPage,this.state.search) 
  }

  hanldeSearch = (event) =>{
    let search = event.target.value;
    this.setState({
      search:search,
      currentPage:1
    });
    this.props.Listing(1,search) 
  }

  handleFavorite = (id) =>{
    let fav_mov = [];
    if(!isEmpty(localStorage.getItem('FAV_MOV'))){
      fav_mov = JSON.parse(localStorage.getItem('FAV_MOV'));
      if(fav_mov.includes(id)){
        fav_mov.splice(fav_mov.indexOf(id,1));
      }else{
        fav_mov.push(id)
      }
    }else{
      fav_mov.push(id);
    }
    localStorage.setItem('FAV_MOV', JSON.stringify(fav_mov));
    this.setState({
      favorites:fav_mov
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.listing){
      const {results,total_pages} = nextProps.listing;
      this.setState({
        movies:results,
        total_pages:total_pages>100?100:total_pages,
        isRes:results.length>0?true:false,
        //genres: genres
      })
    }
    if(nextProps.genres){
      const { genres } = nextProps.genres;
      this.setState({
        genres:genres
      })
    }
    
  }
  render() {
    const { movies,total_pages,currentPage,isRes,genres, favorites } = this.state;
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
        <div className="row">
          <div className="col-md-12">
          <h1 style={centerStyle}>Movies</h1>
          </div>
          <Search onSearch={this.hanldeSearch} />
        </div>
        <div className="row">
          {movies.map((item, index) => {
            return  <Movie key={index}  {...item} genres={getGenres(item.genre_ids)} desc={substr(item.overview)} onFavorite={this.handleFavorite} fav={checkkFav(item.id)}/>
             })}
          </div>
          { !isRes ?
          <div className="col-md-12">
            <div className="category-list-card" style={{height:'auto'}}>
                <h3 style={centerStyle}>No Content Found</h3>
            </div>
          </div>:
            <ReactPaginate initialPage={currentPage} activeClassName={'active'} breakLabel={''} onPageChange={this.onPageChange} containerClassName={'pagination'} pageCount={total_pages} pageRangeDisplayed={1} marginPagesDisplayed={1} />
          }
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  const res = {};
  if (state.action === 'LISTING') {
    res['listing'] = state.data;
  } 
  if (state.action === 'GENRES') {
    res['genres'] = state.data;
  }
  return res;
}

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({ Listing: Listing, Genres: Genres }, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(Movies);
