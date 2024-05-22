const inputBox = document.getElementById("input-box"),
    listContainer = document.getElementById("list-container"),
    deleteBtn = document.getElementsByClassName('deleteTask');
    savedTodoList = JSON.parse(localStorage.getItem('saved-items')); 


function saveItemsFn () { // 로컬에 데이터 저장하기
    const saveItems = [];
    for (let i = 0; i < listContainer.children.length; i++){
        const todoObj = {
            contents: listContainer.children[i].querySelector('span').textContent, 
        };
        saveItems.push(todoObj); // 배열 추가
    }
	localStorage.setItem('saved-items', JSON.stringify(saveItems)); // localStorage 추가
}


if (savedTodoList) { // savedTodoList(로컬 데이터)가 존재하면 실행
    for(let i = 0; i < savedTodoList.length; i++){
        loadTask(savedTodoList[i]) // 전달인자로 전달
    }
}

function loadTask(storageData)
{
    let li = document.createElement("li"); // list 자료형을 갖는 변수 li 선언
    listContainer.appendChild(li); // li를 리스트 값에 넣어준다.

    let todo = document.createElement("span");
    todo.innerText = storageData.contents;
    li.appendChild(todo);

    let bt1 = document.createElement("button");
    bt1.innerHTML = "수정";
    bt1.addEventListener("click", modifyTask); // 수정 버튼에 이벤트리스너 속성 부여
    li.appendChild(bt1);

    let bt2 = document.createElement("button");
    bt2.innerHTML = "삭제";
    bt2.addEventListener("click", deleteTask); // 삭제 버튼에 이벤트리스너 속성 부여
    li.appendChild(bt2);
    saveItemsFn();

}


function addTask()
{
    if (inputBox.value == '') // 만약 아무 입력도 하지 않았다면 경고문
    {
        alert("글자를 입력하세요");
    }
    else
    {
        let li = document.createElement("li"); // list 자료형을 갖는 변수 li 선언
        listContainer.appendChild(li); // li를 리스트 값에 넣어준다.

        let todo = document.createElement("span");
        todo.innerText = inputBox.value;
        li.appendChild(todo);

        let bt1 = document.createElement("button");
        bt1.innerHTML = "수정";
        bt1.addEventListener("click", modifyTask); // 수정 버튼에 이벤트리스너 속성 부여
        li.appendChild(bt1);

        let bt2 = document.createElement("button");
        bt2.innerHTML = "삭제";
        bt2.addEventListener("click", deleteTask); // 삭제 버튼에 이벤트리스너 속성 부여
        li.appendChild(bt2);
    }
    inputBox.value = ""; // 입력하는 곳에 값을 다시 비워준다. (똑같은 값 계속 추가되는거 막기 위함)
    saveItemsFn();
}

function deleteTask(e){ //삭제 버튼(x) 클릭시 
    let removeOne = e.target.parentElement;  //선택한 목록 한개만 지우기(부모 객체를 지운다)
    removeOne.remove();
    saveItemsFn();
}

function modifyTask(e)
{
    const btn = e.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    const text = span.innerText; // span의 내부 값 text에 넣어두기
  
    li.removeChild(span);   //span 내부 값 지우기
    const input = document.createElement("input"); // input 생성
    input.value = text; // input의 value 값에 span에 있었던 text 값 넣어두기
    li.prepend(input); // input을 li 배열의 앞쪽에 끼워넣기
    btn.innerText = "확인"; // (수정중인 상태) 수정 버튼을 확인으로 바꾸기
    btn.removeEventListener("click", modifyTask); // 수정중인 동안은 버튼의 기능을 제거하고,
    btn.addEventListener("click", (e) => {        // 버튼의 기능을 다음 동작으로 바꾼다.
      const newText = input.value; // 새로운텍스트 = 인풋의 value 값 (즉 새로 수정한 값)
      span.innerText = newText; // span의 내부 텍스트에 새로운 텍스트를 넣는다.
      li.prepend(span); // span을 앞으로 끼워넣고
      li.removeChild(input); // 수정을 마쳤으니 input은 지운다
      btn.innerText = "수정"; // (수정 마침) 수정 버튼의 텍스트를 다시 (확인 -> 수정으로) 바꾼다
      btn.addEventListener("click", modifyTask); // // 수정 버튼을 누를 경우 modifyTask가 동작하게 만든다.
    })
    saveItemsFn();
}






