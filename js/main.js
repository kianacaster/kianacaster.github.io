async function projects() {
    print('Here are some of my projects:');
    try {
        const response = await fetch('https://api.github.com/users/kianacaster/repos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        projects.forEach(project => {
            const createdAt = new Date(project.created_at);
            const date = `${(createdAt.getMonth() + 1).toString().padStart(2, '0')}/${createdAt.getFullYear()}`;
            print(`- <a href="${project.html_url}" target="_blank">${project.name}</a>: ${project.description} - ${date}`);
        });
    } catch (error) {
        print(`Error fetching projects: ${error.message}`);
    }
}

const output = document.getElementById('output');
const input = document.getElementById('input');

const commands = {
    help: 'Lists all available commands.',
    about: 'Displays information about me.',
    projects: 'Shows my projects.',
    contact: 'Displays my contact information.',
    clear: 'Clears the terminal screen.'
};

const welcomeMessage = "\nWelcome to my portfolio!\nType 'help' to see a list of available commands.\n";

function print(message) {
    const p = document.createElement('p');
    p.innerHTML = message;
    output.appendChild(p);
}

function clearTerminal() {
    output.innerHTML = '';
}

async function handleCommand(command) {
    print(`<span class=\"prompt\">></span> ${command}`);
    switch (command.toLowerCase()) {
        case 'help':
            print(Object.entries(commands).map(([key, value]) => `${key}: ${value}`).join('\n'));
            break;
        case 'about':
            print(`
My journey into computer science began in year four when my brother introduced me to the JavaScript <code>alert()</code> function in an online code sandbox. We spent hours making silly messages pop up on our grandad's laptop, and from that moment, I was hooked. The questions "How does this work?" and "What else can I make it do?" have been constant companions ever since.

As a gaming enthusiast, I naturally gravitated toward creating browser-based games like Pong and Snake, which taught me the fundamentals of programming and game logic. Over time, I transitioned from using libraries like 'p5.js' to writing native JavaScript, exploring graphical projects and mathematical visualizations. 

I am currently pursuing a degree in Computing Science at the University of Glasgow, where I am also studying Mathematics and Statistics. My academic journey has been shaped by a strong foundation in STEM subjects, including my prior GCSE level education at St. Peter's School in York, followed by Access to Higher Education courses in Maths and Physics provided by the University of Glasgow. Alongside my studies, I enjoy exploring new technologies, solving coding challenges, and working on creative projects that combine my love for problem-solving with my passion for design and innovation.
`);
            break;
        case 'projects':
            await projects();
            break;
        case 'contact':
            print(`
You can reach me at:
- GitHub: <a href="https://github.com/kianacaster" target="_blank">kianacaster</a>
- Email: <a href="mailto:kianacaster@gmail.com">kianacaster@gmail.com</a>
`);
            break;
        case 'clear':
            clearTerminal();
            print(welcomeMessage);
            break;
        default:
            print(`Command not found: ${command}. Type 'help' for a list of commands.`);
    }
    input.value = '';
    terminal.scrollTop = terminal.scrollHeight;
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleCommand(input.value);
    }
});

print(welcomeMessage);