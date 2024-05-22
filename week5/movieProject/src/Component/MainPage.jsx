import {useNavigate, NavLink } from "react-router-dom"

function MainPage({props, loading}) {


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

    return (
        <div>
          
          {loading ? <strong>Loading....</strong> : 
          <div>
            <h1>Main Page ({props.length})</h1>
            <h2>
              <button onClick = {navigateToRank}>인기 영화</button>
              <button onClick = {navigateToYear}>연도별</button>
              <button onClick= {navigateToGenre}>장르별</button>
            </h2>
          </div>
          }

  
          <div>
            {props.map((movie) => (
              <div>
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