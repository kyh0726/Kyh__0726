import axios from "axios";
import { useEffect, useState, useNavigate } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom"
import MainPage from "./Component/MainPage"; 
import GenrePage from "./Component/GenrePage";
import RankPage from "./Component/RankPage";
import YearPage from "./Component/YearPage";
import create from "zustand"
import DetailPage from "./Component/DetailPage";

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

  return (
      <Routes>
        <Route path = "/" element = {<MainPage props = {movies} loading = {loading}/>}/>
        <Route path = "/Rank" element = {<RankPage props = {movies}/>}/>
        <Route path = "/Year/:year" element = {<YearPage props = {movies}/>}/>
        <Route path = "/Genre/:genre" element = {<GenrePage props = {movies}/>}/>
        <Route path = "/movie_detail/:id" element = {<DetailPage props = {movies}/>}/>
      </Routes>
  );
}

export default App;