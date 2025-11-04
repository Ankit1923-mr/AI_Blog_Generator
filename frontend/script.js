/**
 * script.js
 * Chat-like UI behaviour and backend wiring.
 * - inserts user / ai message bubbles
 * - sends POST to /generate on same origin
 * - simulates streaming (typewriter) for better UX
 * - maintains a small in-memory conversations list in frontend
 */

/* ---------- config ---------- */
// Auto-detect backend port for local dev (5500 → 5000)
// const BACKEND_URL = window.location.port === '5500'
//   ? 'http://127.0.0.1:5000/generate'
//   : window.location.origin + '/generate';
const BACKEND_URL = "https://ai-blog-generator-backend.onrender.com/generate";

const messagesEl = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const topicInput = document.getElementById('topicInput');
const personaSelect = document.getElementById('personaSelect');
const toneSelect = document.getElementById('toneSelect');
const latencyEl = document.getElementById('latency');
const newChatBtn = document.getElementById('newChatBtn');
const convosEl = document.getElementById('convos');

/* ---------- state ---------- */
let convoHistory = []; // small front-end history
let currentConvoId = null;

/* ---------- helpers ---------- */
function el(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }

function appendUserMessage(text){
  const row = el('div','msg user');
  const bubble = el('div','bubble');
  bubble.innerText = text;
  const avatar = el('div','avatar'); avatar.innerText = 'You';
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  scrollToBottom();
  return row;
}

function appendAiMessage(initialText = '...'){
  const row = el('div','msg ai');
  const avatar = el('div','avatar'); avatar.innerText = 'AI';
  const bubble = el('div','bubble');
  bubble.innerHTML = initialText;
  row.appendChild(avatar);
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  scrollToBottom();
  return {row, bubble};
}

function scrollToBottom(){
  messagesEl.parentElement.scrollTop = messagesEl.parentElement.scrollHeight;
}

function formatMarkdownToHTML(md){
  // Minimal safe markdown transformer:
  // We'll do headings, bold, lists, paragraphs, newlines -> <br>
  // Keep it small and deterministic; backend returns Markdown-like text.
  // Replace headings
  let html = md.replace(/\r\n/g,'\n');
  // headings
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  // bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  // lists (naive)
  html = html.replace(/^\s*-\s+(.*)/gim, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gim, function(m){
    // wrap contiguous lis into ul
    return `<ul>${m}</ul>`;
  });
  // paragraphs - lines separated by two newlines
  html = html.replace(/\n\n+/g, '</p><p>');
  // single newlines -> <br>
  html = html.replace(/\n/g, '<br>');
  // wrap paragraphs
  html = '<p>' + html + '</p>';
  // cleanup empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g,'');
  return html;
}

/* streaming typewriter to bubble */
function streamToBubble(bubbleEl, text, speed=14){
  bubbleEl.innerHTML = ''; // start empty
  let i=0;
  const t = setInterval(() => {
    if(i>=text.length){ clearInterval(t); return; }
    const next = text.charAt(i);
    // append; for safety use text nodes
    bubbleEl.appendChild(document.createTextNode(next));
    i++;
    // keep scrolling visible
    scrollToBottom();
  }, speed);
  return t;
}

/* slightly nicer typewriter that writes chunk-by-chunk and respects basic markup */
function streamMarkdown(bubbleEl, rawText, speed=6){
  // we prefer to populate using text nodes, and convert markdown blocks as they complete.
  // For simplicity, simulate progressive append and after finish convert to HTML.
  bubbleEl.innerText = '';
  let i=0;
  const t = setInterval(()=>{
    if(i>=rawText.length){ clearInterval(t);
      // final render to HTML
      bubbleEl.innerHTML = formatMarkdownToHTML(rawText);
      return;
    }
    bubbleEl.appendChild(document.createTextNode(rawText.charAt(i)));
    i++;
    scrollToBottom();
  }, speed);
  return t;
}

/* ---------- network / generation ---------- */
async function generateBlog(topic, options = {}){
  // options: persona, tone, length...
  const payload = { topic, options };
    const input = document.querySelector('.composer-input');
    input.classList.add('flash');
    setTimeout(() => input.classList.remove('flash'), 800);

  const start = Date.now();
  try{
    const resp = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    const latency = Date.now() - start;
    latencyEl.innerText = `${latency} ms`;

    if(!resp.ok){
      const txt = await resp.text().catch(()=>('Server error'));
      throw new Error(`Server returned ${resp.status}: ${txt}`);
    }
    const data = await resp.json();
    return data;
  }catch(err){
    latencyEl.innerText = 'error';
    throw err;
  }
}

/* ---------- conversation management UI ---------- */
function addConvoItem(topic, id){
  const item = el('div','conv-item');
  item.innerText = topic;
  item.dataset.id = id;
  item.addEventListener('click', ()=>{
    // naive: load conversation messages from history array
    loadConversation(id);
  });
  convosEl.prepend(item);
}

/* local convo store helper */
function createConvo(topic){
  const id = 'c_' + Date.now();
  const convo = { id, topic, messages: [] };
  convoHistory.push(convo);
  addConvoItem(topic, id);
  currentConvoId = id;
  return convo;
}
function getCurrentConvo(){
  return convoHistory.find(c => c.id === currentConvoId) || null;
}
function saveMessageToConvo(role, text){
  const convo = getCurrentConvo();
  if(!convo) return;
  convo.messages.push({role, text, ts: Date.now()});
}

/* load convo */
function loadConversation(id){
  const convo = convoHistory.find(c => c.id === id);
  if(!convo) return;
  messagesEl.innerHTML = '';
  // re-render messages
  for(const m of convo.messages){
    if(m.role === 'user'){
      const row = appendUserMessage(m.text);
    } else if(m.role === 'ai'){
      // append static ai message (render markdown)
      const {row, bubble} = appendAiMessage();
      bubble.innerHTML = formatMarkdownToHTML(m.text);
    }
  }
  currentConvoId = id;
}

/* create new chat */
newChatBtn.addEventListener('click', ()=>{
  currentConvoId = null;
  messagesEl.innerHTML = '';
  const sys = el('div','system-msg'); sys.innerHTML = '<div class="system-inner"><strong>New blog session:</strong> enter a topic and press <kbd>Enter</kbd></div>';
  messagesEl.appendChild(sys);
});

/* ---------- send flow ---------- */
async function onSend(){
  const topic = topicInput.value.trim();
  if(!topic) return;

  // append user bubble
  appendUserMessage(topic);
  saveMessageToConvo('user', topic);

  // create convo if none
  if(!currentConvoId){
    const convo = createConvo(topic);
    currentConvoId = convo.id;
  }

  // placeholder AI bubble (we'll stream into it)
  const {row, bubble} = appendAiMessage('🤖 Researching and composing...');
  scrollToBottom();

  // options from UI
  const options = {
    persona: personaSelect.value,
    tone: toneSelect.value
  };

  try{
    // call backend
    const data = await generateBlog(topic, options);

    // backend returns {topic, blog}
    const blogText = data.blog || '⚠️ No content generated';

    // replace placeholder with streaming markdown -> formatted HTML
    // we do simulated streaming to create UX similar to ChatGPT
    streamMarkdown(bubble, blogText, 6);

    // save message to convo when finished
    saveMessageToConvo('ai', blogText);

    // add convo item (if not exists)
    addConvoItem(topic, currentConvoId);
  }catch(err){
    // show error in bubble
    bubble.innerText = '⚠️ Error generating blog: ' + (err.message || err);
    saveMessageToConvo('ai', 'ERROR: ' + (err.message || err));
  }finally{
    // clear input
    topicInput.value = '';
  }
}

/* --------- events ---------- */
sendBtn.addEventListener('click', onSend);
topicInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    onSend();
  }
});

/* on load: focus input */
window.addEventListener('load', ()=>{
  topicInput.focus();
});
