import { useParams, Link, NavLink } from "react-router-dom";
import "../App.css";

export default function YearPage ({props}) 
{
    const year = useParams().year;
    const years = [2023, 2022, 2021, 2020, 2019, 2018];
    const moviesYear = props.filter((movie) => movie.year == year);
    

    return(
        <div>
            <h1>연도별 페이지 -{year} 년도</h1>
            <Link to = '../../'> 홈으로 돌아가기 </Link>
            {years.map((year) =>(
              <div>
                 <Link to = {`../Year/${year}`}> {year}년도 </Link>
              </div>))}
            {moviesYear.map((movie) => (
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
    