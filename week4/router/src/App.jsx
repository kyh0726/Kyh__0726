import viteLogo from '/vite.svg'
import Header from './component/Header.jsx'
import DayList from './component/DayList.jsx'
import Day from './component/Day.jsx'
import EmptyPage from './component/EmptyPage.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App()
{ 
  return (
    <BrowserRouter>
      <div className = "App">
        <Header/>
        <Routes>
          <Route exact path ="/" element = {<DayList/>}>            
          </Route>
        
          <Route path ="/day/:id" element = {<Day/>}>
          </Route>
          
          <Route path ="*" element = {<EmptyPage/>}/>
        </Routes>                    

      </div>
    </BrowserRouter>
  );
}

export default App
