import { useState } from "react";
import useStore from "./Store.js";
import { NavLink, Link } from "react-router-dom";


export default function LikePage(){

    const [likeMovies, setMovies] = useState(useStore.movies.filter((movie) => movie.like === 1));
    likeMovies.forEach((movie) => console.log(movie));
    console.log(likeMovies.length == 0);
    return (
        likeMovies.length === 0 
    
            ? <div>
                <Link to = '../../'> 홈으로 돌아가기 </Link>

                좋아하는 영화가 없습니다! 
            </div>
            
            :<div>
                <h1>보관된 영화</h1>
                <Link to = '../../'> 홈으로 돌아가기 </Link>
                <div className = "movieBox">{likeMovies.map((movie) => (
                    <div className = "movie">
                        <NavLink to={"/movie_detail/"+movie.id}>
                            <img src={`${movie.medium_cover_image}`}/>
                        </NavLink>
                    <div> {movie.title} : 🎖️{movie.rating}점 </div>
                </div>
            ))}</div> 
            </div>
    )

}