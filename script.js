// script.js

// Template Switching
const templateSelector = document.getElementById('templateSelector');
const templateLink = document.getElementById('templateLink');

templateSelector.addEventListener('change', () => {
    templateLink.href = templateSelector.value;
});

// Font Customization
const fontSizeSelector = document.getElementById('fontSizeSelector');
const fontColorPicker = document.getElementById('fontColorPicker');
const fontFamilySelector = document.getElementById('fontFamilySelector');

fontSizeSelector.addEventListener('change', () => updateFontStyles());
fontColorPicker.addEventListener('input', () => updateFontStyles());
fontFamilySelector.addEventListener('change', () => updateFontStyles());

function updateFontStyles() {
    const resumeSection = document.getElementById('resume');

    const fontSizeValue = fontSizeSelector.value;
    let fontSize = '16px';
    if (fontSizeValue === 'small') fontSize = '14px';
    else if (fontSizeValue === 'medium') fontSize = '16px';
    else if (fontSizeValue === 'large') fontSize = '18px';

    resumeSection.style.fontSize = fontSize;
    resumeSection.style.color = fontColorPicker.value;
    resumeSection.style.fontFamily = fontFamilySelector.value;
}

// Dynamic Section Handlers
const nameInput = document.getElementById('name');
const mobileInput = document.getElementById('mobile');
const linkedinInput = document.getElementById('linkedin');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github');
const portfolioInput = document.getElementById('portfolio');
const experienceInput = document.getElementById('experience');
const certificationsInput = document.getElementById('certifications');
const resume = document.getElementById('resume');

const educationContainer = document.getElementById('education-container');
const addEducationBtn = document.getElementById('add-education');

const projectsContainer = document.getElementById('projects-container');
const addProjectBtn = document.getElementById('add-project');

const activitiesContainer = document.getElementById('activities-container');
const addActivityBtn = document.getElementById('add-activity');

const skillsContainer = document.getElementById('skills-container');
const addSkillBtn = document.getElementById('add-skill');

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPopup = document.getElementById('chatbotPopup');
const closeChat = document.getElementById('closeChat');

addEducationBtn.addEventListener('click', () => {
    const entry = document.createElement('div');
    entry.classList.add('education-entry');
    entry.innerHTML = `
        <input type="text" placeholder="Institution Name">
        <input type="text" placeholder="Degree/Course">
        <input type="text" placeholder="Year of Start">
        <input type="text" placeholder="Year of Completion">
        <input type="text" placeholder="Aggregate/Percentage">
    `;
    educationContainer.appendChild(entry);
});

addProjectBtn.addEventListener('click', () => {
    const entry = document.createElement('div');
    entry.classList.add('project-entry');
    entry.innerHTML = `
        <input type="text" placeholder="Project Title">
        <textarea placeholder="Project Description"></textarea>
    `;
    projectsContainer.appendChild(entry);
});

addActivityBtn.addEventListener('click', () => {
    const entry = document.createElement('div');
    entry.classList.add('activity-entry');
    entry.innerHTML = `
        <textarea placeholder="Activity Description"></textarea>
    `;
    activitiesContainer.appendChild(entry);
});

addSkillBtn.addEventListener('click', () => {
    const entry = document.createElement('div');
    entry.classList.add('skill-entry');
    entry.innerHTML = `
        <input type="text" placeholder="Skill Name">
    `;
    skillsContainer.appendChild(entry);
});

chatbotToggle.addEventListener('click', () => {
    chatbotPopup.style.display = 'block';
});

closeChat.addEventListener('click', () => {
    chatbotPopup.style.display = 'none';
});

const downloadBtn = document.getElementById('download');
downloadBtn.addEventListener('click', () => {
    html2pdf().from(resume).save('Resume.pdf');
});

function updateResume() {
    resume.innerHTML = `
        <h1>${nameInput.value || 'Your Name'}</h1>
        <p><strong>Mobile:</strong> ${mobileInput.value || ''}</p>
        <p><strong>LinkedIn:</strong> ${linkedinInput.value || ''}</p>
        <p><strong>Email:</strong> ${emailInput.value || ''}</p>
        <p><strong>GitHub:</strong> ${githubInput.value || ''}</p>
        ${portfolioInput.value ? `<p><strong>Portfolio:</strong> ${portfolioInput.value}</p>` : ''}

        <h2>Experience</h2>
        <p>${experienceInput.value.replace(/\n/g, '<br>') || 'Your Experience'}</p>

        <h2>Education</h2>
        ${[...educationContainer.querySelectorAll('.education-entry')].map(entry => {
            const inputs = entry.querySelectorAll('input');
            return `<p>${inputs[0].value || ''} - ${inputs[1].value || ''} (${inputs[2].value || ''} to ${inputs[3].value || ''}, Aggregate: ${inputs[4].value || ''})</p>`;
        }).join('')}

        <h2>Projects</h2>
        ${[...projectsContainer.querySelectorAll('.project-entry')].map(entry => {
            const title = entry.querySelector('input').value;
            const description = entry.querySelector('textarea').value;
            return `<p><strong>${title}</strong><br>${description.replace(/\n/g, '<br>')}</p>`;
        }).join('')}

        <h2>Extra-Curricular Activities</h2>
        ${[...activitiesContainer.querySelectorAll('.activity-entry')].map(entry => {
            const description = entry.querySelector('textarea').value;
            return `<p>${description.replace(/\n/g, '<br>')}</p>`;
        }).join('')}

        <h2>Skills</h2>
        <ul>
            ${[...skillsContainer.querySelectorAll('.skill-entry input')].map(input => `<li>${input.value.trim()}</li>`).join('')}
        </ul>

        <h2>Certifications</h2>
        <ul>
            ${certificationsInput.value.split(',').map(cert => `<li>${cert.trim()}</li>`).join('')}
        </ul>
    `;
}

[nameInput, mobileInput, linkedinInput, emailInput, githubInput, portfolioInput, experienceInput, certificationsInput].forEach(input => {
    input.addEventListener('input', updateResume);
});

educationContainer.addEventListener('input', updateResume);
projectsContainer.addEventListener('input', updateResume);
activitiesContainer.addEventListener('input', updateResume);
skillsContainer.addEventListener('input', updateResume);
