const loginButton = document.getElementById('login-button');

// Đăng ký sự kiện khi nhấn nút
loginButton.addEventListener('click', () => {
  // Chuyển hướng người dùng đến trang đăng ký
  window.location.href = '../views/login.html';
});



document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.getElementById('signup-button');
  
    signupButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Ngăn chặn việc chuyển hướng mặc định của form
  
      // Lấy giá trị từ các trường nhập liệu trong form
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm_password').value;
  

      try {
        // Gửi yêu cầu POST đến endpoint /api/signup/check trên máy chủ
        const response = await fetch('http://localhost:3000/api/signup/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: username, email, password, confirm_password: confirmPassword })
        });
  
        // Kiểm tra xem yêu cầu có thành công không
        if (response.ok) {
          // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chính sau khi đăng ký thành công
          alert("Signup successfully");
          window.location.href = '../views/login.html'; // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
        } else {
          // Xử lý lỗi nếu có
          const errorData = await response.json();
          alert('Signup failed: ' + errorData.message);
        }
      } catch (error) {
        // Xử lý lỗi nếu có lỗi không mong muốn xảy ra
        console.error('An error occurred during signup:', error);
        alert('An error occurred during signup. Please try again later.');
      }
    });
  });
  