import dummy from "../db/data.json";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavigationButton from "./NavigationButton";

export default function Day()
{

    const day = useParams().id;
    const wordList = dummy.words.filter(word => word.day === Number(day));
    const dayList = dummy.days.filter(word => word.day !== Number(day));

    const navigate = useNavigate();
    


    console.log(wordList);
    return (<>
    <h2>Day {day}</h2>
    <table>
        <tbody>
            <Link to = '/'>처음 화면으로 돌아가기</Link>
            {dayList.map(day => (
            <tr>
                <td>
                    <NavigationButton num = {`${day.day}`}/> 
                </td>
            </tr>))} 

            {wordList.map(word => (
            <tr>
                <td>
                    {word.eng}
                </td>
                <td>
                    {word.kor}
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</>
    );
}