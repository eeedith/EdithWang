/* =========================================
   1. REVEAL ANIMATION (Makes site visible)
   ========================================= */
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;
        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
    }
}

// Trigger once on load so the banner appears immediately
reveal();


/* =========================================
   2. DARK MODE TOGGLE
   ========================================= */
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector('#theme-toggle i');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        icon.style.color = "#ffa500"; 
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        icon.style.color = ""; 
    }
}


/* =========================================
   3. CHATBOT LOGIC
   ========================================= */

// Define these functions globally so HTML onclick="" works
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');

    // NOTE: Your CSS likely uses 'active' to show the window
    chatWindow.classList.toggle('active');

    // Greeting: If opening AND chat is empty, say hello
    if (chatWindow.classList.contains('active') && chatBody.innerHTML.trim() === "") {
        addBot("Hi, I’m Edith’s AI concierge. You can ask about experience, applied projects, or the AI venture.");
    }
}

function checkEnter(event) {
    if (event.key === "Enter") sendUserMessage();
}

function handleInput(text) {
    const input = document.getElementById('userInput');
    if(input) {
        input.value = text;
        sendUserMessage();
    }
}

function sendUserMessage() {
    const inputField = document.getElementById('userInput');
    const text = inputField.value.trim();
    if (!text) return;

    addUser(text);
    inputField.value = ""; 

    setTimeout(() => {
        const reply = getResponse(text);
        addBot(reply);
    }, 600);
}

// --- Helper Functions ---

function addUser(text) {
    const chatBody = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = "message user-message";
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addBot(text) {
    const chatBody = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = "message bot-message";
    div.innerHTML = text; // innerHTML allows bolding <b>
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- Quick Replies Listener ---
// We wait for DOM to load to attach this event listener
document.addEventListener("DOMContentLoaded", () => {
    const quickReplies = document.getElementById("quickReplies");
    if (quickReplies) {
        quickReplies.addEventListener("click", (e) => {
            const btn = e.target.closest("button");
            if (!btn) return;
            
            const topic = btn.getAttribute("data-topic");
            const topicMap = {
                'experience': "Tell me about your experience.",
                'projects': "What projects have you worked on?",
                'skills': "What are your technical skills?",
                'venture': "Tell me about your AI venture.",
                'contact': "How can I contact you?"
            };
            const text = topicMap[topic] || btn.innerText;
            handleInput(text);
        });
    }
});

// --- The Brain (Response Logic) ---
function getResponse(input) {
    const text = input.toLowerCase();

    // Hidden/Specific Logic
    if (text.includes('mayo') || text.includes('hospital') || text.includes('tote')) {
        return "At <b>Mayo Clinic</b>, I led a root cause analysis on a 40-50% tote underutilization issue. I optimized workflows to reduce transportation waste."; 
    }
    if (text.includes('ecolab') || text.includes('margin') || text.includes('flat fee')) {
        return "At <b>Ecolab</b>, I evaluated 'Flat Fee' billing arrangements. My models identified margin growth opportunities and improved cash collection.";
    }
    if (text.includes('tax') || text.includes('venture') || text.includes('ai agent')) {
        return "I am the founder of <b>AskTaxly AI</b>. We use Python & LLMs to automate complex cross-border tax compliance.";
    }

    // Core Logic
    if (text.includes('experience') || text.includes('background') || text.includes('work')) {
        return "I have 10+ years in Finance Transformation. I've led projects in Healthcare and Commercial sectors, and currently work in Governance at Citi.";
    }
    if (text.includes('skill') || text.includes('tech')) {
        return "I bridge Finance and Tech. My toolkit includes <b>Python</b> (for automation), <b>Power BI</b>, and <b>Azure</b> cloud infrastructure.";
    }
    if (text.includes('joke') || text.includes('fun')) {
        const jokes = [
            "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
            "What do you call a fake noodle? An Impasta! 🍝",
            "I told my computer I needed a break, and now it won't stop sending me Kit-Kats. 🍫"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (text.includes('contact') || text.includes('email') || text.includes('chat')) {
        return "You can find my LinkedIn at the top, or schedule a coffee chat via Calendly.";
    }

    return "That's interesting! You can ask me about my <b>Experience</b>, my <b>Tech Skills</b>, or I can tell you a <b>Joke</b>! 😄";
}
