import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie'
import './Home.css'

class Home extends React.Component{

  state ={
    // 페이지 로딩 상태
    isLoading: true,
    movies:[],
  };
  
  // 영화 정보 불러오기
  getMovies = async () =>{
    const {
      data:{
        data:{ movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading : false});
    console.log(movies);
  }

  componentDidMount(){
    this.getMovies();
  }


  render(){

    const { isLoading, movies } = this.state;

    return <selection className="container">
              {isLoading 
                ? (
                  <div className="loader">
                    <span className="loader_text">Loading....</span>
                  </div>
                ) : (
                  <div className="movies">
                    {movies.map((movie) => {
                      return (
                        <Movie
                          key ={movie.id}
                          id ={movie.id}
                          year = {movie.year}
                          title = {movie.title}
                          summary ={movie.summary}
                          poster = {movie.medium_cover_image}
                          genres = {movie.genres}
                        />
                      );
                    })}
                  </div> 
                )} 
            </selection>;
  }
}

export default Home;
