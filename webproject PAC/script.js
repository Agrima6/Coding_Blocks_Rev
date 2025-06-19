// Sample JSON data for team members
const teamMembers = [
    {
        name: "President",
        image: "team (1).jpg",
        linkedin: "#",
        instagram: "#"
    },
    {
        name: "Vice-President",
        image: "team (2).jpg",
        linkedin: "#",
        instagram: "#"
    },
    {
        name: "Team Lead",
        image: "team (3).jpg",
        linkedin: "#",
        instagram: "#"
    },
    {
        name: "Operations Head",
        image: "team (4).jpg",
        linkedin: "#",
        instagram: "#"
    },
    {
        name: "Technical Team",
        image: "team (5).jpg",
        linkedin: "#",
        instagram: "#"
    },
    {
        name: "Social Media Team",
        image: "team (6).jpg",
        linkedin: "#",
        instagram: "#"
    },
    {
        name: "Ideation Team",
        image: "team (7).jpg",
        linkedin: "#",
        instagram: "#"
    },
    {
        name: "Treasurer",
        image: "team (8).jpg",
        linkedin: "#",
        instagram: "#"
    }
];

// Function to render team members dynamically
function renderTeamMembers() {
    const teamGrid = document.querySelector('.team-grid');
    teamMembers.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add('team-member');

        memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <div class="social-icons">
                <a href="${member.linkedin}" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="${member.instagram}" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            </div>
        `;
        teamGrid.appendChild(memberElement);
    });
}

// Call the function to render team members
renderTeamMembers();
