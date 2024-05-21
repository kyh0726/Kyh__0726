import axios from "axios";
import { useEffect, useState, useNavigate } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom"
import MainPage from "./Component/MainPage"; 
import GenrePage from "./Component/GenrePage";
import RankPage from "./Component/RankPage";
import YearPage from "./Component/YearPage";
import create from "zustand"
import DetailPage from "./Component/DetailPage";
import useStore from "./Component/Store.js";
import LikePage from "./Component/LikePage.jsx";


// 과제 : 영화 api 사용해서 메인페이지 / 랭킹페이지(인기순위) / 연도별 페이지 / 장르별 페이지

function App() {

  
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      );
      setMovies(res.data.data.movies);
    };

    fetchData().then(() => {
      setLoading(false);
      
    });
    
  }, []);

  useStore.movies = movies.map((movie) => movie);
  useStore.movies = useStore.movies.map((data) => ({
    ...data, like : -1
  }));

      return (
        <Routes>
        <Route path = "/" element = {<MainPage loading = {loading}/>}/>
        <Route path = "/Rank" element = {<RankPage/>}/>
        <Route path = "/Year/:year" element = {<YearPage/>}/>
        <Route path = "/Genre/:genre" element = {<GenrePage/>}/>
        <Route path = "/movie_detail/:id" element = {<DetailPage/>}/>
        <Route path = "/Like" element = {<LikePage/>}/>
      </Routes>
      )
}

export default App;