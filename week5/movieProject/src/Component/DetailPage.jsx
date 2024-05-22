import { useNavigate, useParams } from "react-router-dom"


export default function DetailPage({props}){

    const id = useParams().id;
    const movie = props.filter((movie) => movie.id == id)

    const navigate = useNavigate();
    const backButton = () => {
        navigate(-1);
    };

    return(

        <div>
            <h1>디테일 정보 페이지</h1>
            <button onClick = {backButton}>뒤로가기</button>
            {movie.map((movie) => 
            <div>
                <img src={`${movie.medium_cover_image}`}/>
                <div> 설명 : {movie.summary}</div>
            </div>
            )}
        </div>

    )

}