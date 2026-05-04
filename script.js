// URL ของ Google Apps Script (ถ้ามี) ให้นำมาใส่ตรงนี้
// const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

const form = document.getElementById('assessmentForm');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerText;
        
        // เปลียนข้อความปุ่มขณะกำลังส่งข้อมูล
        submitBtn.disabled = true;
        submitBtn.innerText = 'TRANSMITTING...';
        submitBtn.style.opacity = '0.7';

        // -----------------------------------------------------
        // หากต้องการส่งข้อมูลเข้า Google Sheets ให้เปิดคอมเมนต์ชุดด้านล่างนี้
        // และเอา setTimeout ชุดล่างสุดออก
        // -----------------------------------------------------
        /*
        const formData = new FormData(form);
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(res => {
                showSuccessAlert();
                form.reset();
                resetButton(submitBtn, originalText);
            })
            .catch(err => {
                showErrorAlert();
                resetButton(submitBtn, originalText);
            });
        */

        // -----------------------------------------------------
        // การจำลองการส่งข้อมูล (Simulation) สำหรับทดสอบ UI
        // -----------------------------------------------------
        setTimeout(() => {
            showSuccessAlert();
            form.reset();
            resetButton(submitBtn, originalText);
        }, 1500);
    });
}

// ฟังก์ชันแสดง Alert สำเร็จสไตล์อวกาศ
function showSuccessAlert() {
    Swal.fire({ 
        title: 'TRANSMISSION COMPLETE', 
        text: 'ข้อมูลพิกัดถูกบันทึกเข้าสู่ฐานข้อมูลหลักแล้ว', 
        icon: 'success', 
        background: 'rgba(15, 23, 42, 0.95)', 
        color: '#f5f5f7', 
        confirmButtonColor: '#00d4ff',
        backdrop: `rgba(0,0,0,0.8)`
    });
}

// ฟังก์ชันแสดง Alert ล้มเหลว
function showErrorAlert() {
    Swal.fire({ 
        title: 'CONNECTION LOST', 
        text: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง', 
        icon: 'error', 
        background: 'rgba(15, 23, 42, 0.95)', 
        color: '#f5f5f7', 
        confirmButtonColor: '#ff3b30',
        backdrop: `rgba(0,0,0,0.8)`
    });
}

// ฟังก์ชันรีเซ็ตปุ่ม
function resetButton(btn, text) {
    btn.disabled = false;
    btn.innerText = text;
    btn.style.opacity = '1';
}

// =========================================
// 🎬 ควบคุม Sequence การเปิดตัว (Logo -> IG -> Form)
// =========================================
window.addEventListener('load', () => {
    document.body.classList.add('loading'); // ล็อกหน้าจอไม่ให้เลื่อน
    
    const logoSplash = document.getElementById('splash-screen');
    const igSplash = document.getElementById('ig-screen');
    const mainContent = document.getElementById('main-content');
    
    // คิวที่ 1: โชว์โลโก้ 2 วินาที
    setTimeout(() => {
        if (logoSplash) logoSplash.style.opacity = '0';
        
        // คิวที่ 2: รอโลโก้จางหาย (0.8 วิ) แล้วเปิดหน้า IG
        setTimeout(() => {
            if (logoSplash) logoSplash.style.display = 'none';
            
            if (igSplash) {
                igSplash.style.display = 'flex';
                // หน่วงเวลาเล็กน้อยเพื่อให้เอฟเฟกต์เฟดอินทำงาน
                setTimeout(() => { igSplash.style.opacity = '1'; }, 50);
            }
            
            // คิวที่ 3: โชว์หน้า IG ค้างไว้ 2.5 วินาที
            setTimeout(() => {
                if (igSplash) igSplash.style.opacity = '0';
                
                // คิวที่ 4 (สุดท้าย): รอหน้า IG จางหายสนิท (0.8 วิ) ค่อยโชว์หน้าฟอร์มประเมิน!
                setTimeout(() => {
                    if (igSplash) igSplash.style.display = 'none';
                    
                    // ปลดล็อกหน้าจอ
                    document.body.classList.remove('loading');
                    
                    // สั่งโชว์หน้าประเมิน
                    if (mainContent) {
                        mainContent.style.display = 'block'; // ให้กินพื้นที่บนหน้าเว็บ
                        setTimeout(() => {
                            mainContent.style.opacity = '1'; // เฟดความสว่างขึ้นมา
                            mainContent.style.transform = 'translateY(0)'; // เลื่อนขึ้นมาสวยๆ
                        }, 50);
                    }
                }, 800);
                
            }, 2500); 
            
        }, 800); 
        
    }, 2000); 
});
