const inputBox = document.getElementById("input-box") as HTMLElement,
    listContainer = document.getElementById("list-container") as HTMLElement,
    deleteBtn = document.getElementsByClassName('deleteTask'),
    savedTodoList = JSON.parse(localStorage.getItem('saved-items') || '""'); 


function saveItemsFn (): void { // 로컬에 데이터 저장하기
    const saveItems = [];
    for (let i = 0; i < listContainer.children.length; i++){
        const todoObj = {
            contents: (listContainer.children[i].querySelector('span') as HTMLSpanElement).textContent, 
        };
        saveItems.push(todoObj); // 배열 추가
    }
	localStorage.setItem('saved-items', JSON.stringify(saveItems)); // localStorage 추가
}


function loadTask(storageData : any)
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


function addTask(): void{
    let inputBoxValue = <HTMLInputElement>document.getElementById("input-box");
    let value = inputBoxValue.value;
    if (value == '')
    {
        alert('글자를 입력하세요');
    }
    else
    {
        let li = document.createElement("li"); // list 자료형을 갖는 변수 li 선언
        listContainer.appendChild(li); // li를 리스트 값에 넣어준다.

        let todo = document.createElement("span");
        todo.innerText = value;
        li.appendChild(todo);

        let bt1 = document.createElement("button");
        bt1.innerHTML = "수정";
        bt1.addEventListener("click", modifyTask); // 수정 버튼에 이벤트리스너 속성 부여
        li.appendChild(bt1);

        let bt2 = document.createElement("button");
        bt2.innerHTML = "삭제";
        bt2.addEventListener("click", deleteTask); // 삭제 버튼에 이벤트리스너 속성 부여
        li.appendChild(bt2);

        inputBoxValue.value = '';
        saveItemsFn();
    }
};

const deleteTask = (event: MouseEvent) => { //삭제 버튼(x) 클릭시 
    const removeButton = event.target as HTMLButtonElement;
    const removed = removeButton.closest('li');
    if (removed)
    {
        removed.remove();
    }
    saveItemsFn();
}

const modifyTask = (event : MouseEvent) => {

    const btn = event.target as HTMLButtonElement;
    const li = btn.closest('li');
    const span = li?.querySelector("span");
    const text = span?.innerText; // span의 내부 값 text에 넣어두기
  
    if (span)
    {
        span.remove();    //span 내부 값 지우기
    }

    let inputBoxValue = <HTMLInputElement>document.getElementById("input-box");
    let value = inputBoxValue.value;

    const input = document.createElement('input') as HTMLInputElement; // input 생성
    input.type = 'text'; // input의 value 값에 span에 있었던 text 값 넣어두기
    if (text)
    {
        input.value = text;
    }
    

    li?.prepend(input); // input을 li 배열의 앞쪽에 끼워넣기
    btn.innerText = "확인"; // (수정중인 상태) 수정 버튼을 확인으로 바꾸기
    btn.removeEventListener("click", modifyTask); // 수정중인 동안은 버튼의 기능을 제거하고,
    btn.addEventListener("click", (e) => {        // 버튼의 기능을 다음 동작으로 바꾼다.
    const newText = input.value; // 새로운텍스트 = 인풋의 value 값 (즉 새로 수정한 값)
    if (span)
    {  
        span.innerText = newText; // span의 내부 텍스트에 새로운 텍스트를 넣는다.
        li?.prepend(span); // span을 앞으로 끼워넣고
    }
      li?.removeChild(input); // 수정을 마쳤으니 input은 지운다
      btn.innerText = "수정"; // (수정 마침) 수정 버튼의 텍스트를 다시 (확인 -> 수정으로) 바꾼다
      btn.addEventListener("click", modifyTask); // // 수정 버튼을 누를 경우 modifyTask가 동작하게 만든다. 
      saveItemsFn();
    })
};



if (savedTodoList) { // savedTodoList(로컬 데이터)가 존재하면 실행
    for(let i = 0; i < savedTodoList.length; i++){
        loadTask(savedTodoList[i]) // 전달인자로 전달
    }
}


function setClock(){ // 시계 구현
    let dateInfo = new Date(); 
    let hour = modifyNumber(dateInfo.getHours());
    let min = modifyNumber(dateInfo.getMinutes());
    let sec = modifyNumber(dateInfo.getSeconds());
    let year = dateInfo.getFullYear();
    let month = dateInfo.getMonth()+1; //monthIndex를 반환해주기 때문에 1을 더해준다.
    let date = dateInfo.getDate();

    let t = document.getElementById("time") as HTMLElement;
    let d = document.getElementById("date") as HTMLElement;
    t.innerHTML = hour + ":" + min  + ":" + sec;
    d.innerHTML = year + "년 " + month + "월 " + date + "일";
}
function modifyNumber(time : any){
    if(parseInt(time)<10){
        return "0"+ time;
    }
    else
        return time;
}
window.onload = function(){
    setClock();
    setInterval(setClock,1000); //1초마다 setClock 함수 실행
}