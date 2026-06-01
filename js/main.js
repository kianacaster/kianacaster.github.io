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
