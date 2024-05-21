// JavaScript to open and close the edit profile dialog
function openEditDialog() {
    var editDialog = document.getElementById('edit-dialog');
    editDialog.style.display = 'block';
}

function closeEditDialog() {
    var editDialog = document.getElementById('edit-dialog');
    editDialog.style.display = 'none';
}



document.addEventListener('DOMContentLoaded', () => {
  fetchDataFromServer();
});

async function fetchDataFromServer() {
  try {
    // Lấy giá trị của biến userEmail từ Local Storage
    const userID = localStorage.getItem('userID');

    // Nếu biến userEmail không tồn tại, không thực hiện gì cả
    if (!userID) {
      console.error('Error: userID not found in Local Storage');
      return;
    }

    // Gửi yêu cầu GET để lấy thông tin người dùng từ máy chủ
    const response = await fetch(`http://localhost:3000/api/home/info/${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Kiểm tra xem phản hồi có thành công không
    if (response.ok) {
      // Chuyển đổi dữ liệu phản hồi sang JSON
      const responseData = await response.json();
      const info = responseData;

      // Xử lý dữ liệu và cập nhật giao diện người dùng
      updateUserInfo(info);
    } else {
      // Nếu có lỗi, in ra thông báo lỗi
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    // Nếu có lỗi xảy ra trong quá trình lấy dữ liệu, in ra thông báo lỗi
    console.error('Error fetching data:', error);
  }
}

// Hàm để cập nhật thông tin người dùng trên giao diện
function updateUserInfo(info) {
  console.log(info);
  const profileContainer = document.getElementById('profile-container');

  // Tạo các phần tử HTML để hiển thị thông tin người dùng
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add('username');
  usernameDiv.innerHTML = `
    <h1>${info.name}</h1>
  `;

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'details';
  detailsDiv.innerHTML = `
    <p>Email: ${info.email}</p>
    <p>Info: ${info.personalInfo}</p>
  `;

  const changeInfoButton = document.createElement('button');
  changeInfoButton.className = 'change-info-button';
  changeInfoButton.textContent = 'Change Information';

  changeInfoButton.addEventListener('click', (e) => {
    openEditDialog();
  });

  // Thêm các phần tử vào container
  profileContainer.appendChild(usernameDiv);
  profileContainer.appendChild(detailsDiv);
  profileContainer.appendChild(changeInfoButton);

  // Pre-fill input fields with user information
  const nameInput = document.getElementById('name');
  nameInput.value = info.name;
  const emailInput = document.getElementById('email');
  emailInput.value = info.email;
  const infoInput = document.getElementById('info');
  infoInput.value = info.personalInfo;

  // Thêm sự kiện cho nút lưu thông tin
  const saveButton = document.getElementById('saveinfo');
  saveButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const personalInfo = document.getElementById("info").value;

    const data = {
      name: username,
      // email: email,
      personalInfo: personalInfo
    };
    console.log(data);
    changeInfo(info._id, data);
  });
}


// // Script để gọi API từ server
// document.addEventListener('DOMContentLoaded', () => {
//   fetchDataFromServer();
// });

// async function fetchDataFromServer() {
//   try {
//     const response = await fetch('http://localhost:3000/api/home/info');
//     const responseData = await response.json();
//     const info = responseData;

//     console.log(info);
//     const profileContainer = document.getElementById('profile-container');

//     // Tạo các phần tử HTML
//     const usernameDiv = document.createElement('div');
//     usernameDiv.classList.add('username') ;

//     usernameDiv.innerHTML = `
//             <h1>${info.name}<h1>
//         `;

//     const detailsDiv = document.createElement('div');
//     detailsDiv.className = 'details';

//     detailsDiv.innerHTML = `
//             <p>Email: ${info.email} </p>
//             <p>Info: ${info.personalInfo}</p>
//             `


//     const changeInfoButton = document.createElement('button');
//     changeInfoButton.className = 'change-info-button';
//     changeInfoButton.textContent = 'Change Information';


//     changeInfoButton.addEventListener('click', (e) => {
//       openEditDialog();
//     });
//     // Gắn các phần tử vào profileContainer của tài liệu
//     profileContainer.appendChild(usernameDiv);


//     profileContainer.appendChild(detailsDiv);


//     profileContainer.appendChild(changeInfoButton);
    
//     const nameInput = document.getElementById('name');
//     nameInput.value = info.name;
//     const emailInput = document.getElementById('email');
//     emailInput.value = info.email;
//     const infoInput = document.getElementById('info');
//     infoInput.value = info.personalInfo;

//     saveButton = document.getElementById('saveinfo');
//     saveButton.addEventListener('click', (ev) => {
//       ev.preventDefault();
      
      

//       const usename = document.getElementById("name").value;
//       const email = document.getElementById("email").value;
//       const pinfo = document.getElementById("info").value;

    
//       const data = {
//         name: usename,
//         email: email,
//         personalInfo: pinfo
//       };
//       console.log(data);
//       changeInfo(info._id, data);
//     })


// } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }


  // Send a PATCH request to the server
function changeInfo(id, info) {
  fetch(`http://localhost:3000/api/home/changeInfo/${id}`, {

    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  })
  .then(response => response.json())
  .then(result => {
      // Handle the server response (if needed)
      console.log(result);
      // Close the edit dialog after successful update
      closeEditDialog();
  })
  .catch(error => {
      console.error('Error:', error);
      // Handle errors (if needed)
  });

  closeEditDialog();
  location.reload();
  alert(`User changed infomation successfully.`);
}
