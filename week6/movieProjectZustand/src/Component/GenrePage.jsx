import { useParams, Link, NavLink } from "react-router-dom";
import useStore from "./Store.js";

export default function GenrePage () 
{
    const genre = useParams().genre;


    const moviesGenres = useStore.movies.filter((movie) => movie.genres.includes(genre));
    const selectedGenres = [];
    useStore.movies.forEach((movie) => movie.genres.forEach((genre) => selectedGenres.includes(genre) ? null : selectedGenres.push(genre))); // 영화 장르 종류 분류
    
    return(
      <div>
      <h1>장르별 페이지 - {genre}</h1>
      <Link to = '../../'> 홈으로 돌아가기 </Link>
      <div className = "menuButtonBox">
        {selectedGenres.map((genre) =>(
          <div>
            <Link to = {`../Genre/${genre}`}> {genre} </Link>
          </div>))}
      </div>
      <div className = "movieBox">
        {moviesGenres.map((movie) => (
        <div className = "movie">
          <NavLink to={"/movie_detail/"+movie.id}>
            <img src={`${movie.medium_cover_image}`}/>
          </NavLink>
          <div> {movie.title} : 🎖️{movie.rating}점 </div>
        </div>
      ))}
      </div>
      
  </div>
    )       

}
    