import { useParams, Link, NavLink } from "react-router-dom";
import "../App.css";
import useStore from "./Store.js";

export default function YearPage () 
{
    const year = useParams().year;
    const years = [];

    useStore.movies.forEach((movie) => years.includes(movie.year) ? null : years.push(movie.year)); // 현재 영화들의 연도 값들 넣기
    years.sort(function(a,b){
      if ( a < b ) return 1;
      else if ( a === b ) return 0;
      else if ( a > b ) return -1;
    }) // 연도 최신순으로 정리

    const moviesYear = useStore.movies.filter((movie) => movie.year == year); 
    

    return(
        <div>
            <h1>연도별 페이지 -{year} 년도</h1>
            <Link to = '../../'> 홈으로 돌아가기 </Link>
            <div className = "menuButtonBox">
              {years.map((year) =>(
                <div>
                  <Link to = {`../Year/${year}`}> {year}년도 </Link>
                </div>))}
            </div>
            <div className = "movieBox">
              {moviesYear.map((movie) => (
                <div className = "movie">
                  <NavLink to={"../movie_detail/"+movie.id}>
                              <img src={`${movie.medium_cover_image}`}/>
                  </NavLink>                
                  <div> {movie.title} : 🎖️{movie.rating}점 </div>
                </div>
              ))}
            </div>
        </div>
    )       

};
    