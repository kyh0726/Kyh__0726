import {useNavigate, NavLink } from "react-router-dom"
import useStore from "./Store.js";

function MainPage({loading}) {


    const navigate = useNavigate();

    const navigateToRank = () =>
        {
            navigate("/Rank/");
        }
        
    const navigateToYear = () =>
        {
            navigate("/Year/2023");
        }
  
    const navigateToGenre = () =>
        {
            navigate("/Genre/Action");
        }
        
    const navigateToLike = () =>
        {
            navigate("/Like");
        }

    return (
        <div>
          
          {loading ? <strong>Loading....</strong> : 
          <div>
            <h1>Main Page ({useStore.movies.length})</h1>
            <h2>
              <button onClick = {navigateToRank}>인기 영화</button>
              <button onClick = {navigateToYear}>연도별</button>
              <button onClick= {navigateToGenre}>장르별</button>
              <button onClick= {navigateToLike}>좋아하는 영화</button>
            </h2>
          </div>
          }

  
          <div className = "movieBox">
            {useStore.movies.map((movie) => (
              <div className = "movie">
                <NavLink to={"/movie_detail/"+movie.id}>
                            <img src={`${movie.medium_cover_image}`}/>
                </NavLink>
                <div> {movie.title} : 🎖️{movie.rating}점 </div>
              </div>
            ))}
          </div>
        </div>
    );
  }

  export default MainPage;