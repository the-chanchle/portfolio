const RESUME = {
    header: {
        name: "Omkar Chanchle",
        contact: [
            "+91-8758514393",
            "<a href=\"mailto:chanchleomkar97@gmail.com\" class=\"text-blue-600 dark:text-blue-400 hover:underline\">chanchleomkar97@gmail.com</a>",
            "Surat, Gujarat, India, 394210"
        ],
        links: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/chanchleomkar/" },
            { label: "GitHub", url: "https://github.com/the-chanchle" },
            { label: "X", url: "https://x.com/chanchleomkar7" }
        ]
    },
    summary: "PHP / Laravel Developer with 5 years of experience delivering production-grade web applications. Strong ownership across backend development, APIs, databases, and server infrastructure. Experience operating independently as a founder and consultant, owning systems end to end.",
    skills: [
        { category: "Languages", items: "PHP, JavaScript, SQL, HTML, CSS" },
        { category: "Databases", items: "MySQL, PostgreSQL, MongoDB" },
        { category: "Frameworks", items: "Laravel, CodeIgniter, Express.js, Vue.js, Livewire" },
        { category: "Libraries", items: "jQuery, Alpine.js, Tailwind CSS" },
        { category: "Tools", items: "Git, GitHub, Docker, Linux, Ubuntu, Nginx, Apache, Postman" }
    ],
    experience: [
        { role: "Founder", company: "<a href=\"https://theflynnlabs.com/\" target=\"_blank\" class=\"text-blue-600 dark:text-blue-400 hover:underline\">The Flynn Labs</a>", duration: "Jul 2025 - Present", location: "Surat, Gujarat" },
        { role: "PHP Developer", company: "Bytespark Digital", duration: "Jun 2025 - Jun 2025", location: "Ahmedabad" },
        { role: "PHP / Laravel Dev", company: "Vasundhara Info", duration: "Aug 2024 - Apr 2025", location: "Surat" },
        { role: "PHP / Pimcore Dev", company: "Kash Info Sol", duration: "Oct 2023 - Jun 2024", location: "Surat" },
        { role: "PHP / Node Dev", company: "Elance Solution", duration: "Jan 2021 - Sep 2023", location: "Surat" }
    ],
    projects: [
        { name: "Anatomy Learning Platform", tech: "Laravel, MySQL", desc: "Designed backend system for medical students. Built admin APIs." }
    ]
};

// Component Utilities
const createRetroBox = (title, content) => {
    const section = document.createElement('section');
    section.className = 'mb-8 retro-border bg-white dark:bg-transparent p-4 md:p-6';

    if (title) {
        const titleEl = document.createElement('h2');
        titleEl.className = 'text-xl font-bold uppercase mb-4 retro-line-border pb-2 inline-block';
        titleEl.textContent = title;
        section.appendChild(titleEl);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'leading-relaxed';
    if (Array.isArray(content)) {
        content.forEach(line => {
            const p = document.createElement('p');
            p.innerHTML = line;
            contentDiv.appendChild(p);
        });
    } else {
        contentDiv.innerHTML = content;
    }
    section.appendChild(contentDiv);
    return section;
};

const createRetroTable = (title, data, columns) => {
    const section = document.createElement('section');
    section.className = 'mb-8';

    if (title) {
        const titleEl = document.createElement('h2');
        titleEl.className = 'text-xl font-bold uppercase mb-4 retro-line-border pb-2 inline-block';
        titleEl.textContent = title;
        section.appendChild(titleEl);
    }

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'overflow-x-auto';

    const table = document.createElement('table');
    table.className = 'w-full text-left border-collapse retro-table-border';

    // Header
    const thead = document.createElement('thead');
    thead.className = 'bg-black text-white dark:bg-[#00ff41] dark:text-black';
    const headerRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.className = 'p-2 border border-black dark:border-[#00ff41] uppercase text-sm';
        th.textContent = col.header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            td.className = 'p-2 border border-black dark:border-[#00ff41] text-sm';
            td.innerHTML = row[col.key] || '';
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    tableWrapper.appendChild(table);
    section.appendChild(tableWrapper);
    return section;
};

// Render Function
function renderPortfolio() {
    const container = document.getElementById('resume-container');
    if (!container) return;
    container.innerHTML = ''; // Clear container

    // 1. Name as H1
    const nameHeader = document.createElement('h1');
    nameHeader.textContent = RESUME.header.name;
    nameHeader.className = 'text-3xl md:text-5xl font-bold text-center uppercase mb-8 retro-line-border pb-4 w-full';
    container.appendChild(nameHeader);

    // 2. Contact Info
    const contactLinks = RESUME.header.links.map(l => `<a href="${l.url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline mx-2">${l.label}</a>`).join('|');
    const contactContent = [
        `<div class="flex flex-wrap justify-center gap-2 mb-2 text-sm md:text-base">
            ${RESUME.header.contact.join(' <span class="hidden md:inline">|</span> ')}
        </div>`,
        `<div class="flex justify-center flex-wrap">
            ${contactLinks}
        </div>`
    ];
    container.appendChild(createRetroBox("Contact Info", contactContent));

    // 3. Summary
    container.appendChild(createRetroBox("Summary", RESUME.summary));

    // 4. Skills
    container.appendChild(createRetroTable("Skills", RESUME.skills, [
        { header: 'Category', key: 'category' },
        { header: 'Skills', key: 'items' }
    ]));

    // 5. Experience
    container.appendChild(createRetroTable("Experience", RESUME.experience, [
        { header: 'Role', key: 'role' },
        { header: 'Company', key: 'company' },
        { header: 'Period', key: 'duration' }
    ]));

    // 6. Projects
    const projectContent = `
        <div class="mb-2"><strong>${RESUME.projects[0].name}</strong></div>
        <div class="mb-1 text-sm italic">Tech: ${RESUME.projects[0].tech}</div>
        <div class="text-sm">${RESUME.projects[0].desc}</div>
    `;
    container.appendChild(createRetroBox("Latest Project", projectContent));

    // Footer
    const footer = document.createElement('div');
    footer.className = 'text-center text-xs mt-8 pt-4 border-t border-solid border-black dark:border-[#00ff41] opacity-70';
    footer.innerHTML = `<p>© ${new Date().getFullYear()} ${RESUME.header.name}</p>`;
    container.appendChild(footer);
}

// Night Mode Toggle
function initNightMode() {
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = document.getElementById('theme-toggle-icon');
    const toggleText = document.getElementById('theme-toggle-text');
    if (!toggleBtn) return;

    const updateToggleContent = (isDark) => {
        if (toggleText) toggleText.textContent = isDark ? "Light Mode" : "Night Mode";
        if (toggleIcon) toggleIcon.textContent = isDark ? "☀️" : "🌙";
    };

    // Check for saved preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateToggleContent(true);
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            updateToggleContent(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            updateToggleContent(true);
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initNightMode();
});
