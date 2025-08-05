document.addEventListener('DOMContentLoaded', () => {
    // โค้ดสำหรับหน้าหลัก (main.html)
    if (document.getElementById('dataForm')) {
        const username = localStorage.getItem('username');
        if (!username) {
            window.location.href = 'index.html';
            return; // ป้องกันการทำงานของโค้ดส่วนที่เหลือ
        }

        document.getElementById('welcome-message').textContent = `ยินดีต้อนรับ, ${username}!`;

        const dataForm = document.getElementById('dataForm');
        const dataList = document.getElementById('data-list');

        let allData = JSON.parse(localStorage.getItem('user_data')) || [];

        const renderData = () => {
            dataList.innerHTML = '';
            allData.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <p><strong>${item.datetime}</strong></p>
                    <p>${item.text}</p>
                `;
                dataList.appendChild(li);
            });
        };

        dataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dataText = document.getElementById('dataText').value;
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const formattedDatetime = now.toLocaleDateString('th-TH', options) + ' ' + now.toLocaleTimeString('th-TH');
            
            const newData = {
                text: dataText,
                datetime: formattedDatetime
            };
            allData.push(newData);
            localStorage.setItem('user_data', JSON.stringify(allData));
            document.getElementById('dataText').value = '';
            renderData();
        });

        renderData();

        document.getElementById('logout-button').addEventListener('click', () => {
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    } 
    
    // โค้ดสำหรับหน้าล็อกอิน (index.html)
    else if (document.getElementById('loginForm')) {
        if (localStorage.getItem('username')) {
            window.location.href = 'main.html';
        }

        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('error-message');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // กำหนดชื่อผู้ใช้และรหัสผ่านสำหรับทดสอบ
            const validUsername = 'admin';
            const validPassword = 'password';

            if (username === validUsername && password === validPassword) {
                localStorage.setItem('username', username);
                window.location.href = 'main.html';
            } else {
                errorMessage.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
            }
        });
    }
});