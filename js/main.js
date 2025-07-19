
const repoMapping = {
    "10print": "10PRINT-JS",
    "Bomb%20Dodger": "Bomb-Dodger",
    "bouncyball": "Bouncy-Ball",
    "BrainFuck%20Interpreter": "BrainFuck-Compiler", // Corrected mapping
    "BrainFuck": "BrainFuck-Interpreter", // Corrected mapping
    "charitygame": "Charity-Game",
    "chess_stream": "Chess",
    "circlepatterns": "CirclePatterns",
    "circles": "No-Overlap-Circles",
    "Clicker": "Button-Clicker",
    "Drawing%20App": "Drawing-Application",
    "fractaltree": "Fractal-Tree",
    "GOL": "GameOfLife",
    "particleemission": "Particle-Emitter",
    "pattern_generation": "Pattern-Generation",
    "Pong": "Pong",
    "rainsimulation": "Rain-Simulation",
    "randomwalk": "Random-Walk",
    "snake": "Snake",
    "spiral": "Spiral",
    "WOTD-App": "WordOfTheDay",
    "pixel_to_cm": "PixelToCM",
    "primefinder": "prime-number-generator",
    "rosepatterns": "RosePatterns"
};

// Define project categories
const projectCategories = {
    "Systems": [
        "C_File_Organizer",
        "Go_File_Organizer",
        "Python_File_Organizer",
        "KeyValue_Store",
        "Simple_VCS",
        "Basic_Memory_Allocator",
        "Simple_FileSystem",
        "Custom_Shell"
    ],
    "DSA": [
        "Custom_Data_Structures",
        "CPU_Scheduler_Simulation"
    ],
    "Web": [
        // Add your web projects here if any
    ],
    "CLI": [
        "CLI_Line_Counter",
        "Markdown_Converter_V2",
        "File_Renamer",
        "Weather_App",
        "System_Monitor",
        "Image_Editor"
    ],
    "Financial": [
        "Black_Scholes_Option_Pricer",
        "Monte_Carlo_Option_Pricer",
        "Portfolio_Optimizer",
        "Order_Book_Simulation",
        "Financial_Data_Scraper",
        "Trading_Strategy_SMA"
    ],
    "AI": [
        "Image_Classifier",
        "Recommendation_System",
        "Spam_Classifier",
        "Digit_Recognizer",
        "Neural_Network_Scratch",
        "Text_Summarizer",
        "Policy_Gradient_RL",
        "Pathfinding_AI",
        "Basic_Object_Detection",
        "Markov_Text_Generator"
    ],
    "Games": [
        "Conways_Game_of_Life",
        "TicTacToe_AI",
        "Snake_Game",
        "Text_Adventure_Game_V2"
    ],
    "Cutting Edge": [
        "Federated_Learning_Sim",
        "Quantum_Computing_Sim",
        "Simple_Blockchain",
        "Edge_Computing_Sim",
        "XAI_LIME_Concept",
        "Simple_GAN_Concept",
        "Simple_GNN_Concept",
        "XAI_SHAP_Concept",
        "Digital_Twin_Sim",
        "Time_Series_Anomaly_Detection"
    ]
};


const username = "kianacaster";


async function fetchAllRepos(username) {
    let page = 1;
    const perPage = 100; // Maximum allowed by GitHub API
    let allRepos = [];
    let hasMore = true;

    while (hasMore) {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
        const repos = await response.json();

        if (repos.length > 0) {
            allRepos = allRepos.concat(repos);
            page++;
        } else {
            hasMore = false;
        }
    }

    return allRepos;
}

async function fetchAndCategorizeProjects() {
    const repos = await fetchAllRepos(username);

    const categorizedProjects = {};
    const uncategorizedProjects = [];

    // Initialize categories
    for (const category in projectCategories) {
        categorizedProjects[category] = [];
    }

    repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date (newest first)

    repos.forEach(repo => {
        const createdDate = new Date(repo.created_at).toLocaleDateString();
        const lastEdited = new Date(repo.updated_at).toLocaleDateString();

        let assignedCategory = null;
        for (const category in projectCategories) {
            if (projectCategories[category].includes(repo.name)) {
                assignedCategory = category;
                break;
            }
        }

        const projectData = {
            repoName: repo.name,
            createdDate,
            lastEdited,
            description: repo.description || "No description available.",
            githubLink: repo.html_url
        };

        // Check if a local folder exists for the repo to determine if it has a live site
        const folderName = Object.keys(repoMapping).find(key => repoMapping[key] === repo.name);
        if (folderName) {
            projectData.link = `${folderName}/index.html`; // Assuming index.html for local projects
            projectData.thumbnail = `thumbnails/${folderName}.png`; // Assuming thumbnail exists
        } else {
            projectData.thumbnail = "icons/github.png"; // Default thumbnail for GitHub-only projects
        }


        if (assignedCategory) {
            categorizedProjects[assignedCategory].push(projectData);
        } else {
            uncategorizedProjects.push(projectData);
        }
    });

    renderProjects(categorizedProjects, uncategorizedProjects);
}

function renderProjects(categorizedProjects, uncategorizedProjects) {
    const container = document.getElementById("projects-container");
    container.innerHTML = ''; // Clear existing content

    // Render categorized projects
    for (const category in projectCategories) { // Iterate in defined order
        if (categorizedProjects[category].length > 0) {
            const categorySection = document.createElement("div");
            categorySection.classList.add("category-section");

            const header = document.createElement("div");
            header.classList.add("collapsible");
            header.innerHTML = `
                <span>${category}</span>
                <span class="arrow">&#9660;</span>
            `;
            header.addEventListener("click", () => {
                const projectList = header.nextElementSibling;
                const arrow = header.querySelector(".arrow");

                if (projectList && arrow) {
                    projectList.classList.toggle("hidden");
                    arrow.classList.toggle("rotate");
                }
            });

            const projectList = document.createElement("div");
            projectList.classList.add("project-list", "hidden"); // Start collapsed

            categorizedProjects[category].forEach(project => {
                const projectCard = document.createElement("div");
                projectCard.classList.add("project-card");

                const iframeThumbnail = project.link
                    ? `<iframe src="${project.link}" title="${project.repoName} Live Preview" class="project-iframe"></iframe>`
                    : `<img src="${project.thumbnail}" alt="${project.repoName} Thumbnail" class="project-thumbnail">`;

                projectCard.innerHTML = `
                    ${iframeThumbnail}
                    <h3>${project.repoName}</h3>
                    <p>${project.description}</p>
                    <p class="project-date">Created: ${project.createdDate}</p>
                    <p class="project-date">Last edited: ${project.lastEdited}</p>
                    ${project.link ? `<a href="${project.link}" target="_blank">View Site</a>` : ""}
                    <a href="${project.githubLink}" target="_blank" class="github-link">GitHub Repo</a>
                `;
                projectList.appendChild(projectCard);
            });

            categorySection.appendChild(header);
            categorySection.appendChild(projectList);
            container.appendChild(categorySection);
        }
    }

    // Render uncategorized projects
    if (uncategorizedProjects.length > 0) {
        const uncategorizedSection = document.createElement("div");
        uncategorizedSection.classList.add("category-section");

        const header = document.createElement("div");
        header.classList.add("collapsible");
        header.innerHTML = `
            <span>Uncategorized</span>
            <span class="arrow">&#9660;</span>
        `;
        header.addEventListener("click", () => {
            const projectList = header.nextElementSibling;
            const arrow = header.querySelector(".arrow");

            if (projectList && arrow) {
                projectList.classList.toggle("hidden");
                arrow.classList.toggle("rotate");
            }
        });

        const projectList = document.createElement("div");
        projectList.classList.add("project-list", "hidden"); // Start collapsed

        uncategorizedProjects.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            const iframeThumbnail = project.link
                ? `<iframe src="${project.link}" title="${project.repoName} Live Preview" class="project-iframe"></iframe>`
                : `<img src="${project.thumbnail}" alt="${project.repoName} Thumbnail" class="project-thumbnail">`;

            projectCard.innerHTML = `
                ${iframeThumbnail}
                <h3>${project.repoName}</h3>
                <p>${project.description}</p>
                <p class="project-date">Created: ${project.createdDate}</p>
                <p class="project-date">Last edited: ${project.lastEdited}</p>
                ${project.link ? `<a href="${project.link}" target="_blank">View Site</a>` : ""}
                <a href="${project.githubLink}" target="_blank" class="github-link">GitHub Repo</a>
            `;
            projectList.appendChild(projectCard);
        });

        uncategorizedSection.appendChild(header);
        uncategorizedSection.appendChild(projectList);
        container.appendChild(uncategorizedSection);
    }
}

fetchAndCategorizeProjects();

async function fetchLatestYouTubeVideo() {
    const youtubeVideoContainer = document.getElementById('youtube-video-container');
    if (!youtubeVideoContainer) return;

    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?user=zomarea225');
        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
            const latestVideo = data.items[0]; // Get the first item
            const videoId = latestVideo.guid.split(':').pop();
            const videoTitle = latestVideo.title;
            const videoLink = latestVideo.link;

            const iframe = document.createElement('iframe');
            iframe.width = "560";
            iframe.height = "315";
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.title = videoTitle;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            const videoTitleElement = document.createElement('h3');
            videoTitleElement.textContent = videoTitle;
            videoTitleElement.style.marginTop = '1rem';
            videoTitleElement.style.fontSize = '1.5rem';
            videoTitleElement.style.color = '#333';

            const videoLinkElement = document.createElement('a');
            videoLinkElement.href = videoLink;
            videoLinkElement.textContent = 'Watch on YouTube';
            videoLinkElement.target = '_blank';
            videoLinkElement.rel = 'noopener noreferrer';
            videoLinkElement.style.color = '#007bff';
            videoLinkElement.style.textDecoration = 'none';
            videoLinkElement.style.marginTop = '0.5rem';
            videoLinkElement.style.display = 'block';

            youtubeVideoContainer.appendChild(iframe);
            youtubeVideoContainer.appendChild(videoTitleElement);
            youtubeVideoContainer.appendChild(videoLinkElement);
        } else {
            youtubeVideoContainer.innerHTML = '<p>Could not fetch latest video.</p>';
        }
    } catch (error) {
        console.error('Error fetching YouTube video:', error);
        youtubeVideoContainer.innerHTML = `<p>Error loading video: ${error.message}. This might be a CORS issue if viewing locally.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => observer.observe(element));

    fetchLatestYouTubeVideo();
});
