import { useParams, Link, NavLink } from "react-router-dom";

export default function GenrePage ({props}) 
{
    const genre = useParams().genre;


    const moviesGenres = props.filter((movie) => movie.genres.includes(genre));
    const selectedGenres = [];
    props.forEach((movie) => movie.genres.forEach((genre) => selectedGenres.includes(genre) ? null : selectedGenres.push(genre))); // 영화 장르 종류 분류
    
    return(
      <div>
      <h1>장르별 페이지 - {genre}</h1>
            <Link to = '../../'> 홈으로 돌아가기 </Link>
      {selectedGenres.map((genre) =>(
        <div>
           <Link to = {`../Genre/${genre}`}> {genre} </Link>
        </div>))}

      {moviesGenres.map((movie) => (
        <div>
          <NavLink to={"/movie_detail/"+movie.id}>
            <img src={`${movie.medium_cover_image}`}/>
          </NavLink>
          <div> {movie.title} : 🎖️{movie.rating}점 </div>
        </div>
      ))}
  </div>
    )       

}
    