const url = "https://portfolio-api-430617.el.r.appspot.com"
document.addEventListener('DOMContentLoaded', () => {
    // Handle Bio Form Submission
    document.getElementById('bio-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const bioData = {
            name: document.getElementById('bio-name').value,
            roles: document.getElementById('bio-roles').value.split(',').map(role => role.trim()),
            description: document.getElementById('bio-description').value,
            github: document.getElementById('bio-github').value,
            resume: document.getElementById('bio-resume').value,
            linkedin: document.getElementById('bio-linkedin').value
        };
        try {
            const response = await fetch(url+'/api/bio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bioData)
            });
            const result = await response.json();
            console.log('Bio inserted:', result);
            alert('Bio inserted successfully');
        } catch (error) {
            console.error('Error inserting bio:', error);
        }
    });

    // Handle Education Form Submission
    document.getElementById('education-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const educationData = {
            school: document.getElementById('education-school').value,
            degree: document.getElementById('education-degree').value,
            img: document.getElementById('education-img').value,
            grade: document.getElementById('education-grade').value,
            date: document.getElementById('education-date').value,
            desc: document.getElementById('education-desc').value
        };
        try {
            const response = await fetch(url+'/api/education', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(educationData)
            });
            const result = await response.json();
            console.log('Education inserted:', result);
            alert('Education inserted successfully');
            document.getElementById("education-form").reset()
        } catch (error) {
            console.error('Error inserting education:', error);
        }
    });

    // Handle Project Form Submission
    document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const projectData = {
        title: document.getElementById('project-title').value,
        date: document.getElementById('project-date').value,
        description: document.getElementById('project-description').value,
        image: document.getElementById('project-image').value,
        tags: document.getElementById('project-tags').value.split(',').map(tag => tag.trim()),
        category: document.getElementById('project-category').value,
        github: document.getElementById('project-github').value,
        webapp: document.getElementById('project-webapp').value
    };

    console.log('Project Data:', projectData); // Log the data being sent

    try {
        const response = await fetch(url+'/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Project inserted:', result);
        alert('Project inserted successfully');
        document.getElementById("project-form").reset()
    } catch (error) {
        console.error('Error inserting project:', error);
    }
});

    // Handle Experience Form Submission
    document.getElementById('experience-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const experienceData = {
            img: document.getElementById('experience-img').value,
            role: document.getElementById('experience-role').value,
            company: document.getElementById('experience-company').value,
            date: document.getElementById('experience-date').value,
            desc: document.getElementById('experience-desc').value,
            skills: document.getElementById('experience-skills').value.split(',').map(skill => skill.trim())
        };
        try {
            const response = await fetch(url+'/api/experiences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(experienceData)
            });
            const result = await response.json();
            console.log('Experience inserted:', result);
            alert('Experience inserted successfully');
        } catch (error) {
            console.error('Error inserting experience:', error);
        }
    });

    // Handle Skills Form Submission

    document.getElementById('skills-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('skills-title').value;
    if(['Frontend', 'Backend', 'Android', 'Others'].includes(title)){
    const skillEntries = document.querySelectorAll('.skill-entry');
    const skills = Array.from(skillEntries).map(entry => ({
        name: entry.querySelector('.skill-name').value,
        image: entry.querySelector('.skill-image').value
    }));

    const skillsData = {
        title,
        skills
    };

    try {
        const response = await fetch(url+'/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(skillsData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Skills inserted:', result);
            alert('Skills inserted successfully');
            document.getElementById('skills-form').reset()

            // Fetch and display updated skills
            fetchAndDisplaySkills();
        } else {
            const error = await response.json();
            console.error('Error inserting skills:', error);
            alert('Error inserting skills');
        }
    } catch (error) {
        console.error('Error inserting skills:', error);
        alert('Error inserting skills');
    }}else{
        alert("Please Use Valid Skill Title");
    }
});

document.getElementById('add-skill').addEventListener('click', () => {
    const container = document.getElementById('skills-container');
    const skillEntry = document.createElement('div');
    skillEntry.classList.add('skill-entry');
    skillEntry.innerHTML = `
        <input type="text" class="skill-name" placeholder="Skill Name" required>
        <input type="text" class="skill-image" placeholder="Skill Image URL" required>
    `;
    container.appendChild(skillEntry);
});
async function fetchAndDisplaySkills() {
    try {
        const response = await fetch(url+'/api/skills');
        if (response.ok) {
            const data = await response.json();
            updateSkillsDisplay(data);
        } else {
            console.error('Error fetching skills:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching skills:', error);
    }
}

function updateSkillsDisplay(data) {
    const container = document.getElementById('skills-display');
    container.innerHTML = '';

    data.forEach(doc => {
        doc.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            const title = document.createElement('h3');
            title.textContent = category.title;
            categoryDiv.appendChild(title);


            let skillNames = [];

            category.skills.forEach((skill, i)=> {
                skillNames += `${i+1} - ${skill.name}, `;
            });
                const skillDiv = document.createElement('div');
                skillDiv.classList.add('skill');
                const name = document.createElement('p');
                name.textContent = skillNames;

                skillDiv.appendChild(name);
                categoryDiv.appendChild(skillDiv);


            container.appendChild(categoryDiv);
        });
    });
}

fetchAndDisplaySkills();


})
document.addEventListener('DOMContentLoaded', () => {
    // const correctPasswordHash = CryptoJS.SHA256('pass').toString();
    const Hash ="96b154af9682d09f937cb8a059648ddd0eb0ecce9e3c404963b7d6f1f370505a";
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password');
    const protectedContent = document.getElementById('protected-content');
    const passwordContainer = document.getElementById('password-container');

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enteredPasswordHash = CryptoJS.SHA256(passwordInput.value).toString();

        if (enteredPasswordHash === Hash) {
            protectedContent.style.display = 'block';
            passwordContainer.style.display = 'none';
        } else {
            alert('Incorrect password');
        }

        passwordInput.value = '';
    });
});
