const container01 = document.querySelector('.container01');
const calendar = document.querySelector(".calendar");
const cardHeader = document.querySelector('.card-header');
const cardTitle = document.querySelector(".card-title");
const nav01 = document.querySelector(".nav01");
let tbody = document.getElementById("calendar-body");
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const cardFooter = document.querySelector('.card-footer');
const jumpto = document.querySelector("form.jumpto");
const selectMonth = document.getElementById("month");
const selectYear = document.getElementById("year");
const modalEvent = document.querySelector(".modal-event");
const modalHeader = document.querySelector(".modal-header");
const modalTitle = document.querySelector(".modal-title");
let modalInput = document.querySelector("input.modal-input");
const btnSubmit = document.querySelector(".btnSubmit");
const btnUpdateModal = document.querySelector(".btnUpdateModal");
const btnRemove = document.querySelector(".btnRemove");
const btnList = document.querySelector(".btnList");
const backdrop = document.querySelector(".backdrop");
const modalList = document.querySelector(".modal-list");
const titleList = document.querySelector('.title-list');
const labelList = document.querySelector(".label-list");
const listInput = document.querySelector("input.input-list");
const modalFooter = document.querySelector(".list-footer");
const ul = document.createElement('ul');
const alertDanger = document.querySelector(".alert-danger");
const alertSuccess = document.querySelector(".alert-success");

const square01 = document.createElement('div');
square01.classList.add('square','animation02');
const square02 = document.createElement('div');
square02.classList.add('square02');
const square03 = document.createElement('div');
square03.classList.add('square03');
const circle01 = document.createElement("div");
circle01.classList.add('circle','animation03');
const circle02 = document.createElement("div");
circle02.classList.add('circle','animation04');
const circle03 = document.createElement("div");
circle03.classList.add('circle02');
const circle04 = document.createElement("div");
circle04.classList.add('circle03');
const shape = document.createElement('div');
shape.setAttribute('class',"shape");
shape.append(square01,circle01,circle02);
const shape02 = document.createElement('div');
shape02.setAttribute('class',"shape02");

const textHeader = document.createElement("div");
textHeader.setAttribute("class",'textHeader');

const divClock = document.createElement('div');
divClock.setAttribute("class",'divClock');
const clock = new Date().toLocaleTimeString();

const ref = localStorage.getItem("events");
const events = ref ? JSON.parse(ref) : [];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

selectYear.onchange = jump;
selectMonth.onchange = jump;
container01.onclick = toggle;

function toggle(e) {
  const t = e.target;
  const date = t.dataset.date;
  const id = t.dataset.id;
  if(t.closest(".btnPrevious")) {
    previous();
  } else if(t.closest(".btnNext")) {
    next();
  } else if(t.closest("td")) {
    if(t.closest(".btnEvent")) {
      openModalById(id);
    } else {
      openModalByDate(date);
    }
  } else if(t.closest(".btnClose")) {
    closeModal();
  } else if(t.closest(".btnList")) {
    openModalList();
  } else if(t.closest(".btnSubmit")) {
    validationForm(date);
  } else if(t.closest(".btnRead")) {
    readEvent(id);
  } else if(t.closest(".btnUpdateList")) {
    updateList(id);
  } else if(t.closest('.btnUpdateModal')) {
    updateModal(id);
  } else if(t.closest(".btnRemove")) {
    removeEvent(id);
  } else if(t.closest(".btnReset")) {
    resetFormList();
  } else if(t.closest("#checkInput")) {
    checkEvent(t);
  }
}

function openModalById(id) {
  modalEvent.hidden = false;
  backdrop.hidden = false;
  btnSubmit.hidden = true;
  btnUpdateModal.hidden = false;
  btnUpdateModal.dataset.id = id;
  // btnRemove.hidden = false;
  btnRemove.dataset.id = id;
  // btnList.hidden = false;
  for(let i=0;i<events.length;i++) {
    if(events[i].id == id) {
      modalTitle.textContent = "Id : "+events[i].id+" - Date : "+events[i].date;
      modalInput.value = events[i].event;
      if(events[i].completed) {
        modalInput.classList.add('completed');
      } else {
        modalInput.classList.remove('completed');
      }
    }
  }
}

function openModalByDate(date) {
  modalEvent.hidden = false;
  backdrop.hidden = false;
  btnSubmit.hidden = false;
  btnSubmit.dataset.date = date;
  btnUpdateModal.hidden = true;
  btnRemove.hidden = true;
  btnList.hidden = false;
  modalTitle.textContent = "Date : "+date;
  modalInput.value = "";
}

function closeModal() {
  modalEvent.hidden = true;
  modalList.hidden = true;
  backdrop.hidden = true;
  alertDanger.hidden = true;
  showCalendar(currentMonth,currentYear);
}

function validationForm(date) {
  if(modalInput.value.length < 5 || modalInput.value.length > 15) {
    alertDanger.hidden = false;
    setTimeout(() => {
      alertDanger.hidden = true;},"3000");
    modalInput.value = "";
    modalInput.focus();
  } else {
    createEvent(date);
    alertDanger.hidden = true;
  }
}

function createEvent(date) {
  date = btnSubmit.dataset.date;
  console.log('dataset.date : '+date);
  const event = {
    id:Date.now().toString().slice(10),
    date: date,
    event:modalInput.value.trim(),
    completed:false
  }
  events.push(event);
  modalInput.value = "";
  alertSuccess.hidden = false;
  modalList.hidden = true;
  setTimeout(() => {
    alertSuccess.hidden = true;},"3000");
  setStorage();
}

function setStorage() {
  localStorage.setItem("events",JSON.stringify(events));
  openModalList();
  showCalendar(currentMonth,currentYear);
}

function checkEvent(t) {
  const id =  t.dataset.id;
  if(t.checked = true) {
    for(let i=0;i<events.length;i++) {
      if(events[i].id == id) {
        events[i].completed = !events[i].completed;
        const event = events[i];
        events.splice(i,1,event);
        setStorage();
      }
    }
  }
}

function resetFormList() {
  labelList.textContent = "";
  listInput.value = "";
}

function readEvent(id) {
  for(let i=0;i<events.length;i++) {
    if(events[i].id == id) {
      labelList.textContent = `id : ${events[i].id} - date : ${events[i].date}`;
      listInput.value = events[i].event;
      if(events[i].completed) {
        listInput.classList.add("completed");
        labelList.classList.add("completed");
      } else {
        listInput.classList.remove('completed');
        labelList.classList.remove("completed");
      }
    }
  }
}

function updateList(id) {
  if(listInput.value.length < 5 || listInput.value.length > 15 ) {
    alertDanger.hidden = false;
    listInput.classList.add('red');
    listInput.value = "";
    listInput.focus();
    setTimeout(() => {
      alertDanger.hidden = true;},"3000");
  } else {
    for(let i=0;i<events.length;i++) {
      if(events[i].id == id){
        events[i].event = listInput.value.trim();
        const event = events[i];
        events.splice(i,1,event);
        listInput.value = "";
        listInput.focus();
        setStorage();
      }
    }
  }
}

function updateModal(id) {
  if(modalInput.value.length < 5 || modalInput.value.length > 15 ) {
    alertDanger.hidden = false;
    modalInput.classList.add('red');
    modalInput.value = "";
    modalInput.focus();
    setTimeout(() => {
      alertDanger.hidden = true;},"3000");
  } else {
    for(let i=0;i<events.length;i++) {
      if(events[i].id == id){
        events[i].event = modalInput.value.trim();
        const event = events[i];
        events.splice(i,1,event);
        modalInput.value = events[i].event;
        setStorage();
      }
    }
  }
}

function removeEvent(id) {
  for(let i=0;i<events.length;i++) {
    if(events[i].id == id){
      events.splice(i,1);
      resetFormList();
      setStorage();
      modalTitle.textContent = "";
      modalInput.value = "";
    }
  }
}

function openModalList() {
  ul.textContent = "";
  ul.setAttribute('class','fa-ul');
  backdrop.hidden = false;
  modalList.hidden = false;
  for(let i=0;i<events.length;i++) {
    const date = events[i].date;
    const id = events[i].id;
    const event = events[i].event;
    const li = document.createElement("li");
    li.setAttribute('class',"fa-li");
    const spanDiv = document.createElement('span');
    spanDiv.setAttribute("class","form-check");
    const checkBox = document.createElement("input");
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('id',"checkInput");
    checkBox.setAttribute('data-id',id);
    const checkLabel = document.createElement('label');
    checkLabel.setAttribute('class',"form-check-label");
    checkLabel.setAttribute('for','checkInput');
    checkLabel.textContent = date+" : "+event;

    if(events[i].completed) {
      checkBox.checked = true;
      checkLabel.classList.add("completed");
    } else {
      checkBox.checked = false;
      checkLabel.classList.remove('completed');
    }

    spanDiv.append(checkBox,checkLabel);
    const btnGrp = document.createElement("div");
    btnGrp.setAttribute("class","btn-group");
    btnGrp.setAttribute("role","group");
    const btnRead = document.createElement('button');
    btnRead.setAttribute("type","button");
    btnRead.setAttribute('class',"btn btn-primary btn-sm btnRead");
    btnRead.setAttribute("data-id",id);
    btnRead.innerHTML = '<i class="fa fa-search fa-1x" aria-hidden="true"></i>';
    const btnUpdateList = document.createElement('button');
    btnUpdateList.setAttribute("type","button");
    btnUpdateList.setAttribute('class',"btn btn-success btn-sm btnUpdateList");
    btnUpdateList.setAttribute("data-id",id);
    btnUpdateList.innerHTML = '<i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i>';
    const btnRemove = document.createElement('button');
    btnRemove.setAttribute("type","button");
    btnRemove.setAttribute('class',"btn btn-danger btn-sm btnRemove");
    btnRemove.setAttribute("data-id",id);
    btnRemove.innerHTML = '<i class="fa fa-trash-o fa-1x" aria-hidden="true"></i>';
    btnGrp.append(btnRead,btnUpdateList,btnRemove);
    li.append(spanDiv,btnGrp);
    ul.appendChild(li);
  }
  modalFooter.append(ul);
}

function set_years(start,end) {
  for(let i=start;i<=end;i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectYear.append(option);
  }
}

function set_months() {
  for(i=0;i<months.length;i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = months[i];
    selectMonth.append(option);
  }
}

function generate_thead() {
  for(let i=0;i<weekdays.length;i++) {
    const th = document.createElement('th');
    th.setAttribute('scope','col');
    th.textContent = weekdays[i].substring(0,3);
    thead.append(th);
  }
}

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth,currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth,currentYear);
}

function jump() {
  currentYear = selectYear.value;
  currentMonth = selectMonth.value;
  showCalendar(currentMonth,currentYear);
}

function showCalendar(month,year) {
  tbody.innerHTML = "";
  cardTitle.textContent = months[month].slice(0,3)+" "+year;
  selectYear.value = year;
  selectMonth.value = month;

  const day = today.getDate();
  const firstDay_new_Date = new Date(year,month,1);
  const firstDay = new Date(year,month).getDay();
  const daysInMonth = new Date(year,month+1,0).getDate();
  let currentDay = today.getDate();

  console.log("- currentYear : "+year);
  console.log('- month : '+month);
  console.log("- firstDay : "+firstDay);
  console.log("- daysInMonth : "+daysInMonth);
  console.log("currentDay : "+currentDay);

  let date = 1;
  for(let i=0;i<6;i++) {
    const tr = document.createElement('tr');
    tr.setAttribute("scope","row");
    for(let j=0;j<7;j++) {
      let td = document.createElement('td');
      if(i == 0 && j < firstDay || date > daysInMonth) {
        td.textContent = "";
      } else {
        td.textContent = date;
        let dateString = "";
        td.dataset.date = month+"/"+date+"/"+year;
        if(date === currentDay && year === today.getFullYear() && month === today.getMonth()) {
          td.style.backgroundColor = 'rgb(253 238 3 / 50%)';
        } else if(events) {
          for(let i=0;i<events.length;i++) {
            if(events[i].date == td.dataset.date) {
              const btnEvent = document.createElement('button');
              btnEvent.setAttribute('class','btnEvent');
              btnEvent.dataset.id = events[i].id;
              const search = document.createElement('i');
              search.setAttribute('class','fa fa-search fa-1x" aria-hidden="true fa-1x');
              const spanEvent = document.createElement('span');
              spanEvent.textContent = events[i].event.slice(0,5);
              btnEvent.append(search," ",spanEvent);
              td.appendChild(btnEvent);

              if(events[i].completed) {
                spanEvent.classList.add("completed");
                btnEvent.style.color = 'red';
              } else {
                spanEvent.classList.remove('completed');
                btnEvent.style.removeProperty("color:red");
              }

            }
          }
        }
        date++;
      }
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
  }

}

generate_thead();
set_years(1990,2030);
set_months();
showCalendar(currentMonth,currentYear);

shape02.append(square02,circle03,square03,circle04);
divClock.append(clock);
textHeader.append(cardTitle,nav01);
cardHeader.append(shape,shape02,divClock,textHeader);
