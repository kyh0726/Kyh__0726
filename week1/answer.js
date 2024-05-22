const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  resetBtn = document.querySelector(".js-reset"),
  addBtn = document.querySelector(".js-add");

const TODOS_LS = "toDos";
let toDos = [];

const handleReset = (event) => {
  toDoList.replaceWith("");
  toDos = [];
  saveToDos();
  window.location.reload();
};

const deleteToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
};

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

const editToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const text = span.innerText; // span의 내부 값 text에 넣어두기

  li.removeChild(span);   //span 내부 값 지우기
  const input = document.createElement("input"); // input 생성
  input.value = text; // input의 value 값에 span에 있었던 text 값 넣어두기
  li.prepend(input); // input을 li 배열의 앞쪽에 끼워넣기
  btn.innerText = "확인"; // (수정중인 경우) 수정 버튼을 확인으로 바꾸기
  btn.removeEventListener("click", editToDo); // 버튼을 누를 경우 editToDo가 동작하게 하기
  btn.addEventListener("click", (event) => { // addEventListener를 누를 경우 다음 동작 수행
    const newText = input.value; // 새로운텍스트 = 인풋의 value 값 (즉 새로 수정한 값)
    span.innerText = newText; // span의 내부 텍스트에 새로운 텍스트를 넣는다.
    li.prepend(span); // span을 앞으로 끼워넣고
    li.removeChild(input); // 수정을 마쳤으니 input은 지운다
    btn.innerText = "수정"; // 수정을 마쳤으니 수정 버튼의 텍스트를 다시 (확인 -> 수정으로) 바꾼다
    btn.addEventListener("click", editToDo); // // 수정 버튼을 누를 경우 editToDo가 동작하게 만든다.
    const toDoObj = { // toDoObj 라는 객체 생성 
      text: newText,  // 객체의 text 값에 newText값 넣기
      id: parseInt(li.id), //객체의 id값에 li.id의 정수 값 추출해서 넣기
    };
    toDos = toDos.map((toDo) => { 
      if (toDo.id === parseInt(li.id)) {
        return toDoObj;
      } else {
        return toDo;
      }
    });
    saveToDos();
  });
};

const paintToDo = (text) => {
  if (text !== "") {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; // newId의 값을 index처럼 사용

    editBtn.innerText = "수정";
    editBtn.addEventListener("click", editToDo);
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", deleteToDo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    li.id = newId;
    toDoList.prepend(li);

    const toDoObj = {
      text: text,
      id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
  }
};

const handleSubmit = (event) => {
      event.preventDefault();
      const currentValue = toDoInput.value;
      toDoInput.value = "";
      paintToDo(currentValue);
    };

const init = () => {
  loadToDos();
  addBtn.addEventListener("click", handleSubmit);
  toDoForm.addEventListener("submit", handleSubmit);
  resetBtn.addEventListener("click", handleReset);
};

init();