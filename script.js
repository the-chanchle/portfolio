const RESUME = {
    header: {
        name: "Omkar Chanchle",
        contact: [
            "+91-8758514393",
            "chanchleomkar97@gmail.com",
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
        { role: "Founder", company: "The Flynn Labs", duration: "Jul 2025 - Present", location: "Surat, Gujarat" },
        { role: "PHP Developer", company: "Bytespark Digital", duration: "Jun 2025 - Jun 2025", location: "Ahmedabad" },
        { role: "PHP / Laravel Dev", company: "Vasundhara Info", duration: "Aug 2024 - Apr 2025", location: "Surat" },
        { role: "PHP / Pimcore Dev", company: "Kash Info Sol", duration: "Oct 2023 - Jun 2024", location: "Surat" },
        { role: "PHP / Node Dev", company: "Elance Solution", duration: "Jan 2021 - Sep 2023", location: "Surat" }
    ],
    projects: [
        { name: "Anatomy Learning Platform", tech: "Laravel, MySQL", desc: "Designed backend system for medical students. Built admin APIs." }
    ]
};

// ASCII Utilities
const renderAsciiTable = (data, columns) => {
    if (!data || data.length === 0) return '';

    const colWidths = columns.map(col => {
        let max = col.header.length;
        data.forEach(row => {
            const val = String(row[col.key] || '');
            if (val.length > max) max = val.length;
        });
        return (col.width && col.width > max) ? col.width : max + 2;
    });

    const padCell = (text, width) => {
        const content = ' ' + text + ' ';
        const space = width - content.length;
        return content + ' '.repeat(Math.max(0, space));
    };

    const createSeparator = (joints = '+', dash = '-') => {
        let line = joints;
        colWidths.forEach(w => {
            line += dash.repeat(w) + joints;
        });
        return line;
    };

    const rows = [];
    rows.push(createSeparator());

    let headerRow = '|';
    columns.forEach((col, i) => {
        headerRow += padCell(col.header, colWidths[i]) + '|';
    });
    rows.push(headerRow);
    rows.push(createSeparator());

    data.forEach(row => {
        let dataRow = '|';
        columns.forEach((col, i) => {
            dataRow += padCell(String(row[col.key] || ''), colWidths[i]) + '|';
        });
        rows.push(dataRow);
        rows.push(createSeparator());
    });

    return rows.join('\n');
};

const renderAsciiBox = (title, content, width = 80) => {
    const horizontalLine = '+' + '-'.repeat(width - 2) + '+';
    const emptyLine = '|' + ' '.repeat(width - 2) + '|';

    // Helper to get length ignoring HTML tags
    const getVisibleLength = (str) => str.replace(/<[^>]*>/g, '').length;

    const centerText = (text) => {
        const visibleLen = getVisibleLength(text);
        const space = width - 6 - visibleLen;
        const left = Math.floor(space / 2);
        const right = space - left;
        return '|  ' + ' '.repeat(Math.max(0, left)) + text + ' '.repeat(Math.max(0, right)) + '  |';
    };

    const leftText = (text) => {
        const visibleLen = getVisibleLength(text);
        const space = width - 6 - visibleLen;
        return '|  ' + text + ' '.repeat(Math.max(0, space)) + '  |';
    }

    const rows = [];
    rows.push(horizontalLine);

    if (title) {
        rows.push(centerText(title.toUpperCase()));
        rows.push(horizontalLine);
    } else {
        rows.push(emptyLine);
    }

    const lines = Array.isArray(content) ? content : content.split('\n');
    lines.forEach(line => {
        const maxContentWidth = width - 6;
        if (getVisibleLength(line) > maxContentWidth) {
            // Wrap long lines (primarily for Summary which has no tags)
            for (let i = 0; i < line.length; i += maxContentWidth) {
                rows.push(leftText(line.substring(i, i + maxContentWidth)));
            }
        } else {
            rows.push(leftText(line));
        }
    });

    rows.push(horizontalLine);
    return rows.join('\n');
};

// Render Function
function renderPortfolio() {
    const container = document.getElementById('resume-container');
    if (!container) return;

    // Helper to create pre element with content
    const createAsciiSection = (content) => {
        const pre = document.createElement('pre');
        pre.className = 'ascii-section';
        pre.innerHTML = content; // Use innerHTML to render links
        return pre;
    };

    // 1. Name as H1 (Outside ASCII)
    const nameHeader = document.createElement('h1');
    nameHeader.textContent = RESUME.header.name;
    nameHeader.className = 'resume-name';
    container.appendChild(nameHeader);

    // 2. Contact Info (Without Name)
    const contactContent = [
        RESUME.header.contact.join(' | '),
        RESUME.header.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join(' | ')
    ].join('\n');
    container.appendChild(createAsciiSection(renderAsciiBox("Contact Info", contactContent)));

    // 3. Summary
    container.appendChild(createAsciiSection(renderAsciiBox("Summary", RESUME.summary)));

    // 4. Skills
    const skillsTable = renderAsciiTable(RESUME.skills, [
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Skills', key: 'items' }
    ]);
    container.appendChild(createAsciiSection(skillsTable));

    // 5. Experience
    const expTable = renderAsciiTable(RESUME.experience, [
        { header: 'Role', key: 'role', width: 15 },
        { header: 'Company', key: 'company', width: 20 },
        { header: 'Period', key: 'duration' }
    ]);
    container.appendChild(createAsciiSection(expTable));

    // 6. Projects
    const projectContent = [
        RESUME.projects[0].name,
        `Tech: ${RESUME.projects[0].tech}`,
        RESUME.projects[0].desc
    ];
    container.appendChild(createAsciiSection(renderAsciiBox("Latest Project", projectContent)));

    // Footer
    const footer = document.createElement('div');
    footer.className = 'footer-copyright';
    footer.innerHTML = `<p>© ${new Date().getFullYear()} ${RESUME.header.name}</p>`;
    container.appendChild(footer);
}

// Night Mode Toggle
function initNightMode() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Update button text or icon if needed
        const isDark = document.body.classList.contains('dark-mode');
        toggleBtn.textContent = isDark ? "Light Mode" : "Night Mode";
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initNightMode();
});
