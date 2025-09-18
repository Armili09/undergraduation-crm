const students = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 555-1234",
        country: "United States",
        grade: "12th Grade",
        status: "Submitted",
        lastActive: "Today, 10:23 AM",
        progress: 100,
        interactions: [
            { type: "Login", date: "Today, 10:23 AM", details: "Accessed application portal" },
            { type: "Document", date: "Yesterday, 4:30 PM", details: "Submitted recommendation letter" },
            { type: "Question", date: "2 days ago", details: "Asked about financial aid options" }
        ],
        communications: [
            { type: "Email", date: "Yesterday, 2:15 PM", details: "Application submission confirmation" },
            { type: "SMS", date: "3 days ago", details: "Reminder about deadline" }
        ],
        notes: [
            { date: "Yesterday, 5:40 PM", text: "Student has completed all application requirements." },
            { date: "4 days ago", text: "Follow up on missing transcript." }
        ],
        aiSummary: "Sarah is a highly motivated student with strong academic credentials. She has completed her application process and is waiting for decisions. She shows particular interest in STEM programs and has applied to several top-tier universities."
    },
    {
        id: 2,
        name: "David Kim",
        email: "david.kim@example.com",
        phone: "+82 10-1234-5678",
        country: "South Korea",
        grade: "12th Grade",
        status: "Applying",
        lastActive: "Yesterday, 3:45 PM",
        progress: 75,
        interactions: [
            { type: "Login", date: "Yesterday, 3:45 PM", details: "Worked on essay questions" },
            { type: "Document", date: "3 days ago", details: "Uploaded test scores" }
        ],
        communications: [
            { type: "Email", date: "2 days ago", details: "Essay tips and guidelines" }
        ],
        notes: [
            { date: "Yesterday, 4:20 PM", text: "Needs help with essay structure." }
        ],
        aiSummary: "David is an international student with excellent test scores but needs guidance on essay writing. He's applying to business programs and has shown interest in universities with strong international student support."
    },
    {
        id: 3,
        name: "Maria Garcia",
        email: "maria.g@example.com",
        phone: "+34 612 345 678",
        country: "Spain",
        grade: "12th Grade",
        status: "Shortlisting",
        lastActive: "2 days ago",
        progress: 50,
        interactions: [
            { type: "Login", date: "2 days ago", details: "Viewed university profiles" },
            { type: "Question", date: "4 days ago", details: "Asked about scholarship opportunities" }
        ],
        communications: [
            { type: "Email", date: "3 days ago", details: "Scholarship information packet" }
        ],
        notes: [
            { date: "5 days ago", text: "Interested in art history programs with study abroad options." }
        ],
        aiSummary: "Maria is exploring options for art history programs. She's particularly interested in universities with strong study abroad programs and has concerns about financing her education. Needs guidance on scholarship applications."
    },
    {
        id: 4,
        name: "James Wilson",
        email: "j.wilson@example.com",
        phone: "+44 7700 123456",
        country: "United Kingdom",
        grade: "11th Grade",
        status: "Exploring",
        lastActive: "3 days ago",
        progress: 25,
        interactions: [
            { type: "Login", date: "3 days ago", details: "Browsed program options" },
            { type: "Question", date: "6 days ago", details: "Asked about early admission process" }
        ],
        communications: [
            { type: "Email", date: "5 days ago", details: "Welcome packet and overview" }
        ],
        notes: [
            { date: "1 week ago", text: "Early in the process, needs general guidance." }
        ],
        aiSummary: "James is early in the exploration phase. He's considering engineering programs but is unsure about specialization. Would benefit from career assessment tools and program matching services."
    },
    {
        id: 5,
        name: "Lisa Chen",
        email: "lisa.chen@example.com",
        phone: "+86 138 0013 8000",
        country: "China",
        grade: "12th Grade",
        status: "Submitted",
        lastActive: "4 days ago",
        progress: 100,
        interactions: [
            { type: "Login", date: "4 days ago", details: "Checked application status" },
            { type: "Document", date: "1 week ago", details: "Submitted final application materials" }
        ],
        communications: [
            { type: "Email", date: "5 days ago", details: "Application complete confirmation" }
        ],
        notes: [
            { date: "6 days ago", text: "Strong candidate for top computer science programs." }
        ],
        aiSummary: "Lisa has exceptional credentials in computer science and mathematics. She has applied to highly competitive programs and has a strong chance of admission. May need guidance on final decision making when offers arrive."
    }
];
document.addEventListener('DOMContentLoaded', function () {
    populateStudentTable();
    setupEventListeners();
});

function populateStudentTable() {
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        let statusClass = '';
        switch (student.status) {
            case 'Exploring':
                statusClass = 'status-exploring';
                break;
            case 'Shortlisting':
                statusClass = 'status-shortlisting';
                break;
            case 'Applying':
                statusClass = 'status-applying';
                break;
            case 'Submitted':
                statusClass = 'status-submitted';
                break;
        }

        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random" class="rounded-circle me-2" width="30" height="30">
                    <div>${student.name}</div>
                </div>
            </td>
            <td>${student.email}</td>
            <td>${student.country}</td>
            <td><span class="status-badge ${statusClass}">${student.status}</span></td>
            <td>${student.lastActive}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary view-student" data-id="${student.id}">View</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    document.querySelectorAll('.view-student').forEach(button => {
        button.addEventListener('click', function () {
            const studentId = parseInt(this.getAttribute('data-id'));
            showStudentDetails(studentId);
        });
    });
}

function setupEventListeners() {
    document.getElementById('searchButton').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    document.getElementById('statusFilter').addEventListener('change', handleStatusFilter);

    document.querySelectorAll('.btn-group .btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.btn-group .btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            handleQuickFilter(filter);
        });
    });

    document.getElementById('saveStudentBtn').addEventListener('click', handleSaveStudent);
}
function handleSearch() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#studentTableBody tr');

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const email = row.cells[1].textContent.toLowerCase();
        const country = row.cells[2].textContent.toLowerCase();

        if (name.includes(searchText) || email.includes(searchText) || country.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
function handleStatusFilter() {
    const status = this.value;
    const rows = document.querySelectorAll('#studentTableBody tr');

    rows.forEach(row => {
        const rowStatus = row.cells[3].textContent;

        if (!status || rowStatus.includes(status)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function handleQuickFilter(filter) {
    const rows = document.querySelectorAll('#studentTableBody tr');

    rows.forEach(row => {
        if (filter === 'all') {
            row.style.display = '';
        } else {
            row.style.display = Math.random() > 0.5 ? '' : 'none';
        }
    });
}

function showStudentDetails(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const modalContent = document.getElementById('studentDetailContent');

    let statusClass = '';
    switch (student.status) {
        case 'Exploring':
            statusClass = 'status-exploring';
            break;
        case 'Shortlisting':
            statusClass = 'status-shortlisting';
            break;
        case 'Applying':
            statusClass = 'status-applying';
            break;
        case 'Submitted':
            statusClass = 'status-submitted';
            break;
    }

    modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="text-center mb-4">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&size=120" class="rounded-circle mb-3">
                    <h3>${student.name}</h3>
                    <p class="text-muted">${student.email}</p>
                    <span class="status-badge ${statusClass}">${student.status}</span>
                </div>
                
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Contact Information</h5>
                    </div>
                    <div class="card-body">
                        <p><i class="bi bi-telephone me-2"></i> ${student.phone}</p>
                        <p><i class="bi bi-geo-alt me-2"></i> ${student.country}</p>
                        <p><i class="bi bi-book me-2"></i> ${student.grade}</p>
                        <p><i class="bi bi-clock me-2"></i> Last active: ${student.lastActive}</p>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Application Progress</h5>
                    </div>
                    <div class="card-body">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: ${student.progress}%;" aria-valuenow="${student.progress}" aria-valuemin="0" aria-valuemax="100">${student.progress}%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">AI Summary</h5>
                    </div>
                    <div class="card-body">
                        <p>${student.aiSummary}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Interaction Timeline</h5>
                            </div>
                            <div class="card-body">
                                <div class="timeline">
                                    ${student.interactions.map(interaction => `
                                        <div class="timeline-item">
                                            <h6>${interaction.type} - ${interaction.date}</h6>
                                            <p>${interaction.details}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Communication Log</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    ${student.communications.map(comm => `
                                        <li class="list-group-item">
                                            <div class="d-flex justify-content-between">
                                                <strong>${comm.type}</strong>
                                                <span class="text-muted">${comm.date}</span>
                                            </div>
                                            <p class="mb-0">${comm.details}</p>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">Internal Notes</h5>
                        <button class="btn btn-sm btn-primary">Add Note</button>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            ${student.notes.map(note => `
                                <li class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <strong>Note</strong>
                                        <span class="text-muted">${note.date}</span>
                                    </div>
                                    <p class="mb-0">${note.text}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('studentDetailModal'));
    modal.show();
}

function handleSaveStudent() {
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const country = document.getElementById('studentCountry').value;
    const grade = document.getElementById('studentGrade').value;
    const status = document.getElementById('studentStatus').value;

    if (!name || !email || !country || !status) {
        alert('Please fill in all required fields');
        return;
    }

    const newStudent = {
        id: students.length + 1,
        name,
        email,
        phone,
        country,
        grade,
        status,
        lastActive: 'Just now',
        progress: status === 'Exploring' ? 25 : status === 'Shortlisting' ? 50 : status === 'Applying' ? 75 : 100,
        interactions: [
            { type: "Account", date: "Just now", details: "Student profile created" }
        ],
        communications: [],
        notes: [],
        aiSummary: "New student profile. Information will be updated as the student engages with the platform."
    };

    students.push(newStudent);
    populateStudentTable();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
    modal.hide();

    document.getElementById('addStudentForm').reset();

    alert('Student added successfully!');
}