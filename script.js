document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const chatBody = document.getElementById("chatBody");
  const quickReplies = document.getElementById("quickReplies");
  const inputField = document.getElementById("userInput");

  if (!chatBody) return;

  // 1) Greeting (single source of truth)
  addBot("Hi, I’m Edith’s AI concierge. You can ask about experience, applied projects, or the AI venture.");

  // 2) Toggle (single class name)
  window.toggleChat = () => {
    chatWindow?.classList.toggle("open");
  };

  // 3) Quick replies
  if (quickReplies) {
    quickReplies.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-topic]");
      if (!btn) return;
      const topic = btn.dataset.topic;
      handleTopic(topic);
    });
  }

  // 4) Enter to send
  window.checkEnter = (event) => {
    if (event.key === "Enter") sendUserMessage();
  };

  window.sendUserMessage = () => {
    const text = (inputField?.value || "").trim();
    if (!text) return;
    addUser(text);
    inputField.value = "";

    const reply = getResponse(text);
    setTimeout(() => addBot(reply), 400);
  };

  function handleTopic(topic) {
    const topicMap = {
      experience: "Tell me about Edith’s experience.",
      projects: "What projects is she working on?",
      skills: "What are her tech skills?",
      venture: "Tell me about her AI venture.",
      joke: "Tell me a joke.",
      contact: "How can I contact her?"
    };
    const userText = topicMap[topic] || "Tell me more.";
    addUser(userText);
    const reply = getResponse(userText);
    setTimeout(() => addBot(reply), 350);
  }

  // Safe renderers
  function addUser(text) {
    const div = document.createElement("div");
    div.className = "message user-message";
    div.textContent = text; // XSS-safe
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addBot(text) {
    const div = document.createElement("div");
    div.className = "message bot-message";
    div.textContent = text; // keep plain text for safety + professionalism
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Response logic
  function getResponse(input) {
    const text = input.toLowerCase();

    // Venture
    if (hasAny(text, ["asktaxly", "tax", "venture", "ai platform"])) {
      return "Edith is building an applied AI platform focused on reducing complexity and error in cross-border tax and financial compliance, with audit-friendly workflows and professional oversight. You can view the platform at asktaxly.com.";
    }

    // Projects (careful: no overclaims)
    if (hasAny(text, ["project", "projects", "mayo", "ecolab", "mss", "work"])) {
      return "Edith works on applied initiatives across healthcare operations, risk governance, and commercial finance transformation. If you want, ask about Mayo Clinic, Ecolab, or risk governance work.";
    }

    // Mayo (in progress wording)
    if (hasAny(text, ["mayo", "hospital", "tote", "logistics"])) {
      return "At Mayo Clinic, Edith is working on a root cause analysis of inventory logistics and tote utilization across distribution workflows, focusing on drivers of underutilization and process improvement opportunities.";
    }

    // Ecolab (completed, quantified ok)
    if (hasAny(text, ["ecolab", "flat fee", "margin", "pricing"])) {
      return "At Ecolab, Edith evaluated flat-fee billing arrangements and built models to improve margin visibility and decision-making, identifying approximately $18M in potential margin improvement.";
    }

    // Risk governance (avoid 'intern' label)
    if (hasAny(text, ["risk", "security", "vulnerability", "controls", "governance"])) {
      return "Edith designed a standardized risk assessment framework covering security, vulnerability, and operational risk domains to support consistent risk identification and governance oversight.";
    }

    // Experience
    if (hasAny(text, ["experience", "background", "citi", "portfolio"])) {
      return "Edith has 10+ years in finance transformation and enterprise delivery. Most recently, she managed portfolio governance at Citi, including a $65M+ technology portfolio, with a focus on controls, execution, and measurable outcomes.";
    }

    // Skills (avoid listing systems you cannot defend)
    if (hasAny(text, ["skills", "tech", "python", "sql", "power bi", "azure"])) {
      return "She bridges finance and technology. Core tools include Python, SQL, Power BI, and automation workflows, with enterprise governance and delivery in regulated environments. Credentials include CPA and PMP.";
    }

    // Contact
    if (hasAny(text, ["contact", "email", "linkedin", "calendly"])) {
      return "You can connect with Edith on LinkedIn or use the Calendly link on this site to schedule time.";
    }

    // Joke
    if (hasAny(text, ["joke", "fun", "laugh"])) {
      return randomJoke();
    }

    // Fallback
    return "You can ask about experience, applied projects, the AI venture, tech skills, or how to connect.";
  }

  function hasAny(text, keywords) {
    return keywords.some((k) => text.includes(k));
  }

  function randomJoke() {
    const jokes = [
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
      "What do you call a fake noodle? An impasta.",
      "Why don’t skeletons fight each other? They don’t have the guts.",
      "I told my computer I needed a break, and now it won’t stop sending me break reminders."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
});
