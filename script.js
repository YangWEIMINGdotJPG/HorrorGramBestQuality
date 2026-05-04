const textTitle = "บันทึกผู้รอดชีวิต...";
const textSub = "โปรดทิ้งร่องรอยของคุณไว้ด้านล่าง ข้อมูลนี้จะเป็นประโยชน์ต่อการพัฒนาความหลอน...";

// ฟังก์ชันสำหรับพิมพ์ดีดข้อความ
function typeWriter(element, text, speed, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(element, text, speed, i + 1), speed);
    }
}

// 🎬 จัดคิวฉากเปิดตัว (Logo -> Credit IG -> แบบฟอร์ม)
window.onload = () => {
    const logoSplash = document.getElementById('splash-screen');
    const igSplash = document.getElementById('ig-screen');
    const container = document.querySelector('.container');
    const titleElement = document.querySelector('.survivor-title');

    // 🛑 1. ซ่อนหน้าแบบประเมินไว้ก่อน
    if (container) container.style.display = 'none'; 
    
    // 2. โชว์โลโก้ HorrorGram ค้างไว้ 2 วินาที แล้วสั่งให้จางหาย
    setTimeout(() => {
        if (logoSplash) logoSplash.style.opacity = '0';
        
        // 3. รอ 1 วิ ให้โลโก้จางสนิท -> ปิดกล่องโลโก้ -> เปิดกล่อง IG
        setTimeout(() => {
            if (logoSplash) logoSplash.style.display = 'none';
            if (igSplash) igSplash.style.display = 'flex';
            
            // สั่งให้ IG ค่อยๆ ชัดขึ้น
            setTimeout(() => {
                if (igSplash) igSplash.style.opacity = '1';
                
                // 4. โชว์ IG Credit ค้างไว้ 2.5 วินาที แล้วสั่งให้จางหาย
                setTimeout(() => {
                    if (igSplash) igSplash.style.opacity = '0';
                    
                    // 5. จบ Intro -> ปิดจอ IG ทิ้ง -> โชว์หน้าแบบประเมิน!
                    setTimeout(() => {
                        if (igSplash) igSplash.style.display = 'none';
                        
                        // เสกหน้าฟอร์มขึ้นมา พร้อมเอฟเฟกต์ Fade in
                        if (container) {
                            container.style.display = 'block'; 
                            container.style.animation = 'fadeIn 1s ease-in-out';
                        }
                        
                        // เริ่มพิมพ์ข้อความหัวเรื่อง
                        if (titleElement) {
                            titleElement.innerHTML = "";
                            typeWriter(titleElement, textTitle, 100);
                        }
                    }, 1000);
                    
                }, 2500); 
                
            }, 50); 
            
        }, 1000); 
        
    }, 2000); 
};


// ==========================================
// 🔴 ⚠️ อย่าลืมเอา URL ของ Google Apps Script ของคุณมาวางทับในบรรทัดนี้ด้วยนะครับ
const scriptURL = 'https://script.google.com/macros/s/AKfycbzUijMhglI9a9uoQqgz8lPRJZxSrtxjXHlSXWKLhQazbuiuHc-P7kl6ZLXh85by3uDbdA/exec'; 
// ==========================================

const form = document.getElementById('assessmentForm');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        // 🔴 1. เพิ่มบรรทัดนี้ลงไปเพื่อสั่งให้ Jumpscare ทำงานทันทีที่กดปุ่ม
        document.body.classList.add('jumpscare-active');

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerText = 'กำลังเปิดประตูปรโลก...';

        const formData = new FormData(form);
        
        // ประมวลผล Checkbox วิญญาณ
        const ghosts = [];
        document.querySelectorAll('input[name="fav_ghost"]:checked').forEach(cb => ghosts.push(cb.value));
        formData.set('fav_ghost', ghosts.join(', '));

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(res => {

                // 🔴 2. เพิ่มบรรทัดนี้เพื่อล้างสถานะ Jumpscare หลังส่งเสร็จ (หน่วงเวลา 1 วิให้ผีวิ่งจบก่อน)
                setTimeout(() => document.body.classList.remove('jumpscare-active'), 1000);

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
    });
}
