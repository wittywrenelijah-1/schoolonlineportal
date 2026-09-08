
        // ======================================================================
        //  DATA LAYER (localStorage)
        // ======================================================================
        const DB = {
            get(key, def) { try { const d = localStorage.getItem('sp_' + key); return d ? JSON.parse(d) : def; } catch (
                e) { return def; } },
            set(key, val) { localStorage.setItem('sp_' + key, JSON.stringify(val)); },
            // helpers
            getUsers() { return this.get('users', []); },
            setUsers(u) { this.set('users', u); },
            getExercises() { return this.get('exercises', []); },
            setExercises(e) { this.set('exercises', e); },
            getActivities() { return this.get('activities', []); },
            setActivities(a) { this.set('activities', a); },
            getNotes() { return this.get('notes', []); },
            setNotes(n) { this.set('notes', n); },
            getMessages() { return this.get('messages', []); },
            setMessages(m) { this.set('messages', m); },
            getAiChats() { return this.get('aiChats', []); },
            setAiChats(c) { this.set('aiChats', c); },
            getCurrentUser() { return this.get('currentUser', null); },
            setCurrentUser(u) { this.set('currentUser', u); },
            getSchoolData() { return this.get('schoolData', { classes: [], subjects: [], timetable: [], gradingSystems: [], announcements: [], admissions: [], settings: { schoolLogo: '', portalPermissions: ['admin', 'teacher', 'student'] }, attendance: [], grades: [], lessons: [], reportCards: [], studentProfiles: [], communications: [], groups: [] }); },
            setSchoolData(s) { this.set('schoolData', s); },
            clearSession() { this.set('currentUser', null); },
            // generate ID
            id() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); },
            // seed initial data
            seed() {
                if (this.getUsers().length === 0) {
                    const users = [
                        { id: 'u1', name: 'Admin User', email: 'admin@school.com', password: 'admin123',
                            role: 'admin', createdAt: Date.now() },
                        { id: 'u2', name: 'Teacher One', email: 'teacher@school.com', password: 'teacher123',
                            role: 'teacher', createdAt: Date.now() },
                        { id: 'u3', name: 'Student One', email: 'student@school.com', password: 'student123',
                            role: 'student', createdAt: Date.now() },
                        { id: 'u4', name: 'Alice Student', email: 'alice@school.com', password: 'alice123',
                            role: 'student', createdAt: Date.now() },
                    ];
                    this.setUsers(users);
                    // seed exercises
                    this.setExercises([
                        { id: 'e1', title: 'Math Homework #1', description: 'Solve equations 1-10 on page 42.',
                            subject: 'Mathematics', teacherId: 'u2', createdAt: Date.now() - 86400000,
                        dueDate: Date.now() + 86400000 * 3 },
                        { id: 'e2', title: 'Science Lab Report', description: 'Write a report on the photosynthesis experiment.',
                            subject: 'Science', teacherId: 'u2', createdAt: Date.now() - 172800000,
                            dueDate: Date.now() + 86400000 * 5 },
                        { id: 'e3', title: 'History Essay', description: 'Write a 500-word essay on the French Revolution.',
                            subject: 'History', teacherId: 'u2', createdAt: Date.now() - 259200000,
                            dueDate: Date.now() + 86400000 * 7 },
                    ]);
                    // seed activities
                    this.setActivities([
                        { id: 'a1', title: 'Group Discussion', description: 'Discuss chapter 5 in groups of 4.',
                            type: 'Discussion', teacherId: 'u2', createdAt: Date.now() - 43200000 },
                        { id: 'a2', title: 'Quiz: Algebra', description: 'Online quiz covering linear equations.',
                            type: 'Quiz', teacherId: 'u2', createdAt: Date.now() - 86400000 },
                        { id: 'a3', title: 'Peer Review', description: 'Review your partner\'s essay draft.',
                            type: 'Review', teacherId: 'u2', createdAt: Date.now() - 129600000 },
                    ]);
                    // seed notes for student u3
                    this.setNotes([
                        { id: 'n1', title: 'Math Formulas', content: 'Quadratic formula: x = (-b ± √(b²-4ac)) / 2a',
                            studentId: 'u3', createdAt: Date.now() - 3600000, updatedAt: Date.now() - 3600000 },
                        { id: 'n2', title: 'Science Key Terms',
                            content: 'Photosynthesis: process by which plants convert light energy into chemical energy.',
                            studentId: 'u3', createdAt: Date.now() - 7200000, updatedAt: Date.now() - 7200000 },
                    ]);
                    // seed messages
                    this.setMessages([
                        { id: 'm1', senderId: 'u2', receiverId: 'u3', content: 'Hi Student! How are you doing with the homework?',
                            timestamp: Date.now() - 1800000, read: true },
                        { id: 'm2', senderId: 'u3', receiverId: 'u2', content: 'Hello Teacher! I\'m almost done, just need help with question 5.',
                            timestamp: Date.now() - 1200000, read: true },
                        { id: 'm3', senderId: 'u2', receiverId: 'u3', content: 'Sure! Let\'s go through it together in the next class.',
                            timestamp: Date.now() - 600000, read: false },
                    ]);
                    // seed AI chats
                    this.setAiChats([
                        { id: 'ai1', userId: 'u3', message: 'What is the quadratic formula?', response: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. It is used to solve quadratic equations of the form ax² + bx + c = 0.',
                            timestamp: Date.now() - 300000 },
                        { id: 'ai2', userId: 'u3', message: 'Can you help me with my homework?', response: 'Of course! I can help you with math, science, history, and more. What subject are you working on?',
                            timestamp: Date.now() - 120000 },
                    ]);
                    // seed school data
                    this.setSchoolData({
                        classes: [{ id: 'c1', name: 'Grade 7', capacity: 40, teacher: 'Mr. Daniel' }],
                        subjects: [{ id: 's1', name: 'Mathematics', classId: 'c1', teacherId: 'u2' }, { id: 's2', name: 'English', classId: 'c1', teacherId: 'u2' }],
                        timetable: [{ id: 't1', day: 'Monday', period: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Daniel', className: 'Grade 7' }, { id: 't2', day: 'Tuesday', period: '10:00 - 11:00', subject: 'English', teacher: 'Ms. Sarah', className: 'Grade 7' }],
                        gradingSystems: [{ id: 'g1', name: 'Term 1', scale: 'A-F', passing: 50 }],
                        announcements: [{ id: 'an1', title: 'School Assembly', message: 'The assembly is scheduled for Friday at 8:00 AM.', audience: 'All' }],
                        admissions: [{ id: 'ad1', studentName: 'Alice Student', className: 'Grade 7', status: 'Approved' }],
                        settings: { schoolLogo: 'https://via.placeholder.com/140x70?text=School+Logo', portalPermissions: ['admin', 'teacher', 'student'] },
                        attendance: [{ id: 'att1', studentId: 'u4', studentName: 'Alice Student', date: '2026-07-24', present: true, note: 'Present' }],
                        grades: [{ id: 'gr1', studentId: 'u4', studentName: 'Alice Student', subject: 'Mathematics', exam: 'Midterm', marks: 88, grade: 'A', position: 3 }],
                        lessons: [{ id: 'l1', title: 'Algebra Basics', type: 'Lesson Plan', fileName: 'algebra-plan.pdf' }],
                        studentProfiles: [{ id: 'p1', studentId: 'u3', admissionNumber: 'ADM001', className: 'Grade 7', bio: 'Friendly learner with strong interest in mathematics.', photo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80', username: 'studentone', password: 'student123' }],
                        communications: [{ id: 'c1', senderId: 'u2', recipient: 'Alice Student', message: 'Please submit your homework before 4 PM.', type: 'Homework reminder' }],
                        groups: [{ id: 'grp1', name: 'Grade 7 Math Club', members: ['u3', 'u4'] }],
                        reportCards: [{ id: 'rc1', studentId: 'u4', studentName: 'Alice Student', term: 'Term 1', average: 88, position: 3 }]
                    });
                }
            }
        };

        // ======================================================================
        //  APP STATE
        // ======================================================================
        let currentUser = DB.getCurrentUser();
        let currentPage = 'dashboard';
        let chatInterval = null;
        let selectedChatUser = null;

        function getDefaultChatUser(users) {
            if (selectedChatUser && users.some(u => u.id === selectedChatUser)) return selectedChatUser;
            if (users.length > 0) return users[0].id;
            return null;
        }

        // ======================================================================
        //  DOM REFS
        // ======================================================================
        const $ = id => document.getElementById(id);
        const loginPage = $('loginPage');
        const mainApp = $('mainApp');
        const authContainer = $('authContainer');
        const authForm = $('authForm');
        const authEmail = $('authEmail');
        const authPassword = $('authPassword');
        const authName = $('authName');
        const authCode = $('authCode');
        const codeGroup = $('codeGroup');
        const codeHint = $('codeHint');
        const authSubmitBtn = $('authSubmitBtn');
        const authMode = $('authMode');
        const selectedRole = $('selectedRole');
        const switchLink = $('switchLink');
        const switchText = $('switchText');
        const authError = $('authError');
        const authSuccess = $('authSuccess');
        const authSubtitle = $('authSubtitle');
        const roleSelector = $('roleSelector');
        const gmailBtn = $('gmailBtn');
        const verificationBox = $('verificationBox');
        const verificationInput = $('verificationInput');
        const verificationCodeDisplay = $('verificationCodeDisplay');
        const sidebarName = $('sidebarName');
        const sidebarRoleBadge = $('sidebarRoleBadge');
        const sidebarNav = $('sidebarNav');
        const content = $('content');
        const modalOverlay = $('modalOverlay');
        const modalTitle = $('modalTitle');
        const modalDesc = $('modalDesc');
        const modalBody = $('modalBody');
        const modalConfirm = $('modalConfirm');
        const modalCancel = $('modalCancel');

        // ======================================================================
        //  AUTH
        // ======================================================================
        const ADMIN_CODE = 'ADMIN2026';
        const TEACHER_CODE = 'TEACHER2026';
        const VERIFICATION_CODE = '123456';

        function showError(msg) { authError.textContent = msg;
            authError.classList.add('show');
            authSuccess.classList.remove('show'); }

        function showSuccess(msg) { authSuccess.textContent = msg;
            authSuccess.classList.add('show');
            authError.classList.remove('show'); }

        function hideMessages() { authError.classList.remove('show');
            authSuccess.classList.remove('show'); }

        function switchToLogin() {
            authMode.value = 'login';
            authSubtitle.textContent = 'Sign in to your account';
            authSubmitBtn.textContent = 'Sign In';
            switchText.textContent = "Don't have an account?";
            switchLink.textContent = 'Register';
            roleSelector.style.display = 'none';
            codeGroup.style.display = 'none';
            authName.style.display = 'none';
            authName.required = false;
            authName.value = '';
            verificationBox.classList.remove('show');
            hideMessages();
            // show name for login? hide it
            authName.style.display = 'none';
            document.querySelector('.auth-container h1 i').className = 'fas fa-graduation-cap';
        }

        function switchToRegister() {
            authMode.value = 'register';
            authSubtitle.textContent = 'Create a new account';
            authSubmitBtn.textContent = 'Register';
            switchText.textContent = "Already have an account?";
            switchLink.textContent = 'Sign In';
            roleSelector.style.display = 'flex';
            authName.style.display = 'block';
            authName.required = true;
            verificationBox.classList.remove('show');
            hideMessages();
            updateCodeField();
            document.querySelector('.auth-container h1 i').className = 'fas fa-user-plus';
        }

        function updateCodeField() {
            const role = selectedRole.value;
            if (role === 'admin') {
                codeGroup.style.display = 'block';
                codeHint.textContent = 'Enter the admin registration code.';
                authCode.required = true;
            } else if (role === 'teacher') {
                codeGroup.style.display = 'block';
                codeHint.textContent = 'Enter the teacher registration code.';
                authCode.required = true;
            } else {
                codeGroup.style.display = 'none';
                authCode.required = false;
                authCode.value = '';
            }
        }

        // Role selector buttons
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                selectedRole.value = this.dataset.role;
                updateCodeField();
                hideMessages();
            });
        });

        // Switch link
        switchLink.addEventListener('click', function() {
            hideMessages();
            if (authMode.value === 'login') {
                switchToRegister();
            } else {
                switchToLogin();
            }
            // reset verification
            verificationBox.classList.remove('show');
        });

        // Gmail login
        let gmailVerificationSent = false;
        gmailBtn.addEventListener('click', function() {
            const email = authEmail.value.trim();
            if (!email || !email.includes('@')) {
                showError('Please enter a valid email address first.');
                return;
            }
            // Simulate sending verification code
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            verificationCodeDisplay.textContent = code;
            verificationBox.classList.add('show');
            verificationInput.value = '';
            gmailVerificationSent = true;
            showSuccess(`Verification code sent to ${email} (demo: ${code})`);
            // Auto-fill for demo
            setTimeout(() => {
                verificationInput.value = code;
                showSuccess('✅ Code auto-filled for demo. Click "Sign In" to verify.');
            }, 800);
        });

        // Auth form submit
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            hideMessages();

            const mode = authMode.value;
            const email = authEmail.value.trim();
            const password = authPassword.value.trim();
            const name = authName.value.trim();
            const role = selectedRole.value;
            const code = authCode.value.trim();

            if (mode === 'login') {
                // LOGIN
                const users = DB.getUsers();
                const user = users.find(u => u.email === email && u.password === password);
                if (!user) {
                    showError('Invalid email or password. Please try again.');
                    return;
                }
                // If verification was shown, check it
                if (gmailVerificationSent) {
                    const vcode = verificationInput.value.trim();
                    const sentCode = verificationCodeDisplay.textContent;
                    if (vcode !== sentCode) {
                        showError('Invalid verification code. Please check your email.');
                        return;
                    }
                }
                loginUser(user);
            } else {
                // REGISTER
                if (!name) { showError('Please enter your full name.'); return; }
                if (password.length < 4) { showError('Password must be at least 4 characters.'); return; }

                // Check role code
                if (role === 'admin' && code !== ADMIN_CODE) { showError('Invalid admin code. Contact the administrator.');
                    return; }
                if (role === 'teacher' && code !== TEACHER_CODE) { showError('Invalid teacher code. Contact the administrator.');
                    return; }

                const users = DB.getUsers();
                if (users.find(u => u.email === email)) {
                    showError('An account with this email already exists.');
                    return;
                }

                // If verification was shown, check it
                if (gmailVerificationSent) {
                    const vcode = verificationInput.value.trim();
                    const sentCode = verificationCodeDisplay.textContent;
                    if (vcode !== sentCode) {
                        showError('Invalid verification code. Please check your email.');
                        return;
                    }
                }

                const newUser = {
                    id: DB.id(),
                    name,
                    email,
                    password,
                    role,
                    createdAt: Date.now()
                };
                users.push(newUser);
                DB.setUsers(users);
                showSuccess('Account created successfully! You can now sign in.');
                // Auto-login
                loginUser(newUser);
            }
        });

        function loginUser(user) {
            DB.setCurrentUser(user);
            currentUser = user;
            selectedChatUser = null;
            gmailVerificationSent = false;
            verificationBox.classList.remove('show');
            loginPage.style.display = 'none';
            mainApp.classList.add('show');
            initApp();
        }

        // ======================================================================
        //  APP INIT
        // ======================================================================
        function initApp() {
            if (!currentUser) return;
            sidebarName.textContent = currentUser.name;
            const badge = sidebarRoleBadge;
            badge.textContent = currentUser.role;
            badge.className = 'badge ' + currentUser.role;

            buildSidebar();
            navigateTo('dashboard');

            // start chat polling
            if (chatInterval) clearInterval(chatInterval);
            chatInterval = setInterval(() => {
                if (currentPage === 'chat') renderChat();
            }, 3000);

            // Seed DB if empty
            DB.seed();
        }

        function buildSidebar() {
            const role = currentUser.role;
            let items = [];
            if (role === 'student') {
                items = [
                    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
                    { id: 'profile', icon: 'fa-user-circle', label: 'My Profile' },
                    { id: 'timetable', icon: 'fa-calendar-alt', label: 'Timetable' },
                    { id: 'results', icon: 'fa-chart-line', label: 'Results' },
                    { id: 'assignments', icon: 'fa-file-alt', label: 'Assignments' },
                    { id: 'announcements', icon: 'fa-bullhorn', label: 'Announcements' },
                    { id: 'communications', icon: 'fa-envelope', label: 'Communications' },
                    { id: 'exercises', icon: 'fa-pencil-alt', label: 'Exercises' },
                    { id: 'chat', icon: 'fa-comments', label: 'Chat' },
                    { id: 'ai', icon: 'fa-robot', label: 'AI Assistant' },
                ];
            } else if (role === 'teacher' || role === 'admin') {
                items = [
                    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
                    { id: 'teacher-class', icon: 'fa-school', label: 'My Class' },
                    { id: 'teacher-attendance', icon: 'fa-user-check', label: 'Attendance' },
                    { id: 'teacher-grades', icon: 'fa-clipboard-list', label: 'Grade Book' },
                    { id: 'teacher-lessons', icon: 'fa-book-open', label: 'Lesson Plans' },
                    { id: 'teacher-communications', icon: 'fa-paper-plane', label: 'Communication' },
                    { id: 'teacher-reports', icon: 'fa-chart-bar', label: 'Reports' },
                    { id: 'manage-exercises', icon: 'fa-pencil-alt', label: 'Manage Exercises' },
                    { id: 'manage-activities', icon: 'fa-tasks', label: 'Manage Activities' },
                    { id: 'chat', icon: 'fa-comments', label: 'Chat' },
                ];
                if (role === 'admin') {
                    items.push(
                        { id: 'users', icon: 'fa-users-cog', label: 'Manage Users' },
                        { id: 'academics', icon: 'fa-book', label: 'Academic Setup' },
                        { id: 'student-records', icon: 'fa-user-graduate', label: 'Student Records' },
                        { id: 'announcements', icon: 'fa-bullhorn', label: 'Announcements' },
                        { id: 'reports', icon: 'fa-chart-pie', label: 'Reports' },
                        { id: 'settings', icon: 'fa-cogs', label: 'System Settings' }
                    );
                }
            }
            // add logout
            items.push({ id: 'logout', icon: 'fa-sign-out-alt', label: 'Logout', isLogout: true });

            sidebarNav.innerHTML = '';
            items.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'nav-item' + (currentPage === item.id ? ' active' : '');
                btn.dataset.page = item.id;
                btn.innerHTML = `<i class="fas ${item.icon}"></i><span>${item.label}</span>`;
                if (item.isLogout) {
                    btn.classList.add('logout');
                    btn.addEventListener('click', logout);
                } else {
                    btn.addEventListener('click', () => navigateTo(item.id));
                }
                sidebarNav.appendChild(btn);
            });
        }

        function navigateTo(page) {
            if (page === 'logout') { logout(); return; }
            currentPage = page;
            document.querySelectorAll('#sidebarNav .nav-item').forEach(el => {
                el.classList.toggle('active', el.dataset.page === page);
            });
            renderPage(page);
        }

        function renderPage(page) {
            switch (page) {
                case 'dashboard':
                    renderDashboard();
                    break;
                case 'exercises':
                    renderExercises();
                    break;
                case 'activities':
                    renderActivities();
                    break;
                case 'notes':
                    renderNotes();
                    break;
                case 'profile':
                    renderStudentProfile();
                    break;
                case 'timetable':
                    renderStudentTimetable();
                    break;
                case 'results':
                    renderStudentResults();
                    break;
                case 'assignments':
                    renderStudentAssignments();
                    break;
                case 'announcements':
                    renderAnnouncements();
                    break;
                case 'communications':
                    renderStudentCommunications();
                    break;
                case 'chat':
                    renderChat();
                    break;
                case 'ai':
                    renderAI();
                    break;
                case 'manage-exercises':
                    renderManageExercises();
                    break;
                case 'manage-activities':
                    renderManageActivities();
                    break;
                case 'teacher-class':
                    renderTeacherClass();
                    break;
                case 'teacher-attendance':
                    renderTeacherAttendance();
                    break;
                case 'teacher-grades':
                    renderTeacherGrades();
                    break;
                case 'teacher-lessons':
                    renderTeacherLessons();
                    break;
                case 'teacher-communications':
                    renderTeacherCommunications();
                    break;
                case 'teacher-reports':
                    renderTeacherReports();
                    break;
                case 'users':
                    renderUsers();
                    break;
                case 'academics':
                    renderAdminAcademics();
                    break;
                case 'student-records':
                    renderAdminStudents();
                    break;
                case 'reports':
                    renderAdminReports();
                    break;
                case 'settings':
                    renderAdminSettings();
                    break;
                default:
                    content.innerHTML = `<h2>Page not found</h2>`;
            }
        }

        // ======================================================================
        //  LOGOUT
        // ======================================================================
        function logout() {
            if (chatInterval) clearInterval(chatInterval);
            DB.clearSession();
            currentUser = null;
            selectedChatUser = null;
            mainApp.classList.remove('show');
            loginPage.style.display = 'flex';
            switchToLogin();
            hideMessages();
            gmailVerificationSent = false;
            verificationBox.classList.remove('show');
            authEmail.value = '';
            authPassword.value = '';
            authName.value = '';
            authCode.value = '';
        }

        // ======================================================================
        //  DASHBOARD
        // ======================================================================
        function renderDashboard() {
            const role = currentUser.role;
            const isTeacherOrAdmin = role === 'teacher' || role === 'admin';
            let html = `
                <div class="page-header">
                    <h2>👋 Welcome, ${currentUser.name}</h2>
                    <p>${role === 'student' ? 'Access your exercises, activities, notes, and more.' :
                       role === 'teacher' ? 'Manage your class content and communicate with students.' :
                       'Manage users and oversee the platform with teacher tools too.'}</p>
                </div>
                <div class="card-grid">
            `;

            if (role === 'student') {
                const exercises = DB.getExercises().length;
                const activities = DB.getActivities().length;
                const notes = DB.getNotes().filter(n => n.studentId === currentUser.id).length;
                const msgs = DB.getMessages().filter(m => m.receiverId === currentUser.id && !m.read).length;
                html += `
                    <button type="button" class="card interactive-card" onclick="navigateTo('profile')"><div class="card-title"><i class="fas fa-user-circle text-primary"></i> My Profile</div><div class="card-desc">View student details</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('timetable')"><div class="card-title"><i class="fas fa-calendar-alt text-primary"></i> Timetable</div><div class="card-desc">See your weekly schedule</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('results')"><div class="card-title"><i class="fas fa-chart-line text-success"></i> Results</div><div class="card-desc">Check report cards</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('assignments')"><div class="card-title"><i class="fas fa-file-alt text-warning"></i> Assignments</div><div class="card-desc">Submit and review work</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('announcements')"><div class="card-title"><i class="fas fa-bullhorn text-info"></i> Announcements</div><div class="card-desc">Stay updated</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('communications')"><div class="card-title"><i class="fas fa-envelope text-primary"></i> Communications</div><div class="card-desc">Connect with school</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('exercises')"><div class="card-title"><i class="fas fa-pencil-alt text-primary"></i> Exercises</div><div class="card-desc">${exercises} available</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('chat')"><div class="card-title"><i class="fas fa-comments text-primary"></i> Messages</div><div class="card-desc">${msgs} unread</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('ai')"><div class="card-title"><i class="fas fa-robot text-warning"></i> AI Assistant</div><div class="card-desc">Ask study questions</div></button>
                `;
            } else if (isTeacherOrAdmin) {
                const exercises = DB.getExercises().filter(e => e.teacherId === currentUser.id).length;
                const activities = DB.getActivities().filter(a => a.teacherId === currentUser.id).length;
                const students = DB.getUsers().filter(u => u.role === 'student').length;
                html += `
                    <button type="button" class="card interactive-card" onclick="navigateTo('teacher-class')"><div class="card-title"><i class="fas fa-school text-primary"></i> My Class</div><div class="card-desc">View timetable and class info</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('teacher-attendance')"><div class="card-title"><i class="fas fa-user-check text-success"></i> Attendance</div><div class="card-desc">Track attendance records</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('teacher-grades')"><div class="card-title"><i class="fas fa-clipboard-list text-warning"></i> Grade Book</div><div class="card-desc">Review marks and reports</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('teacher-lessons')"><div class="card-title"><i class="fas fa-book-open text-info"></i> Lesson Plans</div><div class="card-desc">Manage shared lesson materials</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('teacher-communications')"><div class="card-title"><i class="fas fa-paper-plane text-primary"></i> Communication</div><div class="card-desc">Send updates to students</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('teacher-reports')"><div class="card-title"><i class="fas fa-chart-bar text-success"></i> Reports</div><div class="card-desc">View class performance</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('manage-exercises')"><div class="card-title"><i class="fas fa-pencil-alt text-primary"></i> Manage Exercises</div><div class="card-desc">${exercises} created</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('manage-activities')"><div class="card-title"><i class="fas fa-tasks text-success"></i> Manage Activities</div><div class="card-desc">${activities} created</div></button>
                    <button type="button" class="card interactive-card" onclick="navigateTo('chat')"><div class="card-title"><i class="fas fa-comments text-primary"></i> Chat</div><div class="card-desc">Connect with ${students} students</div></button>
                `;
                if (role === 'admin') {
                    const users = DB.getUsers();
                    const admins = users.filter(u => u.role === 'admin').length;
                    html += `
                        <button type="button" class="card interactive-card" onclick="navigateTo('users')"><div class="card-title"><i class="fas fa-users-cog text-warning"></i> Manage Users</div><div class="card-desc">${users.length} accounts · ${admins} admins</div></button>
                        <button type="button" class="card interactive-card" onclick="navigateTo('academics')"><div class="card-title"><i class="fas fa-book text-info"></i> Academic Setup</div><div class="card-desc">Classes, subjects, timetable</div></button>
                        <button type="button" class="card interactive-card" onclick="navigateTo('student-records')"><div class="card-title"><i class="fas fa-user-graduate text-primary"></i> Student Records</div><div class="card-desc">Admissions and profiles</div></button>
                        <button type="button" class="card interactive-card" onclick="navigateTo('reports')"><div class="card-title"><i class="fas fa-chart-pie text-success"></i> Reports</div><div class="card-desc">School analytics</div></button>
                        <button type="button" class="card interactive-card" onclick="navigateTo('settings')"><div class="card-title"><i class="fas fa-cogs text-warning"></i> System Settings</div><div class="card-desc">Portal permissions and logo</div></button>
                    `;
                }
            }

            html += `
                <div class="card mt-16">
                    <div class="card-title"><i class="fas fa-bolt"></i> Quick Actions</div>
                    <div class="card-desc">Jump straight into the most used tools.</div>
                    <div class="card-action">
                        <button class="btn-sm primary" type="button" onclick="navigateTo('chat')"><i class="fas fa-comments"></i> Open Chat</button>
                        ${role === 'student' ? `<button class="btn-sm warning" type="button" onclick="navigateTo('ai')"><i class="fas fa-robot"></i> Open AI Assistant</button>` : `<button class="btn-sm warning" type="button" onclick="navigateTo('manage-exercises')"><i class="fas fa-pencil-alt"></i> Manage Content</button>`}
                    </div>
                </div>
            </div>`;
            content.innerHTML = html;
        }

        // ======================================================================
        //  STUDENT: EXERCISES
        // ======================================================================
        function renderExercises() {
            const exercises = DB.getExercises();
            let html = `
                <div class="page-header"><h2>📚 Exercises</h2><p>Complete your assignments before the due date.</p></div>
                <div class="card-grid">
            `;
            if (exercises.length === 0) {
                html += `<div class="empty-state"><i class="fas fa-pencil-alt"></i>No exercises available yet.</div>`;
            } else {
                exercises.forEach(ex => {
                    const teacher = DB.getUsers().find(u => u.id === ex.teacherId);
                    html += `
                        <div class="card">
                            <div class="card-title">${ex.title}</div>
                            <div class="card-desc">${ex.description}</div>
                            <div class="card-meta"><i class="fas fa-book"></i> ${ex.subject || 'General'} · ${teacher ? '👨‍🏫 ' + teacher.name : ''}</div>
                            <div class="card-meta"><i class="fas fa-calendar-alt"></i> Due: ${ex.dueDate ? new Date(ex.dueDate).toLocaleDateString() : 'No due date'}</div>
                            <div class="card-action"><button class="btn-sm primary" onclick="alert('Exercise: ${ex.title}\n${ex.description}')"><i class="fas fa-eye"></i> View</button></div>
                        </div>
                    `;
                });
            }
            html += `</div>`;
            content.innerHTML = html;
        }

        // ======================================================================
        //  STUDENT: ACTIVITIES
        // ======================================================================
        function renderActivities() {
            const activities = DB.getActivities();
            let html = `
                <div class="page-header"><h2>🎯 Activities</h2><p>Participate in class activities and discussions.</p></div>
                <div class="card-grid">
            `;
            if (activities.length === 0) {
                html += `<div class="empty-state"><i class="fas fa-tasks"></i>No activities available.</div>`;
            } else {
                activities.forEach(act => {
                    const teacher = DB.getUsers().find(u => u.id === act.teacherId);
                    html += `
                        <div class="card">
                            <div class="card-title">${act.title}</div>
                            <div class="card-desc">${act.description}</div>
                            <div class="card-meta"><i class="fas fa-tag"></i> ${act.type || 'Activity'} · ${teacher ? '👨‍🏫 ' + teacher.name : ''}</div>
                            <div class="card-meta"><i class="fas fa-clock"></i> ${new Date(act.createdAt).toLocaleDateString()}</div>
                            <div class="card-action"><button class="btn-sm success" onclick="alert('Activity: ${act.title}\n${act.description}')"><i class="fas fa-check"></i> Participate</button></div>
                        </div>
                    `;
                });
            }
            html += `</div>`;
            content.innerHTML = html;
        }

        // ======================================================================
        //  STUDENT: NOTES
        // ======================================================================
        function renderNotes() {
            const notes = DB.getNotes().filter(n => n.studentId === currentUser.id);
            let html = `
                <div class="page-header flex-between">
                    <div><h2>📝 My Notes</h2><p>Save and manage your personal study notes.</p></div>
                    <button class="btn-sm primary" onclick="showAddNoteModal()"><i class="fas fa-plus"></i> New Note</button>
                </div>
                <div class="card-grid">
            `;
            if (notes.length === 0) {
                html += `<div class="empty-state"><i class="fas fa-sticky-note"></i>You have no notes yet. Create your first note!</div>`;
            } else {
                notes.forEach(n => {
                    html += `
                        <div class="card">
                            <div class="card-title">${n.title}</div>
                            <div class="note-content">${n.content}</div>
                            <div class="card-meta"><i class="fas fa-clock"></i> ${new Date(n.updatedAt || n.createdAt).toLocaleString()}</div>
                            <div class="card-action">
                                <button class="btn-sm warning" onclick="editNote('${n.id}')"><i class="fas fa-edit"></i> Edit</button>
                                <button class="btn-sm danger" onclick="deleteNote('${n.id}')"><i class="fas fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    `;
                });
            }
            html += `</div>`;
            content.innerHTML = html;
        }

        function showAddNoteModal() {
            showModal('Add Note', 'Create a new study note.', `
                <div class="form-group"><label>Title</label><input type="text" id="noteTitleInput" placeholder="Note title" /></div>
                <div class="form-group"><label>Content</label><textarea id="noteContentInput" rows="4" style="width:100%;padding:10px;border:2px solid var(--gray-200);border-radius:8px;font-size:14px;outline:none;" placeholder="Write your note..."></textarea></div>
            `, () => {
                const title = document.getElementById('noteTitleInput').value.trim();
                const content = document.getElementById('noteContentInput').value.trim();
                if (!title || !content) { alert('Please fill in both fields.'); return; }
                const notes = DB.getNotes();
                notes.push({ id: DB.id(), title, content, studentId: currentUser.id, createdAt: Date.now(),
                    updatedAt: Date.now() });
                DB.setNotes(notes);
                closeModal();
                renderNotes();
            });
        }

        function editNote(id) {
            const notes = DB.getNotes();
            const note = notes.find(n => n.id === id);
            if (!note) return;
            showModal('Edit Note', 'Update your note.', `
                <div class="form-group"><label>Title</label><input type="text" id="noteTitleInput" value="${note.title}" /></div>
                <div class="form-group"><label>Content</label><textarea id="noteContentInput" rows="4" style="width:100%;padding:10px;border:2px solid var(--gray-200);border-radius:8px;font-size:14px;outline:none;">${note.content}</textarea></div>
            `, () => {
                const title = document.getElementById('noteTitleInput').value.trim();
                const content = document.getElementById('noteContentInput').value.trim();
                if (!title || !content) { alert('Please fill in both fields.'); return; }
                note.title = title;
                note.content = content;
                note.updatedAt = Date.now();
                DB.setNotes(notes);
                closeModal();
                renderNotes();
            });
        }

        function deleteNote(id) {
            if (!confirm('Delete this note?')) return;
            let notes = DB.getNotes();
            notes = notes.filter(n => n.id !== id);
            DB.setNotes(notes);
            renderNotes();
        }

        // ======================================================================
        //  STUDENT PORTAL PAGES
        // ======================================================================
        function renderStudentProfile() {
            const profile = DB.getSchoolData().studentProfiles.find(p => p.studentId === currentUser.id) || DB.getSchoolData().studentProfiles[0];
            const user = DB.getUsers().find(u => u.id === currentUser.id);
            let html = `
                <div class="page-header"><h2>👤 My Profile</h2><p>Manage your personal details and account information.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Student Details</div>
                        <div class="card-desc">Admission number, class, username, and password can be updated here.</div>
                        <div class="card-meta"><strong>Name:</strong> ${user ? user.name : 'N/A'}</div>
                        <div class="card-meta"><strong>Admission:</strong> ${profile ? profile.admissionNumber : 'N/A'}</div>
                        <div class="card-meta"><strong>Class:</strong> ${profile ? profile.className : 'N/A'}</div>
                        <div class="card-meta"><strong>Username:</strong> ${profile ? profile.username : 'N/A'}</div>
                        <div class="card-meta"><strong>Password:</strong> ${profile ? profile.password : 'N/A'}</div>
                        <div class="card-action"><button class="btn-sm warning" onclick="alert('Profile editing is enabled in the demo. Use the admin panel to adjust student profiles.')"><i class="fas fa-edit"></i> Edit Profile</button></div>
                    </div>
                    <div class="card">
                        <div class="card-title">Photo</div>
                        <div class="card-desc">Current student profile image.</div>
                        <img src="${profile?.photo || 'https://via.placeholder.com/220x140?text=Student+Photo'}" alt="Student photo" style="width:100%;border-radius:10px;max-height:190px;object-fit:cover;" />
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderStudentTimetable() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>🗓️ Timetable</h2><p>View your daily class schedule and exam timetable.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Class Schedule</div>
                        <div class="table-wrap">
                            <table>
                                <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Teacher</th></tr></thead>
                                <tbody>${schoolData.timetable.map(item => `<tr><td>${item.day}</td><td>${item.period}</td><td>${item.subject}</td><td>${item.teacher}</td></tr>`).join('')}</tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-title">Exam Timetable</div>
                        <div class="card-desc">Midterm exams will begin next Monday at 9:00 AM.</div>
                        <div class="card-meta"><strong>Mathematics:</strong> Monday 9:00 AM</div>
                        <div class="card-meta"><strong>English:</strong> Tuesday 9:00 AM</div>
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderStudentResults() {
            const schoolData = DB.getSchoolData();
            const studentResults = schoolData.grades.filter(item => item.studentId === currentUser.id || item.studentName === currentUser.name);
            let html = `
                <div class="page-header"><h2>📊 Results & Report Cards</h2><p>Review your exam results and performance report with position.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Exam Results</div>
                        <div class="table-wrap">
                            <table>
                                <thead><tr><th>Subject</th><th>Exam</th><th>Marks</th><th>Grade</th><th>Position</th></tr></thead>
                                <tbody>${studentResults.length ? studentResults.map(item => `<tr><td>${item.subject}</td><td>${item.exam}</td><td>${item.marks}</td><td>${item.grade}</td><td>${item.position}</td></tr>`).join('') : '<tr><td colspan="5">No results yet.</td></tr>'}</tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-title">Report Card</div>
                        ${schoolData.reportCards.filter(item => item.studentId === currentUser.id || item.studentName === currentUser.name).map(item => `<div class="card-meta"><strong>Term:</strong> ${item.term}</div><div class="card-meta"><strong>Average:</strong> ${item.average}</div><div class="card-meta"><strong>Position:</strong> ${item.position}</div>`).join('') || '<div class="card-desc">No report card available yet.</div>'}
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderStudentAssignments() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>📝 Assignments & Notes</h2><p>Download notes and submit assignments.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Assignments</div>
                        <div class="card-desc">Current pending assignments for your class.</div>
                        ${DB.getExercises().map(ex => `<div class="card-meta">• ${ex.title} (${ex.subject || 'General'})</div>`).join('')}
                        <div class="card-action"><button class="btn-sm primary" onclick="alert('Assignment submission is enabled in the demo.')"><i class="fas fa-upload"></i> Submit</button></div>
                    </div>
                    <div class="card">
                        <div class="card-title">Notes</div>
                        <div class="card-desc">Shared lesson materials and notes.</div>
                        ${schoolData.lessons.map(item => `<div class="card-meta">• ${item.title} (${item.type})</div>`).join('')}
                        <div class="card-action"><button class="btn-sm warning" onclick="alert('Notes download is ready in the demo.')"><i class="fas fa-download"></i> Download</button></div>
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderAnnouncements() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>📢 Announcements</h2><p>Stay informed about school updates.</p></div>
                <div class="card-grid">
                    ${schoolData.announcements.map(item => `
                        <div class="card">
                            <div class="card-title">${item.title}</div>
                            <div class="card-desc">${item.message}</div>
                            <div class="card-meta"><strong>Audience:</strong> ${item.audience}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            content.innerHTML = html;
        }

        function renderStudentCommunications() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>💬 Communications</h2><p>Message teachers and classmates and join class groups.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Messages</div>
                        ${schoolData.communications.map(item => `<div class="card-meta">• ${item.type}: ${item.message}</div>`).join('')}
                    </div>
                    <div class="card">
                        <div class="card-title">Class Groups</div>
                        ${schoolData.groups.map(group => `<div class="card-meta">• ${group.name} (${group.members.length} members)</div>`).join('')}
                        <div class="card-action"><button class="btn-sm primary" onclick="alert('Class groups are ready in the demo.')"><i class="fas fa-users"></i> Join Group</button></div>
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        // ======================================================================
        //  TEACHER PORTAL PAGES
        // ======================================================================
        function renderTeacherClass() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>🏫 My Class & Timetable</h2><p>View your daily timetable, notes, and assignments.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Daily Timetable</div>
                        <div class="table-wrap">
                            <table>
                                <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Class</th></tr></thead>
                                <tbody>${schoolData.timetable.map(item => `<tr><td>${item.day}</td><td>${item.period}</td><td>${item.subject}</td><td>${item.className}</td></tr>`).join('')}</tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-title">Notes & Assignments</div>
                        <div class="card-desc">Create lesson notes and homework reminders from the teacher dashboard.</div>
                        <div class="card-meta">• Add notes and assign homework from the exercise and lesson panels.</div>
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderTeacherAttendance() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>✅ Attendance</h2><p>View student attendance history.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Attendance History</div>
                        <div class="table-wrap">
                            <table>
                                <thead><tr><th>Student</th><th>Date</th><th>Status</th><th>Note</th></tr></thead>
                                <tbody>${schoolData.attendance.map(item => `<tr><td>${item.studentName}</td><td>${item.date}</td><td>${item.present ? 'Present' : 'Absent'}</td><td>${item.note || '-'}</td></tr>`).join('')}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderTeacherGrades() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>📝 Grade Book</h2><p>Enter marks, exams, grades, and positions.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Marks Entry</div>
                        <div class="table-wrap">
                            <table>
                                <thead><tr><th>Student</th><th>Subject</th><th>Exam</th><th>Marks</th><th>Grade</th><th>Position</th></tr></thead>
                                <tbody>${schoolData.grades.map(item => `<tr><td>${item.studentName}</td><td>${item.subject}</td><td>${item.exam}</td><td>${item.marks}</td><td>${item.grade}</td><td>${item.position}</td></tr>`).join('')}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderTeacherLessons() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>📚 Lesson Planning</h2><p>Upload notes, assignments, past papers, and lesson plans.</p></div>
                <div class="card-grid">
                    ${schoolData.lessons.map(item => `
                        <div class="card">
                            <div class="card-title">${item.title}</div>
                            <div class="card-desc">${item.type}</div>
                            <div class="card-meta">File: ${item.fileName}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            content.innerHTML = html;
        }

        function renderTeacherCommunications() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>📣 Communications</h2><p>Message students and send homework reminders.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Messages</div>
                        ${schoolData.communications.map(item => `<div class="card-meta">• ${item.type}: ${item.message}</div>`).join('')}
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderTeacherReports() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>📈 Reports</h2><p>Generate report cards and review student performance.</p></div>
                <div class="card-grid">
                    ${schoolData.reportCards.map(item => `
                        <div class="card">
                            <div class="card-title">${item.studentName}</div>
                            <div class="card-desc">${item.term}</div>
                            <div class="card-meta"><strong>Average:</strong> ${item.average}</div>
                            <div class="card-meta"><strong>Position:</strong> ${item.position}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            content.innerHTML = html;
        }

        // ======================================================================
        //  ADMIN PORTAL PAGES
        // ======================================================================
        function renderAdminAcademics() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>🏫 Academic Setup</h2><p>Create classes, timetables, grading systems, and add subjects.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Classes</div>
                        ${schoolData.classes.map(item => `<div class="card-meta">• ${item.name} (Capacity: ${item.capacity})</div>`).join('')}
                    </div>
                    <div class="card">
                        <div class="card-title">Subjects</div>
                        ${schoolData.subjects.map(item => `<div class="card-meta">• ${item.name}</div>`).join('')}
                    </div>
                    <div class="card">
                        <div class="card-title">Timetable</div>
                        ${schoolData.timetable.map(item => `<div class="card-meta">• ${item.day} ${item.period} - ${item.subject}</div>`).join('')}
                    </div>
                    <div class="card">
                        <div class="card-title">Grading Systems</div>
                        ${schoolData.gradingSystems.map(item => `<div class="card-meta">• ${item.name} | Scale: ${item.scale} | Passing: ${item.passing}%</div>`).join('')}
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderAdminStudents() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>🎓 Student Records</h2><p>Enroll new students and manage admissions.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Admissions</div>
                        <div class="table-wrap">
                            <table>
                                <thead><tr><th>Student</th><th>Class</th><th>Status</th></tr></thead>
                                <tbody>${schoolData.admissions.map(item => `<tr><td>${item.studentName}</td><td>${item.className}</td><td>${item.status}</td></tr>`).join('')}</tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-title">Profiles</div>
                        ${schoolData.studentProfiles.map(item => `<div class="card-meta">• ${item.username} | ${item.className}</div>`).join('')}
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderAdminReports() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>📊 Reports & Analysis</h2><p>Review enrollment status, performance, and graphs.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">Enrollment Status</div>
                        <div class="card-desc">${schoolData.admissions.length} admissions recorded.</div>
                    </div>
                    <div class="card">
                        <div class="card-title">Performance Reports</div>
                        ${schoolData.reportCards.map(item => `<div class="card-meta">• ${item.studentName}: ${item.average} average, position ${item.position}</div>`).join('')}
                    </div>
                    <div class="card">
                        <div class="card-title">Graphs</div>
                        <div class="card-desc">Performance trends are displayed as summary cards in this demo.</div>
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        function renderAdminSettings() {
            const schoolData = DB.getSchoolData();
            let html = `
                <div class="page-header"><h2>⚙️ System Settings</h2><p>Add school logo and configure portal permissions.</p></div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">School Logo</div>
                        <img src="${schoolData.settings.schoolLogo}" alt="School logo" style="width:100%;max-width:220px;border-radius:10px;" />
                    </div>
                    <div class="card">
                        <div class="card-title">Portal Permissions</div>
                        ${schoolData.settings.portalPermissions.map(item => `<div class="card-meta">• ${item}</div>`).join('')}
                    </div>
                </div>
            `;
            content.innerHTML = html;
        }

        // ======================================================================
        //  CHAT
        // ======================================================================
        function renderChat() {
            const users = DB.getUsers().filter(u => u.id !== currentUser.id);
            const messages = DB.getMessages();
            const activeChatUser = getDefaultChatUser(users);
            if (activeChatUser && !selectedChatUser) selectedChatUser = activeChatUser;

            let html = `
                <div class="page-header"><h2>💬 Chat</h2><p>Connect with teachers and classmates.</p></div>
                <div class="chat-container">
                    <div class="chat-header">
                        <span><i class="fas fa-comment-dots"></i> 
                            ${activeChatUser ? 'Chat with ' + (DB.getUsers().find(u => u.id === activeChatUser)?.name || 'User') : 'Select a contact'}
                        </span>
                        <select id="chatUserSelect" onchange="selectChatUser(this.value)">
                            <option value="">-- Select --</option>
                            ${users.map(u => `<option value="${u.id}" ${activeChatUser === u.id ? 'selected' : ''}>${u.name} (${u.role})</option>`).join('')}
                        </select>
                    </div>
                    <div class="chat-messages" id="chatMessagesContainer">
            `;

            if (activeChatUser) {
                const chatMsgs = messages.filter(m =>
                    (m.senderId === currentUser.id && m.receiverId === activeChatUser) ||
                    (m.senderId === activeChatUser && m.receiverId === currentUser.id)
                ).sort((a, b) => a.timestamp - b.timestamp);

                if (chatMsgs.length === 0) {
                    html += `<div class="empty-chat">No messages yet. Say hello!</div>`;
                } else {
                    chatMsgs.forEach(m => {
                        const isSent = m.senderId === currentUser.id;
                        const sender = DB.getUsers().find(u => u.id === m.senderId);
                        html += `
                            <div class="msg ${isSent ? 'sent' : 'received'}">
                                ${!isSent ? `<span class="msg-sender">${sender?.name || 'Unknown'}</span>` : ''}
                                ${m.content}
                                <span class="msg-time">${new Date(m.timestamp).toLocaleTimeString()}</span>
                            </div>
                        `;
                    });
                }
            } else {
                html += `<div class="empty-chat"><i class="fas fa-users" style="font-size:32px;display:block;margin-bottom:10px;"></i>No contacts available right now.</div>`;
            }

            html += `
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="chatInput" placeholder="Type a message..." ${!activeChatUser ? 'disabled' : ''} />
                        <button onclick="sendMessage()" ${!activeChatUser ? 'disabled' : ''}><i class="fas fa-paper-plane"></i> Send</button>
                    </div>
                </div>
            `;
            content.innerHTML = html;

            // scroll to bottom
            const container = document.getElementById('chatMessagesContainer');
            if (container) container.scrollTop = container.scrollHeight;

            // Enter key
            const input = document.getElementById('chatInput');
            if (input) {
                input.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMessage(); });
            }
        }

        function selectChatUser(userId) {
            selectedChatUser = userId;
            renderChat();
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            if (!input || !selectedChatUser) return;
            const text = input.value.trim();
            if (!text) return;
            const messages = DB.getMessages();
            messages.push({
                id: DB.id(),
                senderId: currentUser.id,
                receiverId: selectedChatUser,
                content: text,
                timestamp: Date.now(),
                read: false
            });
            DB.setMessages(messages);
            input.value = '';
            renderChat();
            // scroll
            const container = document.getElementById('chatMessagesContainer');
            if (container) container.scrollTop = container.scrollHeight;
        }

        // ======================================================================
        //  AI ASSISTANT
        // ======================================================================
        function escapeHtml(text) {
            return String(text)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function renderAI() {
            const chats = DB.getAiChats().filter(c => c.userId === currentUser.id);
            let html = `
                <div class="page-header"><h2>🤖 AI Assistant</h2><p>Ask me anything about your studies!</p></div>
                <div class="ai-container">
                    <div class="ai-header"><i class="fas fa-robot"></i> School AI Assistant</div>
                    <div class="ai-messages" id="aiMessagesContainer">
            `;
            if (chats.length === 0) {
                html += `<div class="empty-chat"><i class="fas fa-robot" style="font-size:32px;display:block;margin-bottom:10px;"></i>Ask me a question to get started!</div>`;
            } else {
                chats.forEach(c => {
                    const images = Array.isArray(c.images) ? c.images : [];
                    html += `
                        <div class="ai-msg user">${escapeHtml(c.message)}</div>
                        <div class="ai-msg bot"><span class="ai-label"><i class="fas fa-robot"></i> AI</span>${escapeHtml(c.response || '')}</div>
                    `;
                    if (images.length > 0) {
                        html += `
                            <div class="ai-msg bot">
                                <div class="ai-photo-grid">
                                    ${images.map(img => `
                                        <div class="ai-photo-card">
                                            <a href="${img}" target="_blank" rel="noopener noreferrer">
                                                <img src="${img}" alt="Visual result for ${escapeHtml(c.message)}" />
                                            </a>
                                            <div class="ai-photo-caption">Suggested photo</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }
                });
            }
            html += `
                    </div>
                    <div class="ai-input-area">
                        <input type="text" id="aiInput" placeholder="Ask a question..." />
                        <button onclick="sendAI()"><i class="fas fa-paper-plane"></i> Ask</button>
                    </div>
                </div>
            `;
            content.innerHTML = html;

            const input = document.getElementById('aiInput');
            if (input) {
                input.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendAI(); });
            }
            const container = document.getElementById('aiMessagesContainer');
            if (container) container.scrollTop = container.scrollHeight;
        }

        async function searchWeb(query) {
            const targets = [
                `https://r.jina.ai/http://www.bing.com/search?q=${encodeURIComponent(query)}`,
                `https://r.jina.ai/http://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`
            ];

            for (const url of targets) {
                try {
                    const response = await fetch(url, { headers: { Accept: 'text/plain' } });
                    if (!response.ok) continue;
                    const text = await response.text();
                    const lines = text
                        .replace(/^Title:.*$/m, '')
                        .replace(/^URL Source:.*$/m, '')
                        .replace(/^Markdown Content:\s*/m, '')
                        .split(/\n+/)
                        .map(line => line.trim())
                        .filter(Boolean)
                        .filter(line => !line.startsWith('*'))
                        .slice(0, 8)
                        .join(' ')
                        .replace(/\s+/g, ' ')
                        .trim();

                    if (lines) {
                        return lines.length > 500 ? lines.slice(0, 500) + '...' : lines;
                    }
                } catch (error) {
                    console.warn('Web search failed:', error);
                }
            }
            return null;
        }

        async function getPhotoSuggestions(query, max = 3) {
            const cleanQuery = (query || '').trim().split(/\s+/).slice(0, 4).join(' ');
            if (!cleanQuery) return [];

            const urls = [];
            const seed = encodeURIComponent(cleanQuery);
            urls.push(`https://source.unsplash.com/featured/600x400/?${seed}`);
            urls.push(`https://source.unsplash.com/featured/600x400/?${seed},study`);
            urls.push(`https://source.unsplash.com/featured/600x400/?${seed},education`);
            return urls.slice(0, max);
        }

        async function sendAI() {
            const input = document.getElementById('aiInput');
            if (!input) return;
            const text = input.value.trim();
            if (!text) return;

            const result = await getAIResponse(text);
            const chats = DB.getAiChats();
            chats.push({ id: DB.id(), userId: currentUser.id, message: text, response: result.text, images: result.images || [], timestamp: Date.now() });
            DB.setAiChats(chats);
            input.value = '';
            renderAI();
            const container = document.getElementById('aiMessagesContainer');
            if (container) container.scrollTop = container.scrollHeight;
        }

        async function getAIResponse(query) {
            const q = query.toLowerCase();
            if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
                return { text: 'Hello! 👋 How can I help you with your studies today?', images: [] };
            }
            if (q.includes('math') || q.includes('algebra') || q.includes('equation')) {
                return { text: 'I can help with math! The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. Need help with a specific problem?', images: await getPhotoSuggestions(query) };
            }
            if (q.includes('science') || q.includes('biology') || q.includes('chemistry') || q.includes('physics')) {
                return { text: 'Science is fascinating! 🌍 I can help with biology, chemistry, physics, and more. What topic are you studying?', images: await getPhotoSuggestions(query) };
            }
            if (q.includes('history') || q.includes('essay') || q.includes('writing')) {
                return { text: 'For history essays, start with a clear thesis, use primary sources, and structure your argument chronologically or thematically. Need more specific advice?', images: await getPhotoSuggestions(query) };
            }
            if (q.includes('homework') || q.includes('assign') || q.includes('due')) {
                return { text: 'Homework can be challenging! 📚 Break it into small tasks, start early, and don\'t hesitate to ask for help. Which subject are you working on?', images: await getPhotoSuggestions(query) };
            }
            if (q.includes('exam') || q.includes('test') || q.includes('quiz')) {
                return { text: 'For exams, I recommend: 1) Review your notes daily, 2) Practice with past papers, 3) Get enough sleep, and 4) Stay hydrated! Good luck! 🍀', images: await getPhotoSuggestions(query) };
            }
            if (q.includes('thank')) {
                return { text: 'You\'re welcome! 😊 I\'m here to help. Feel free to ask anything else!', images: [] };
            }
            if (q.includes('help')) {
                return { text: 'I\'m here to help! I can assist with math, science, history, writing, study tips, and more. What do you need?', images: await getPhotoSuggestions(query) };
            }

            const webInfo = await searchWeb(query);
            const images = await getPhotoSuggestions(query);
            if (webInfo) {
                return { text: `I checked the web for that topic and found a useful summary: ${webInfo}`, images };
            }

            return { text: `That's a great question! 🤔 I'm still learning, but I can suggest: break it down, look for patterns, and don't forget to ask your teacher for guidance. You've got this! 💪`, images };
        }
        

        // ======================================================================
        //  TEACHER: MANAGE EXERCISES
        // ======================================================================
        function renderManageExercises() {
            const exercises = DB.getExercises().filter(e => e.teacherId === currentUser.id);
            let html = `
                <div class="page-header flex-between">
                    <div><h2>📚 Manage Exercises</h2><p>Create and manage assignments for your students.</p></div>
                    <button class="btn-sm primary" onclick="showAddExerciseModal()"><i class="fas fa-plus"></i> New Exercise</button>
                </div>
                <div class="card-grid">
            `;
            if (exercises.length === 0) {
                html += `<div class="empty-state"><i class="fas fa-pencil-alt"></i>You haven't created any exercises yet.</div>`;
            } else {
                exercises.forEach(ex => {
                    html += `
                        <div class="card">
                            <div class="card-title">${ex.title}</div>
                            <div class="card-desc">${ex.description}</div>
                            <div class="card-meta"><i class="fas fa-book"></i> ${ex.subject || 'General'}</div>
                            <div class="card-meta"><i class="fas fa-calendar-alt"></i> Due: ${ex.dueDate ? new Date(ex.dueDate).toLocaleDateString() : 'No due date'}</div>
                            <div class="card-action">
                                <button class="btn-sm danger" onclick="deleteExercise('${ex.id}')"><i class="fas fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    `;
                });
            }
            html += `</div>`;
            content.innerHTML = html;
        }

        function showAddExerciseModal() {
            showModal('New Exercise', 'Create an assignment for your students.', `
                <div class="form-group"><label>Title</label><input type="text" id="exTitle" placeholder="Exercise title" /></div>
                <div class="form-group"><label>Description</label><textarea id="exDesc" rows="3" style="width:100%;padding:10px;border:2px solid var(--gray-200);border-radius:8px;font-size:14px;outline:none;" placeholder="Describe the exercise..."></textarea></div>
                <div class="form-group"><label>Subject</label><input type="text" id="exSubject" placeholder="e.g. Mathematics" /></div>
                <div class="form-group"><label>Due Date</label><input type="date" id="exDue" /></div>
            `, () => {
                const title = document.getElementById('exTitle').value.trim();
                const desc = document.getElementById('exDesc').value.trim();
                const subject = document.getElementById('exSubject').value.trim();
                const due = document.getElementById('exDue').value;
                if (!title || !desc) { alert('Please fill in title and description.'); return; }
                const exercises = DB.getExercises();
                exercises.push({ id: DB.id(), title, description: desc, subject: subject || 'General',
                    teacherId: currentUser.id, createdAt: Date.now(), dueDate: due ? new Date(due).getTime() :
                        null });
                DB.setExercises(exercises);
                closeModal();
                renderManageExercises();
            });
        }

        function deleteExercise(id) {
            if (!confirm('Delete this exercise?')) return;
            let exercises = DB.getExercises();
            exercises = exercises.filter(e => e.id !== id);
            DB.setExercises(exercises);
            renderManageExercises();
        }

        // ======================================================================
        //  TEACHER: MANAGE ACTIVITIES
        // ======================================================================
        function renderManageActivities() {
            const activities = DB.getActivities().filter(a => a.teacherId === currentUser.id);
            let html = `
                <div class="page-header flex-between">
                    <div><h2>🎯 Manage Activities</h2><p>Create and manage class activities.</p></div>
                    <button class="btn-sm primary" onclick="showAddActivityModal()"><i class="fas fa-plus"></i> New Activity</button>
                </div>
                <div class="card-grid">
            `;
            if (activities.length === 0) {
                html += `<div class="empty-state"><i class="fas fa-tasks"></i>You haven't created any activities yet.</div>`;
            } else {
                activities.forEach(act => {
                    html += `
                        <div class="card">
                            <div class="card-title">${act.title}</div>
                            <div class="card-desc">${act.description}</div>
                            <div class="card-meta"><i class="fas fa-tag"></i> ${act.type || 'Activity'}</div>
                            <div class="card-action">
                                <button class="btn-sm danger" onclick="deleteActivity('${act.id}')"><i class="fas fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    `;
                });
            }
            html += `</div>`;
            content.innerHTML = html;
        }

        function showAddActivityModal() {
            showModal('New Activity', 'Create a new class activity.', `
                <div class="form-group"><label>Title</label><input type="text" id="actTitle" placeholder="Activity title" /></div>
                <div class="form-group"><label>Description</label><textarea id="actDesc" rows="3" style="width:100%;padding:10px;border:2px solid var(--gray-200);border-radius:8px;font-size:14px;outline:none;" placeholder="Describe the activity..."></textarea></div>
                <div class="form-group"><label>Type</label><input type="text" id="actType" placeholder="e.g. Discussion, Quiz, Review" /></div>
            `, () => {
                const title = document.getElementById('actTitle').value.trim();
                const desc = document.getElementById('actDesc').value.trim();
                const type = document.getElementById('actType').value.trim();
                if (!title || !desc) { alert('Please fill in title and description.'); return; }
                const activities = DB.getActivities();
                activities.push({ id: DB.id(), title, description: desc, type: type || 'Activity',
                    teacherId: currentUser.id, createdAt: Date.now() });
                DB.setActivities(activities);
                closeModal();
                renderManageActivities();
            });
        }

        function deleteActivity(id) {
            if (!confirm('Delete this activity?')) return;
            let activities = DB.getActivities();
            activities = activities.filter(a => a.id !== id);
            DB.setActivities(activities);
            renderManageActivities();
        }

        // ======================================================================
        //  ADMIN: MANAGE USERS
        // ======================================================================
        function renderUsers() {
            const users = DB.getUsers();
            let html = `
                <div class="page-header flex-between">
                    <div><h2>👥 Manage Users</h2><p>View and manage all users on the platform.</p></div>
                    <button class="btn-sm primary" onclick="showAddUserModal()"><i class="fas fa-user-plus"></i> Add User</button>
                </div>
                <div class="table-wrap">
                    <table>
                        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                        <tbody>
            `;
            if (users.length === 0) {
                html += `<tr><td colspan="4" class="text-center text-muted">No users found.</td></tr>`;
            } else {
                users.forEach(u => {
                    const isSelf = u.id === currentUser.id;
                    html += `
                        <tr>
                            <td>${u.name} ${isSelf ? '📍' : ''}</td>
                            <td>${u.email}</td>
                            <td><span class="role-badge ${u.role}">${u.role}</span></td>
                            <td>
                                <div class="admin-actions">
                                    ${!isSelf ? `
                                        <button class="btn-sm warning" onclick="editUserRole('${u.id}')"><i class="fas fa-edit"></i> Role</button>
                                        <button class="btn-sm danger" onclick="deleteUser('${u.id}')"><i class="fas fa-trash"></i> Delete</button>
                                    ` : '<span class="text-muted">You</span>'}
                                </div>
                            </td>
                        </tr>
                    `;
                });
            }
            html += `</tbody></table></div>`;
            content.innerHTML = html;
        }

        function showAddUserModal() {
            showModal('Add User', 'Create a new user account.', `
                <div class="form-group"><label>Full Name</label><input type="text" id="newUserName" placeholder="Full name" /></div>
                <div class="form-group"><label>Email</label><input type="email" id="newUserEmail" placeholder="Email" /></div>
                <div class="form-group"><label>Password</label><input type="password" id="newUserPassword" placeholder="Password" /></div>
                <div class="form-group"><label>Role</label>
                    <select id="newUserRole">
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            `, () => {
                const name = document.getElementById('newUserName').value.trim();
                const email = document.getElementById('newUserEmail').value.trim();
                const password = document.getElementById('newUserPassword').value.trim();
                const role = document.getElementById('newUserRole').value;
                if (!name || !email || !password) { alert('Please fill in all fields.'); return; }
                if (password.length < 4) { alert('Password must be at least 4 characters.'); return; }
                const users = DB.getUsers();
                if (users.find(u => u.email === email)) { alert('Email already exists.'); return; }
                users.push({ id: DB.id(), name, email, password, role, createdAt: Date.now() });
                DB.setUsers(users);
                closeModal();
                renderUsers();
            });
        }

        function editUserRole(id) {
            const users = DB.getUsers();
            const user = users.find(u => u.id === id);
            if (!user) return;
            showModal('Change Role', `Update role for ${user.name}.`, `
                <div class="form-group"><label>New Role</label>
                    <select id="editRoleSelect">
                        <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
                        <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </div>
            `, () => {
                const newRole = document.getElementById('editRoleSelect').value;
                user.role = newRole;
                DB.setUsers(users);
                closeModal();
                renderUsers();
            });
        }

        function deleteUser(id) {
            if (!confirm('Delete this user? This action cannot be undone.')) return;
            let users = DB.getUsers();
            users = users.filter(u => u.id !== id);
            DB.setUsers(users);
            renderUsers();
        }
         // ======================================================================
        //  MODAL SYSTEM
        // ======================================================================
        let modalCallback = null;

        function showModal(title, desc, bodyHTML, onConfirm) {
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalBody.innerHTML = bodyHTML;
            modalOverlay.classList.add('show');
            modalCallback = onConfirm;
            modalConfirm.style.display = 'inline-block';
            modalConfirm.textContent = 'Confirm';
            modalConfirm.className = 'btn-confirm';
        }

        function closeModal() {
            modalOverlay.classList.remove('show');
            modalCallback = null;
        }

        modalCancel.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
        modalConfirm.addEventListener('click', function() {
            if (modalCallback) modalCallback();
        });

        // ======================================================================
        //  AUTO-LOGIN CHECK & INIT
        // ======================================================================
        (function boot() {
            DB.seed();
            const user = DB.getCurrentUser();
            if (user) {
                currentUser = user;
                loginPage.style.display = 'none';
                mainApp.classList.add('show');
                initApp();
            } else {
                loginPage.style.display = 'flex';
                mainApp.classList.remove('show');
                switchToLogin();
            }
        })();

        //=======================================================================
        // make functions global for inline onclick
        //=======================================================================
        window.selectChatUser = selectChatUser;
        window.sendMessage = sendMessage;
        window.sendAI = async function() {
            const input = document.getElementById('aiInput');
            if (!input) return;
            const text = input.value.trim();
            if (!text) return;
            const result = await getAIResponse(text);
            const chats = DB.getAiChats();
            chats.push({ id: DB.id(), userId: currentUser.id, message: text, response: result.text, images: result.images || [], timestamp: Date.now() });
            DB.setAiChats(chats);
            input.value = '';
            renderAI();
            const container = document.getElementById('aiMessagesContainer');
            if (container) container.scrollTop = container.scrollHeight;
        };
        window.renderAI = renderAI;
        window.getAIResponse = getAIResponse;
        window.showAddNoteModal = showAddNoteModal;
        window.editNote = editNote;
        window.deleteNote = deleteNote;
        window.showAddExerciseModal = showAddExerciseModal;
        window.deleteExercise = deleteExercise;
        window.showAddActivityModal = showAddActivityModal;
        window.deleteActivity = deleteActivity;
        window.showAddUserModal = showAddUserModal;
        window.editUserRole = editUserRole;
        window.deleteUser = deleteUser;
        window.showModal = showModal;
        window.closeModal = closeModal;
        window.navigateTo = navigateTo;
        window.logout = logout;

        console.log('🏫 SchoolPortal loaded successfully!');
        console.log('👤 Default accounts:');
        console.log('  Admin: admin@school.com / admin123');
        console.log('  Teacher: teacher@school.com / teacher123');
        console.log('  Student: student@school.com / student123');
        console.log('  Student: alice@school.com / alice123');
        console.log('🔑 Admin code: ADMIN2026 | Teacher code: TEACHER2026');
        console.log('📧 Gmail verification code: 123456 (demo)');
    
