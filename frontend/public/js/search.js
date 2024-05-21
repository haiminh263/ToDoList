let tasks;
// JavaScript to open and close the search dialog
document.getElementById('search-button').addEventListener('click', () => {
  fetchDataFromServer();
});

async function fetchDataFromServer() {
  try {
    const userID = localStorage.getItem('userID');
    var search_Input = document.getElementById('searchInput').value;

    const response = await fetch(`http://localhost:3000/api/search/searchTask/${userID}/${search_Input}`);
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
    
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    // Hiển thị tasks sử dụng forEach
    tasks.forEach((task, index) => {
      // const taskContainer = document.getElementById('taskContainer');


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

      // // Tạo button Update
      // const updateButton = document.createElement('button');
      // updateButton.classList.add('update');
      // updateButton.textContent = 'Update';
      // updateButton.addEventListener('click', () => openModal('modalUpdate' + index));

      // // Tạo button Delete
      // const deleteButton = document.createElement('button');
      // deleteButton.classList.add('delete');
      // deleteButton.textContent = 'Delete';
      // deleteButton.addEventListener('click', () => openModal('modalDelete' + index));

      // // Thêm button vào div chứa các button
      // actionButtonsDiv.appendChild(updateButton);
      // actionButtonsDiv.appendChild(deleteButton);

      // Thêm div chứa các button vào taskDiv
      taskDiv.appendChild(actionButtonsDiv);

      // Thêm taskDiv vào container
      taskContainer.appendChild(taskDiv);

      // // Thêm modal Update
      // const modalUpdate = createModal('modalUpdate' + index, 'Update Task', task);
      // taskContainer.appendChild(modalUpdate);

      // // Thêm modal Delete
      // const modalDelete = createModal('modalDelete' + index, 'Delete Task', task);
      // taskContainer.appendChild(modalDelete);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
