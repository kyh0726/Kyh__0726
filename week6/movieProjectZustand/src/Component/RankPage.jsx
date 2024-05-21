import { Link, NavLink } from "react-router-dom";
import useStore from "./Store.js";

export default function RankPage () 
{

    useStore.movies.sort(function(a, b) {
        if ( a.rating < b.rating ) return 1;
        else if ( a.rating === b.rating ) return 0;
        else if ( a.rating > b.rating ) return -1;
    }); // 영화 인기순 정렬


    return(
        <div>
            <h1>인기별 순위</h1>
            <Link to = '../'> 홈으로 돌아가기 </Link>
            <div className = "movieBox">
              {useStore.movies.map((movie) => (
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
    