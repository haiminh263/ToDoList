document.getElementById('signup-button').addEventListener('click', () => {
    // Chuyển hướng người dùng đến trang đăng ký
    document.getElementById("form-login").reset();
    window.location.href = '../views/signup.html';
});
  

// Lắng nghe sự kiện click của nút login
document.getElementById('login-button').addEventListener('click', async (event) => {
    event.preventDefault(); // Ngăn chặn việc chuyển hướng mặc định của form

    // Lấy giá trị của email và password từ form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // In ra nội dung body mà bạn đã gửi để kiểm tra
    // console.log(JSON.stringify({ email, password }));

    try {
        // Gửi yêu cầu fetch đến server
        const response = await fetch('http://localhost:3000/api/login/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Kiểm tra xem yêu cầu có thành công không
        if (response.ok) {
            // Nếu đăng nhập thành công, chuyển hướng đến trang home.html hoặc thực hiện hành động phù hợp

            window.location.href = '../views/home.html';
            
            // Đọc và xử lý dữ liệu từ phản hồi
            const result = await response.json();
            // localStorage.setItem('userEmail', result.email);
            localStorage.setItem('userID', result);

            console.log(localStorage.getItem('userID'));
  
            
        } else {
            /// Xử lý lỗi nếu có
          const errorData = await response.json();
          alert('Login failed: ' + errorData.message);
        }
    } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, in ra thông báo lỗi
        console.error('An error occurred during login:', error);
    }
});
 

