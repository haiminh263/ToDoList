
// Giả định danh sách tasks


let tasks;

// Script để gọi API từ server
document.addEventListener('DOMContentLoaded', () => {
  fetchDataFromServer();
});

async function fetchDataFromServer() {
  try {
    const userID = localStorage.getItem('userID');

    const response = await fetch(`http://localhost:3000/api/important/getImportant/${userID}`);
    const responseData = await response.json();

    // Kiểm tra xem responseData có phải là mảng hay không
    if (Array.isArray(responseData)) {
      tasks = responseData;
    } else if (typeof responseData === 'object') {
      // Nếu là đối tượng, tạo một mảng chứa đối tượng đó
      tasks = [responseData];
    } else {
      console.error('Data from server is not an array or object:', responseData);
      return;
    }

    // Xử lý dữ liệu nhận được từ server
    console.log('Data from server:', tasks);

    // Hiển thị tasks sử dụng forEach
    tasks.forEach((task, index) => {
      const taskContainer = document.getElementById('taskContainer');

      // Tạo phần tử div cho mỗi task
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      const taskInfoDiv = document.createElement('div');
      taskInfoDiv.classList.add('taskInfo');

      taskInfoDiv.innerHTML = `
        <strong>${task.title}</strong><br>
        Due Date: ${task.dueDate}<br>
        Description: ${task.description}
      `;

      // Thêm div chứa thông tin vào taskDiv
      taskDiv.appendChild(taskInfoDiv);

      // Tạo div chứa các span của important và completed
      const statusDiv = document.createElement('div');
      statusDiv.classList.add('status');

      // Kiểm tra isImportant và isCompleted để thêm chữ important và completed
      if (task.isImportant) {
        const importantSpan = document.createElement('span');
        importantSpan.classList.add('important_task');
        importantSpan.textContent = 'important';
        statusDiv.appendChild(importantSpan);
      }

      if (task.isCompleted) {
        const completedSpan = document.createElement('span');
        completedSpan.classList.add('completed_task');
        completedSpan.textContent = 'completed';
        statusDiv.appendChild(completedSpan);
      }

      // Thêm div chứa status vào taskDiv
      taskDiv.appendChild(statusDiv);

      // Tạo div chứa các button
      const actionButtonsDiv = document.createElement('div');
      actionButtonsDiv.classList.add('action-buttons');

      // Tạo button Update
      const updateButton = document.createElement('button');
      updateButton.classList.add('update');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => openModal('modalUpdate' + index));

      // Tạo button Delete
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => openModal('modalDelete' + index));

      // Thêm button vào div chứa các button
      actionButtonsDiv.appendChild(updateButton);
      actionButtonsDiv.appendChild(deleteButton);

      // Thêm div chứa các button vào taskDiv
      taskDiv.appendChild(actionButtonsDiv);

      // Thêm taskDiv vào container
      taskContainer.appendChild(taskDiv);

      // Thêm modal Update
      const modalUpdate = createModal('modalUpdate' + index, 'Update Task', task);
      taskContainer.appendChild(modalUpdate);

      // Thêm modal Delete
      const modalDelete = createModal('modalDelete' + index, 'Delete Task', task);
      taskContainer.appendChild(modalDelete);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
function createModal(modalId, modalTitle, task) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = modalId;

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.innerHTML = '&times;';

    closeSpan.addEventListener('click', () =>closeModal(modalId));
    modalContent.appendChild(closeSpan);

    const modalTitleDiv = document.createElement('h2');
    modalTitleDiv.textContent = modalTitle;
    modalContent.appendChild(modalTitleDiv);

    
    const modalForm = document.createElement('form');
    // modalForm.classList.add('form');

    const inputTitle = createInput('Title', 'text', task.title);
    inputTitle.className = 'newinfo';
    modalForm.appendChild(inputTitle);

    const inputDueDate = createInput('Due Date', 'date', task.dueDate);
    inputDueDate.className = 'newinfo';
    modalForm.appendChild(inputDueDate);

    const inputDescription = createInput('Description', 'text', task.description);
    inputDescription.className = 'newinfo';
    modalForm.appendChild(inputDescription);

    const inputIsImportant = createInput('Is Important', 'checkbox', task.isImportant);
    inputIsImportant.className = 'newinfo';
    modalForm.appendChild(inputIsImportant);

    const inputIsCompleted = createInput('Is Completed', 'checkbox', task.isCompleted);
    inputIsCompleted.className = 'newinfo';
    modalForm.appendChild(inputIsCompleted);

    if(modalTitle==='Update Task'){
        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';
        saveButton.textContent = 'Save Update';
        saveButton.addEventListener('onclick', () => closeModal(modalId));
        modalForm.appendChild(saveButton);
    } else{
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete Task';
        deleteButton.addEventListener('onclick', () => closeModal(modalId));
        modalForm.appendChild(deleteButton);
    }

    modalContent.appendChild(modalForm);
    modal.appendChild(modalContent);

    return modal;
}

function createInput(labelText, inputType, value) {
    const inputDiv = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = labelText + ':';
    inputDiv.appendChild(label);

    const input = document.createElement('input');
    input.type = inputType;
    if(input.type==='checkbox') {
        if(value===1) {input.value=true;}
        else {input.value=false;}
    } else {
        input.value = value;
    }

    switch (labelText) {
        case "Title":
            input.id = "title";
            break;
        case "Due Date":
            input.id = "dueDate";
            break;
        case "Description":
            input.id = "description";
            break;
        case "Is Important":
            input.id = "isImportant";
            break;
        // Thêm các trường hợp khác nếu cần
        default:
            input.id = 'isCompleted';
    }
    
    inputDiv.appendChild(input);

    return inputDiv;
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}
