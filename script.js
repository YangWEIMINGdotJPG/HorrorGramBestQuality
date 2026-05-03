const textTitle = "บันทึกผู้รอดชีวิต...";
const textSub = "โปรดทิ้งร่องรอยของคุณไว้ด้านล่าง ข้อมูลนี้จะเป็นประโยชน์ต่อการพัฒนาความหลอน...";

function typeWriter(element, text, speed, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(element, text, speed, i + 1), speed);
    }
}

// เรียกใช้ตอนโหลดหน้าจอเสร็จ (หลังจาก Splash Screen หายไป)
window.onload = () => {
    setTimeout(() => {
        const ss = document.getElementById('splash-screen');
        ss.style.opacity = '0';
        setTimeout(() => {
            ss.style.display = 'none';
            // เริ่มพิมพ์ข้อความ
            document.querySelector('.survivor-title').innerHTML = "";
            typeWriter(document.querySelector('.survivor-title'), textTitle, 100);
        }, 1000);
    }, 2000);
};

// URL สำหรับส่งข้อมูลไปยัง Google Sheets (นำ URL ของคุณมาใส่ที่นี่)
const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
const form = document.getElementById('assessmentForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = 'กำลังบันทึกร่องรอย...';

    const formData = new FormData(form);
    
    // ประมวลผล Checkbox วิญญาณ
    const ghosts = [];
    document.querySelectorAll('input[name="fav_ghost"]:checked').forEach(cb => ghosts.push(cb.value));
    formData.set('fav_ghost', ghosts.join(', '));

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(res => {
            Swal.fire({ 
                title: 'สำเร็จ!', 
                text: 'ร่องรอยของคุณถูกบันทึกแล้ว', 
                icon: 'success', 
                background: '#111', 
                color: '#fff', 
                confirmButtonColor: '#8b0000' 
            });
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = 'ยืนยันการส่งข้อมูล';
        })
        .catch(err => {
            Swal.fire({ 
                title: 'ล้มเหลว!', 
                text: 'วิญญาณรบกวนสัญญาณ กรุณาลองใหม่อีกครั้ง', 
                icon: 'error', 
                background: '#111', 
                color: '#fff' 
            });
            submitBtn.disabled = false;
            submitBtn.innerText = 'ยืนยันการส่งข้อมูล';
        });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = 'กำลังเปิดประตูปรโลก...';

    const formData = new FormData(form);
    
    // ประมวลผล Checkbox วิญญาณ
    const ghosts = [];
    document.querySelectorAll('input[name="fav_ghost"]:checked').forEach(cb => ghosts.push(cb.value));
    formData.set('fav_ghost', ghosts.join(', '));

    // 🔴 ปล่อย Jumpscare ทำงานก่อนส่งข้อมูล!
    const jumpBox = document.getElementById('jumpscare-box');
    const scream = document.getElementById('scream-sound');
    
    jumpBox.style.display = 'flex'; // โชว์รูปผี
    scream.play(); // เล่นเสียงกรี๊ด
    
    // ตั้งเวลาให้รูปผีหายไปใน 0.6 วินาที แล้วค่อยส่งข้อมูล
    setTimeout(() => {
        jumpBox.style.display = 'none'; // ซ่อนผี

        // เริ่มส่งข้อมูลจริงๆ
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(res => {
                Swal.fire({ 
                    title: 'วิญญาณถูกจองจำ!', 
                    text: 'ร่องรอยของคุณถูกบันทึกเรียบร้อยแล้ว...', 
                    icon: 'success', 
                    background: '#111', 
                    color: '#ff1a1a', 
                    confirmButtonColor: '#8b0000' 
                });
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = 'ยืนยันการส่งข้อมูล';
            })
            .catch(err => {
                Swal.fire({ 
                    title: 'ล้มเหลว!', 
                    text: 'วิญญาณรบกวนสัญญาณ กรุณาลองใหม่อีกครั้ง', 
                    icon: 'error', 
                    background: '#111', 
                    color: '#fff' 
                });
                submitBtn.disabled = false;
                submitBtn.innerText = 'ยืนยันการส่งข้อมูล';
            });
    }, 600); // 600 มิลลิวินาที (0.6 วิ) คือความยาวของ Jumpscare
});