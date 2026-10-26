(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  document.querySelectorAll('[data-link]').forEach(link => {
    const key = link.dataset.link, value = config[key];
    if (value && value.trim()) {
      link.href = value;
      link.hidden = false;
      if (key === 'resume' && link.dataset.resumeAction === 'view') {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.removeAttribute('download');
      } else if (key === 'resume') {
        link.setAttribute('download', 'Josiah-Suder-Resume.pdf');
      } else { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    } else link.hidden = true;
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  const projects = {
    'project-lead': {
      title: 'AI Lead Qualification & Routing System',
      stack: 'Zapier · OpenAI · Webhooks · JavaScript · GoHighLevel API · Slack',
      summary: 'A two-stage qualification workflow that turns open-ended lead responses into structured scoring data, then routes each lead to the appropriate next step.',
      architecture: [
        'A webhook receives lead information and passes it to an OpenAI conversation step for evaluation.',
        'The model output is normalized and checked in JavaScript before routing, so downstream steps work with predictable fields rather than free-form text.',
        'Paths route the lead into Auto-Qualify, Auto-Disqualify, Needs Human Review, or Scoring Error outcomes.'
      ],
      engineering: [
        'Structured JSON output creates a consistent contract between the AI evaluation and the routing logic.',
        'A direct GoHighLevel REST API integration supports custom field mapping where the native connector was insufficient.',
        'Idempotency checks help prevent duplicate CRM records when the workflow receives repeated events.',
        'High-value leads can enter a Slack human-review step before continuing through the sales pipeline.'
      ],
      outcomes: 'The design makes qualification decisions traceable, separates automated decisions from cases that need human judgment, and provides a defined path for scoring failures.',
      loom: '53c3d752986c42bf934b573967d6e6e4', image: 'zapier-routing.jpg', support: ['zapier-run.jpg']
    },
    'project-rag': {
      title: 'Multi-Tenant RAG Knowledge System',
      stack: 'n8n · Pinecone · OpenAI · Google Drive · Embeddings · Basic Authentication',
      summary: 'A retrieval-augmented generation system for company Q&A, built from three connected workflows: document ingestion, public knowledge retrieval, and internal knowledge retrieval.',
      architecture: [
        'The ingestion workflow searches Google Drive, downloads documents, extracts text, prepares content for retrieval, and writes vectors to Pinecone.',
        'The query workflows pass a user message to an AI Agent connected to an OpenAI chat model, memory, and Pinecone retrieval tools.',
        'The internal assistant can access a distinct internal vector store as well as the public knowledge store, while the public assistant uses the public knowledge path.'
      ],
      engineering: [
        'Document chunking and embeddings prepare source material for semantic retrieval rather than relying only on keyword matching.',
        'Pinecone namespaces and separate stores provide logical separation between public and internal knowledge collections.',
        'Basic Authentication protects the internal query portal; access permissions and deployment configuration remain important parts of the overall security boundary.'
      ],
      outcomes: 'The architecture separates ingestion from question answering and makes it possible to maintain public and internal knowledge paths within one coordinated system.',
      loom: '578d78799aec4e5f9b9b43f6e694662d', image: 'rag-internal.jpg', support: ['rag-public.jpg', 'rag-ingestion.jpg']
    },
    'project-receptionist': {
      title: 'Maya — AI Receptionist',
      stack: 'n8n · OpenAI · HubSpot · Google Sheets · Slack · JavaScript',
      summary: 'A conversational AI receptionist that handles incoming enquiries, extracts lead details, and connects customer-facing chat to internal business workflows.',
      architecture: [
        'A chat trigger passes the message to an AI Agent for response generation and information gathering.',
        'JavaScript processes the agent output, then conditional logic separates the relevant downstream paths.',
        'The workflow appends or updates a Google Sheets record, sends a Slack notification, and creates or updates a HubSpot contact and engagement.'
      ],
      engineering: [
        'The flow separates the customer-facing response from downstream CRM and notification actions.',
        'HubSpot contact upsert and engagement creation keep lead information and interaction context together.',
        'Google Sheets provides a simple conversation/lead log, while Slack surfaces qualified enquiries to the team.'
      ],
      outcomes: 'The design reduces manual copying between chat, spreadsheets, team messaging, and the CRM while preserving a structured record of enquiries.',
      loom: 'f07fbf346e264167b02c3ecfcd5f596f', image: 'maya-receptionist.jpg', support: []
    },
    'project-ghl': {
      title: 'GoHighLevel Client Acquisition & Lead Nurturing',
      stack: 'GoHighLevel · CRM Workflows · Conditional Branching · Tags · Email',
      summary: 'A client acquisition workflow that reacts to form submissions, creates or updates an opportunity, and branches leads into follow-up paths based on service interest.',
      architecture: [
        'A form-submission trigger starts the workflow and creates or updates the CRM opportunity.',
        'A condition checks the service-interest field and branches the contact into Hot and Cold paths.',
        'Each path applies tags and starts the relevant email follow-up sequence.'
      ],
      engineering: [
        'Explicit condition branches make the routing criteria visible and maintainable.',
        'Tags preserve the lead classification for later segmentation and workflow entry conditions.',
        'Opportunity updates and follow-up actions keep the CRM pipeline aligned with the contact journey.'
      ],
      outcomes: 'The workflow connects lead capture to CRM organization and follow-up, reducing the need for staff to manually classify and chase every new enquiry.',
      loom: 'c851f39cde2346dc83c76b7f303f8659', image: 'ghl-speed-to-lead.jpg', support: ['ghl-branching.jpg']
    },
    'project-n8n-lead': {
      title: 'AI Lead Qualification Workflow — n8n',
      stack: 'n8n · OpenAI · JavaScript · HubSpot · Slack · Gmail · Webhooks',
      summary: 'An AI-assisted lead qualification workflow that receives lead data, extracts structured information, evaluates it, and routes CRM and communication actions based on the result.',
      architecture: [
        'A webhook receives the payload and an Edit Fields step normalizes the values passed through the workflow.',
        'An OpenAI model evaluates the lead, and JavaScript prepares the response for conditional routing.',
        'The branches create or update HubSpot contacts and engagements, notify the team in Slack, and send email actions through Gmail.'
      ],
      engineering: [
        'Field normalization creates a predictable shape for later nodes.',
        'Conditional routing keeps the success path and alternate/error path distinct.',
        'CRM, email, and team-messaging actions are coordinated in one visible workflow for easier inspection and troubleshooting.'
      ],
      outcomes: 'This implementation demonstrates the same lead-qualification problem solved in n8n, with the workflow graph making the integrations and decision points easy to audit.',
      loom: 'fe48863287214eb09d9ed794d0c6e815', image: 'n8n-lead-qualification.jpg', support: []
    },
    'project-voice': {
      title: 'Voice Memo to Email Automation',
      stack: 'n8n · Google Drive · OpenAI · Gmail · JavaScript',
      summary: 'An automation that turns a saved voice recording into a validated email draft, with logic for distinguishing a reply from a new message.',
      architecture: [
        'A Google Drive trigger detects a new recording and downloads the file.',
        'The workflow transcribes the audio and sends the transcript to an AI model to draft an email.',
        'JavaScript validation checks for a recipient and minimum content length before the workflow creates a Gmail draft.',
        'For reply handling, the workflow searches Gmail messages and chooses the appropriate draft path so replies can be associated with the original thread.'
      ],
      engineering: [
        'Output validation blocks incomplete drafts from being created when required fields or content are missing.',
        'Branching logic distinguishes reply scenarios from new email scenarios.',
        'Gmail search is used to identify the relevant thread before drafting a response.'
      ],
      outcomes: 'The workflow turns a voice-first input into an editable draft, while validation and thread-aware routing reduce avoidable email cleanup.',
      loom: 'f9e68f63ea9a4bbb83301dd3b6d40765', image: 'voice-to-email.jpg', support: []
    }
  };

  const dialog = document.getElementById('project-dialog');
  const closeButton = dialog?.querySelector('.dialog-close');
  const esc = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text) el.textContent = text;
    return el;
  };
  const addSection = (body, heading, paragraphsOrList, isList = false) => {
    const section = esc('section', 'dialog-section');
    section.append(esc('h3', '', heading));
    if (isList) {
      const list = esc('ul');
      paragraphsOrList.forEach(text => list.append(esc('li', '', text)));
      section.append(list);
    } else {
      section.append(esc('p', '', paragraphsOrList));
    }
    body.append(section);
  };

  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const item = projects[button.dataset.project];
    if (!item || !dialog) return;
    document.getElementById('dialog-title').textContent = item.title;
    document.getElementById('dialog-stack').textContent = item.stack;
    const body = document.getElementById('dialog-body');
    body.replaceChildren();
    addSection(body, 'Overview', item.summary);
    addSection(body, 'Workflow architecture', item.architecture, true);
    addSection(body, 'Implementation details', item.engineering, true);
    addSection(body, 'Operational value', item.outcomes);

    const media = document.getElementById('case-media');
    media.replaceChildren();
    [item.image, ...item.support].filter(Boolean).forEach((src, index) => {
      const img = document.createElement('img');
      img.src = 'assets/' + src;
      img.alt = item.title + (index === 0 ? ' primary workflow screenshot' : ' supporting workflow screenshot');
      img.loading = 'lazy';
      media.append(img);
    });
    const frame = document.getElementById('case-video');
    frame.src = 'https://www.loom.com/embed/' + item.loom + '?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true';
    dialog.showModal();
  }));

  const shut = () => {
    dialog?.close();
    const frame = document.getElementById('case-video');
    if (frame) frame.src = 'about:blank';
  };
  closeButton?.addEventListener('click', shut);
  dialog?.addEventListener('click', event => { if (event.target === dialog) shut(); });
  dialog?.addEventListener('close', () => {
    const frame = document.getElementById('case-video');
    if (frame) frame.src = 'about:blank';
  });

  // Rotating hero phrase: useful movement without distracting from the headline.
  const phrase = document.querySelector('.rotating-phrase');
  const phrases = ['practical AI systems', 'reliable business workflows', 'smarter CRM automations', 'API-connected operations', 'knowledge assistants grounded in source data', 'less manual work for busy teams'];
  if (phrase && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let i = 0;
    window.setInterval(() => {
      phrase.classList.add('phrase-out');
      window.setTimeout(() => {
        i = (i + 1) % phrases.length;
        phrase.textContent = phrases[i];
        phrase.classList.remove('phrase-out');
      }, 220);
    }, 2900);
  }

  // Gentle section reveals. Content remains visible if motion is disabled or JS is unavailable.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll('.service, .project-card, .experience-card, .about-copy, .hired-list');
    revealTargets.forEach(el => el.classList.add('reveal-ready'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  }
})();
