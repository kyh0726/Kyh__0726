import { useNavigate, useParams } from "react-router-dom"
import useStore from "./Store.js";
import { useState } from "react";

export default function DetailPage(){

    const id = useParams().id;
    const [movie, setMovie] = useState(useStore.movies.filter((movie) => movie.id == id)); // 디테일 페이지에 나오는 영화는 지역 상태변수로 관리함 
    // 사실 이것도 전역 상태변수로 관리하고 싶은데 그 방법을 아직 잘 모르겠음
    
    console.log(`영화 정보 : ${movie}`);
    const navigate = useNavigate();
    const backButton = () => {
        navigate(-1);
    };

    const likeButton = () => {
        useStore.movies.forEach((globalMovie) => globalMovie.id == movie[0].id ? globalMovie.like *= -1 : null); 
        // 전역변수 movies와 해당 페이지의 movie를 비교하여 값이 같을 경우 movie의 like 키 값에 -1을 곱해준다. (-1이면 좋아요 아닌 상태, 1이면 좋아요)
        setMovie(useStore.movies.filter((movie) => movie.id == id));        
        // 지역 상태변수의 값을 전역 상태변수의 값과 맞춰준다.
    }

    return(

        <div>
            <h1>디테일 정보 페이지</h1>
            <button onClick = {backButton}>뒤로가기</button>
            {movie.map((movie) => 
            <div>
                
                <img src={`${movie.medium_cover_image}`}/>
                {movie.like == -1 ? <button onClick = {likeButton}> 좋아요누르기 </button>
                 : <button onClick = {likeButton}> 좋아요 취소 </button>}
                <div> 설명 : {movie.summary}</div>


            </div>
            )}
        </div>

    )

}