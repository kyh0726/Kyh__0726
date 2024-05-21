import { useState } from "react";
import useStore from "./Store.js";
import { NavLink, Link, useNavigate } from "react-router-dom";


export default function LikePage(){

    const [likeMovies, setMovies] = useState(useStore.movies.filter((movie) => movie.like === 1));

    const navigate = useNavigate();
    const navigateToHome = () =>{
      navigate('/');
    }

    return (
        likeMovies.length === 0 
    
            ? <div>
            <h2><button onClick = {navigateToHome}>홈으로 돌아가기</button></h2>

                좋아하는 영화가 없습니다! 
            </div>
            
            :<div>
                <h1>보관된 영화</h1>
                <h2><button onClick = {navigateToHome}>홈으로 돌아가기</button></h2>
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