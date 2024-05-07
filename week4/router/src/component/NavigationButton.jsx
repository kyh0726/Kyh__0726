import { useNavigate } from 'react-router-dom';

export default function NavigationButton(props) {
  const navigate = useNavigate();

  function handleClick() {
    // 클릭 이벤트 처리 후, 다른 경로로 이동
    navigate(`/day/${props.num}`);
  }

  return (
    <button onClick={handleClick}>Go to Day{props.num}</button>
  );
}