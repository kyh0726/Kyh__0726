import { Link, NavLink } from "react-router-dom";

export default function RankPage ({props}) 
{


    const moviesRank = props.sort(function(a, b) {
        if ( a.rating < b.rating ) return 1;
        else if ( a.rating === b.rating ) return 0;
        else if ( a.rating > b.rating ) return -1;
    });


    return(
        <div>
            <h1>인기별 순위</h1>
            <Link to = '../'> 홈으로 돌아가기 </Link>
            {moviesRank.map((movie) => (
              <div>
                <NavLink to={"../movie_detail/"+movie.id}>
                            <img src={`${movie.medium_cover_image}`}/>
                </NavLink>  
                <div> {movie.title} : 🎖️{movie.rating}점 </div>
              </div>
            ))}
        </div>
    )
};
    