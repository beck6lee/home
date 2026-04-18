document.addEventListener('DOMContentLoaded', () => {
    const heroName = document.getElementById('hero-name');
    const aboutText = document.getElementById('about-text');
    const contactInfo = document.getElementById('contact-info');
    const editBtn = document.getElementById('edit-btn');

    // 从 localStorage 读取数据
    const savedData = JSON.parse(localStorage.getItem('personalHomepage')) || {};

    if (savedData.heroName) heroName.textContent = savedData.heroName;
    if (savedData.aboutText) aboutText.textContent = savedData.aboutText;
    if (savedData.contactInfo) contactInfo.textContent = savedData.contactInfo;

    // 点击编辑按钮
    editBtn.addEventListener('click', () => {
        showEditModal();
    });

    // 点击可编辑区域
    aboutText.addEventListener('click', () => {
        editInline(aboutText, 'aboutText');
    });

    contactInfo.addEventListener('click', () => {
        editInline(contactInfo, 'contactInfo');
    });

    heroName.addEventListener('click', () => {
        editInline(heroName, 'heroName');
    });

    function editInline(element, key) {
        const currentText = element.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'inline-input';

        input.style.cssText = `
            width: 100%;
            padding: 0.5rem;
            font-size: inherit;
            font-family: inherit;
            text-align: center;
            border: 2px solid #667eea;
            border-radius: 6px;
            outline: none;
        `;

        element.replaceWith(input);
        input.focus();
        input.select();

        const save = () => {
            const newText = input.value.trim() || currentText;
            element.textContent = newText;
            input.replaceWith(element);

            const data = JSON.parse(localStorage.getItem('personalHomepage')) || {};
            data[key] = newText;
            localStorage.setItem('personalHomepage', JSON.stringify(data));
        };

        input.addEventListener('blur', save);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            }
            if (e.key === 'Escape') {
                input.value = currentText;
                input.blur();
            }
        });
    }

    function showEditModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>编辑主页信息</h3>
                <input type="text" id="modal-name" placeholder="姓名" value="${heroName.textContent}">
                <textarea id="modal-about" placeholder="自我介绍">${aboutText.textContent}</textarea>
                <textarea id="modal-contact" placeholder="联系方式">${contactInfo.textContent}</textarea>
                <div class="modal-buttons">
                    <button class="cancel-btn">取消</button>
                    <button class="save-btn">保存</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const nameInput = modal.querySelector('#modal-name');
        const aboutInput = modal.querySelector('#modal-about');
        const contactInput = modal.querySelector('#modal-contact');
        const saveBtn = modal.querySelector('.save-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');

        const closeModal = () => {
            modal.remove();
        };

        saveBtn.addEventListener('click', () => {
            const data = {
                heroName: nameInput.value.trim() || heroName.textContent,
                aboutText: aboutInput.value.trim() || aboutText.textContent,
                contactInfo: contactInput.value.trim() || contactInfo.textContent
            };

            heroName.textContent = data.heroName;
            aboutText.textContent = data.aboutText;
            contactInfo.textContent = data.contactInfo;

            localStorage.setItem('personalHomepage', JSON.stringify(data));
            closeModal();
        });

        cancelBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
