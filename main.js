// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Sample Data (Replace/add as needed)
  const projects = [
    {
      title: "Smart Irrigation System",
      description: "An IoT project using NodeMCU, sensors and cloud dashboard to automate irrigation.",
      category: "iot",
      technologies: ["NodeMCU", "DHT11", "Thingspeak", "Relay", "Pump"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Face Recognition Attendance",
      description: "A Raspberry Pi + Python-based system to log attendance using facial recognition.",
      category: "ai-ml",
      technologies: ["OpenCV", "Python", "Raspberry Pi", "Dlib"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Portfolio Website",
      description: "My personal website to showcase projects, skills and contact information.",
      category: "web",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      demoLink: "#",
      codeLink: "#"
    }
  ];

  const skills = [
    { name: "Python", level: "Expert" },
    { name: "C", level: "Intermediate" },
    { name: "HTML/CSS", level: "Expert" },
    { name: "JavaScript", level: "Intermediate" },
    { name: "React", level: "Beginner" },
    { name: "DevOps Basics", level: "Intermediate" }
  ];

  const languages = ["English", "Kannada", "Hindi"];
  const softSkills = ["Leadership", "Communication", "Teamwork", "Problem Solving"];

  const education = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "CICMS, Bengaluru",
      year: "2022 – 2025",
      grade: "8.7 CGPA"
    },
    {
      degree: "PUC (PCMC)",
      institution: "St.Joseph's Pre-University College",
      year: "2020 – 2022",
    
    },
    {
      degree: "SSLC",
      institution: "Sacred Heart Boy's School",
      year: "2019 – 2020",
      grade: "70.64%"
    }
  ];

  const certifications = [
    "Google Cloud Career Readiness Program",
    "AI-ML Virtual Internship by AWS & EduSkills",
    "AWS Academy Graduate - Cloud Foundations"
  ];

  const awards = [
    "Best Project Award – Smart Irrigation System (SJU Tech Fest)",
    "Dean’s List – Academic Excellence (2023)"
  ];

  // Render Projects
  const projectGrid = document.querySelector(".projects-grid");
  if (projectGrid) {
    projectGrid.innerHTML = "";
    projects.forEach(project => {
      const div = document.createElement("div");
      div.className = "project-card";
      div.setAttribute("data-category", project.category);
      div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${project.demoLink}" target="_blank">Demo</a>
          <a href="${project.codeLink}" target="_blank">Code</a>
        </div>
      `;
      projectGrid.appendChild(div);
    });
  }

  // Filter Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn =>
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      document.querySelectorAll(".project-card").forEach(card => {
        card.style.display =
          filter === "all" || card.getAttribute("data-category") === filter ? "block" : "none";
      });
    })
  );

  // Render Skills
  const skillsGrid = document.querySelector(".skills-grid");
  if (skillsGrid) {
    skillsGrid.innerHTML = "";
    skills.forEach(skill => {
      const div = document.createElement("div");
      div.className = "skill";
      div.innerHTML = `
        <h4>${skill.name}</h4>
        <p>${skill.level}</p>
      `;
      skillsGrid.appendChild(div);
    });
  }

  // Render Languages & Soft Skills
  const languageList = document.querySelector(".language-list");
  const softSkillList = document.querySelector(".soft-skill-list");

  if (languageList) {
    languageList.innerHTML = languages.map(lang => `<li>${lang}</li>`).join("");
  }

  if (softSkillList) {
    softSkillList.innerHTML = softSkills.map(skill => `<li>${skill}</li>`).join("");
  }

  // Render Education Timeline
  const timeline = document.querySelector(".timeline");
  if (timeline) {
    timeline.innerHTML = "";
    education.forEach(edu => {
      const div = document.createElement("div");
      div.className = "timeline-item";
      div.innerHTML = `
        <h4>${edu.degree}</h4>
        <p><strong>${edu.institution}</strong></p>
        <p>${edu.year}</p>
        <p>Grade: ${edu.grade}</p>
      `;
      timeline.appendChild(div);
    });
  }

  // Render Certifications
  const certList = document.querySelector(".certifications-list");
  if (certList) {
    certList.innerHTML = certifications.map(cert => `<li>${cert}</li>`).join("");
  }

  // Render Awards
  const awardList = document.querySelector(".awards-list");
  if (awardList) {
    awardList.innerHTML = awards.map(award => `<li>${award}</li>`).join("");
  }

  // Update footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Modal logic (optional)
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalDesc = document.getElementById("modalProjectDescription");
  const modalTags = document.getElementById("modalProjectTechnologies");
  const modalDemo = document.getElementById("modalDemoLink");
  const modalCode = document.getElementById("modalCodeLink");
  const closeModal = document.querySelector(".close-button");

  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      const proj = projects[index];
      modalTitle.textContent = proj.title;
      modalDesc.textContent = proj.description;
      modalTags.innerHTML = proj.technologies.map(tech => `<span>${tech}</span>`).join("");
      modalDemo.href = proj.demoLink;
      modalCode.href = proj.codeLink;
      modal.style.display = "block";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
