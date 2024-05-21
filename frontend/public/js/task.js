
// JavaScript to open and close the edit profile dialog
function openCreateTask() {
    var create_task = document.getElementById('create-task');
    create_task.style.display = 'block';
}

function closeCreateTask() {
    var create_task = document.getElementById('create-task');
    create_task.style.display = 'none';
}
let tasks;

// Script để gọi API từ server
document.addEventListener('DOMContentLoaded', () => {
  fetchDataFromServer();
});

async function fetchDataFromServer() {
  try {
    const userID = localStorage.getItem('userID');

    const response = await fetch(`http://localhost:3000/api/tasks/getTask/${userID}`);
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
  closeSpan.onclick = () => closeModal(modalId);
  modalContent.appendChild(closeSpan);

  const modalTitleDiv = document.createElement('h2');
  modalTitleDiv.textContent = modalTitle;
  modalContent.appendChild(modalTitleDiv);

  const modalForm = document.createElement('form');

  const inputTitle = createInput('Title', 'text', task.title, task.task_id);
  inputTitle.className = 'newinfo';
  modalForm.appendChild(inputTitle);

  const inputDueDate = createInput('Due Date', 'date', task.dueDate, task.task_id);
  inputDueDate.className = 'newinfo';
  modalForm.appendChild(inputDueDate);
  

  const inputDescription = createInput('Description', 'text', task.description, task.task_id);
  inputDescription.className = 'newinfo';
  modalForm.appendChild(inputDescription);

  const inputIsImportant = createInput('Is Important', 'checkbox', task.isImportant, task.task_id);
  inputIsImportant.className = 'newinfo';
  modalForm.appendChild(inputIsImportant);

  const inputIsCompleted = createInput('Is Completed', 'checkbox', task.isCompleted, task.task_id);
  inputIsCompleted.className = 'newinfo';
  modalForm.appendChild(inputIsCompleted);

  if (modalTitle === 'Update Task') {
    const saveButton = document.createElement('button');
    saveButton.className = 'save-button';
    saveButton.textContent = 'Save Update';

    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      const updatedData = {
        title: document.getElementById(`title-${task.task_id}`).value,
        dueDate: document.getElementById(`due-date-${task.task_id}`).valueAsDate,
        description: document.getElementById(`description-${task.task_id}`).value,
        isImportant: document.getElementById(`is-important-${task.task_id}`).checked,
        isCompleted: document.getElementById(`is-completed-${task.task_id}`).checked
      };
      document.getElementById
      console.log(updatedData);
      console.log(inputDueDate.value);
      if (updatedData.dueDate === null || updatedData.dueDate === "") {
        alert("Due Date không được để trống. Vui lòng nhập giá trị hợp lệ.");
      } else{
      updateTask(task._id, updatedData);
      closeModal(modalId);
      location.reload();
      // Tạo một thông báo đơn giản
      alert(`Task ${updatedData.title} updated successfully.`);

      }
    });

    modalForm.appendChild(saveButton);
  } else {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      deleteTask(task.task_id);
      closeModal(modalId);
      location.reload();
      // Tạo một thông báo đơn giản
      alert(`Task ${task.title} deleted successfully.`);

    });
    
    modalForm.appendChild(deleteButton);
  }

  modalContent.appendChild(modalForm);
  modal.appendChild(modalContent);

  return modal;
}

function createInput(labelText, inputType, value, taskId) {
  const inputDiv = document.createElement('div');
  const label = document.createElement('label');
  label.textContent = labelText + ':';
  inputDiv.appendChild(label);

  const input = document.createElement('input');
  input.type = inputType;
  if (input.type === 'checkbox') {
    input.checked = value;
  } else {
    input.value = value;
  }

  switch (labelText) {
    case "Title":
      input.name = "title";
      // input.className = "title";
      break;
    case "Due Date":
      input.name = "dueDate";
      // input.className = "dueDate";
      break;
    case "Description":
      input.name = "description";
      // input.className = "description";
      break;
    case "Is Important":
      input.name = "isImportant";
      // input.className = "isImportant";
      break;
    // Thêm các trường hợp khác nếu cần
    default:
      input.name = 'isCompleted';
      // input.className = "isCompleted";
  }
  input.setAttribute('id', `${labelText.toLowerCase().replace(' ', '-')}-${taskId}`);
  // input.classList.add(`${labelText.toLowerCase().replace(' ', '-')}-${taskId}`);

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

function updateTask(id, updatedData) {
  fetch(`http://localhost:3000/api/tasks/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Task updated:', data);
    // Cập nhật giao diện người dùng tại đây (nếu cần)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function deleteTask(id) {
  fetch(`http://localhost:3000/api/tasks/delete/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Task deleted:', data);
    // Cập nhật giao diện người dùng tại đây (nếu cần)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


function createTask() {
  // Lấy giá trị từ các trường input
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const isImportant = document.getElementById("isImportant").checked;
  const isCompleted = document.getElementById("isCompleted").checked;
  const dueDate = document.getElementById("dueDate").value;

  if (title === null || title === '' || dueDate ===null || dueDate ==='' || description === null || description ==='') {
    alert("Title, Due Date và Description không được để trống. Vui lòng nhập giá trị hợp lệ.");
  } else{
    // Tạo đối tượng chứa dữ liệu để gửi đi
    const user_ID = localStorage.getItem('userID');

    const data = {
      user_id: user_ID,
      title: title,
      description: description,
      isImportant: isImportant,
      isCompleted: isCompleted,
      dueDate: dueDate
    };
  
  // Gửi yêu cầu POST tới máy chủ
  fetch(`http://localhost:3000/api/tasks/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    // Xử lý kết quả từ máy chủ (nếu cần)
    console.log(result);
    // Đóng modal sau khi tạo task thành công
    closeCreateTask();
    location.reload();
    // Tạo một thông báo đơn giản
    alert(`Task ${data.title} đã được tạo thành công.`);

  })
  .catch(error => {
    console.error('Error:', error);
    // Xử lý lỗi (nếu cần)
  });
  }
}