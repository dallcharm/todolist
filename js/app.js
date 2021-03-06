const BASE_URL='http://localhost:3000/';


function loadList() {
    getList()
        .then(createList)
        .catch(console.error)
}

function getList() {
    return fetch(`${BASE_URL}items`)
        .then(response => response.json())
}

function createList(listItems)   {
    const elementID = 'todo-list'
    const listElement = document.getElementById(elementID)
    for (const item of listItems) {
        const itemElement = createListItem(item)
        listElement.appendChild(itemElement)
    }
}

function createListItem (item) {
    const liElement = document.createElement('li')
    liElement.innerHTML= `
    <p>${item.text}</p>
    <button>Actualizar</button>
    <button>Eliminar</button>
    `
    return liElement
}

function createTask()   {
    const text = document.getElementById('add-task-area').value
    const task =   {text}
    saveTask(task)
        .then(addTaskToList)
        .catch(console.error)
}

function saveTask (task) {
    return fetch(`${BASE_URL}items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
  }
  
  function updateTask (task) {
    return fetch(`${BASE_URL}items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
  }

  function onSubmitFormAddTask (event) {
    event.preventDefault()
    createTask()
  }

function onUpdateButtonEvent (){
    alert("testing");

}
  
  function suscribeToFormAddTaskSubmit () {
    const form = document.getElementById('add-task')
    form.addEventListener('submit', onSubmitFormAddTask)
  }
  
  function addTaskToList(task){
      const listElement = document.getElementById('todo-list')
      const taskItem = createListItem(task)
      listElement.append(taskItem)
      document.getElementById('add-task-area').value = ''
  }

  window.addEventListener('load', function () {
    loadList()
    suscribeToFormAddTaskSubmit()
  })