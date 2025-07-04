
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

async function fetchAndSortProjects() {
    const repos = await fetchAllRepos(username);

    const projectsByYear = {};

    repos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); // Sort by creation date

    repos.forEach(repo => {
        const folderName = Object.keys(repoMapping).find(
            key => repoMapping[key] === repo.name
        );

        const createdDate = new Date(repo.created_at).toLocaleDateString();
        const lastEdited = new Date(repo.updated_at).toLocaleDateString();
        const year = new Date(repo.created_at).getFullYear();

        if (!projectsByYear[year]) {
            projectsByYear[year] = [];
        }

        // Add project card for repos with a corresponding folder
        if (folderName) {
            projectsByYear[year].push({
                folderName,
                repoName: repo.name,
                createdDate,
                lastEdited,
                description: repo.description || "No description available.",
                thumbnail: `thumbnails/${folderName}.png`,
                link: `${folderName}/index.html`,
                githubLink: repo.html_url
            });
        } else {
            // Add project card for repos without a corresponding folder
            projectsByYear[year].push({
                repoName: repo.name,
                createdDate,
                lastEdited,
                description: repo.description || "No description available.",
                thumbnail: "icons/github.png", // Default thumbnail for GitHub-only projects
                githubLink: repo.html_url
            });
        }
    });

    renderProjects(projectsByYear);
}

function renderProjects(projectsByYear) {
    const container = document.getElementById("projects-container");

    Object.keys(projectsByYear).sort((a, b) => b - a).forEach(year => {
        const yearSection = document.createElement("div");
        yearSection.classList.add("year-section");

        const header = document.createElement("div");
        header.classList.add("collapsible");
        header.innerHTML = `
            <span>${year}</span>
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
        projectList.classList.add("project-list", "hidden"); // Add 'hidden' class to initialize as collapsed

        projectsByYear[year].forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            // Include iframe thumbnail for valid projects with a link
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

        yearSection.appendChild(header);
        yearSection.appendChild(projectList);
        container.appendChild(yearSection);
    });
}

fetchAndSortProjects();

async function fetchLatestYouTubeVideo() {
    const youtubeVideoContainer = document.getElementById('youtube-video-container');
    if (!youtubeVideoContainer) return;

    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?user=zomarea225');
        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
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
