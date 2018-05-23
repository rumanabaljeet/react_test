import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import { Listing } from './../../Actions';
import Search from './Search';
import Movie from './Movie';


class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      errMsg:'',
      total_pages:0,
      currentPage:0,
      isRes : true
    }
  }

  componentDidMount() {
    this.props.Listing(1);
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();
    this.setState({
      errMsg:''
    })
    let { access_token } = this.state;
    if (access_token) {
      this.props.Login({ access_token: access_token });
    } else {
      alert('enter access token');
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
      search:search
    });
    this.props.Listing(this.state.page,search) 
  }

  componentWillReceiveProps(nextProps) {
    const {results,total_pages} = nextProps.listing;
    this.setState({
      movies:results,
      total_pages:total_pages>100?100:total_pages,
      isRes:results.length>0?true:false
    })
  }
  render() {
    const { movies,total_pages,currentPage,isRes } = this.state;
    const substr = (str) => str.length > 200 ? str.substr(0, 200)+`...` :str ; 
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
            return  <Movie key={index}  {...item} desc={substr(item.overview)}/>
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
  if (state.action === 'LISTING') {
    return {
      listing: state.data
    }
  } else {
    return {}
  }
  //console.log(state);
}

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({ Listing: Listing }, dispatch);
}

export default connect(MapStateToProps, MapDispatchToProps)(Movies);
