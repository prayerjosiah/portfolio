(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  document.querySelectorAll('[data-link]').forEach(link => {
    const key = link.dataset.link;
    const value = config[key];
    if (value && value.trim()) {
      link.href = value;
      link.hidden = false;
      if (key === 'resume') {
        link.setAttribute('download', 'Josiah-Suder-Resume.pdf');
      } else {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    } else {
      link.hidden = true;
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  const projects = {
    'project-lead': {
      title: 'AI Lead Qualification & Routing System',
      stack: 'Zapier · GoHighLevel · OpenAI · Slack · REST APIs',
      problem: 'Incoming leads need to be evaluated consistently and routed to the right follow-up path without creating duplicate CRM records.',
      build: ['Pass relevant lead fields into an AI qualification step and request structured JSON output.', 'Use conditional paths to route leads based on qualification criteria.', 'Add a Slack human-review checkpoint for high-value leads before proceeding.', 'Use direct GoHighLevel API requests where the native connector is insufficient.', 'Check for existing records before creating a new contact.'],
      focus: 'Structured outputs, conditional routing, API integration, duplicate prevention, and human-in-the-loop decisions.'
    },
    'project-receptionist': {
      title: 'Maya — AI Receptionist Workflow',
      stack: 'n8n · OpenAI GPT-4o mini · HubSpot · Google Sheets · Slack',
      problem: 'Enquiries need to be captured, normalized, checked against existing records, and handed to the team with minimal repetitive data entry.',
      build: ['Extract useful lead details from incoming enquiries.', 'Check Google Sheets for an existing record before proceeding.', 'Create or update the relevant HubSpot contact.', 'Notify the team in Slack when an enquiry meets qualification criteria.', 'Keep internal workflow signals separate from customer-facing responses.'],
      focus: 'Information extraction, contact deduplication, CRM synchronization, workflow state, and output boundaries.'
    },
    'project-rag': {
      title: 'Multi-Tenant RAG Knowledge Base',
      stack: 'n8n · Pinecone · OpenAI · Google Drive · Basic Authentication',
      problem: 'Teams need to retrieve answers from source documents while keeping separate clients’ knowledge logically isolated.',
      build: ['Ingest source documents from Google Drive.', 'Chunk content and generate embeddings for retrieval.', 'Store vectors in Pinecone using namespaces to separate client knowledge.', 'Separate public-facing FAQs and policies from private internal knowledge.', 'Protect the query interface with basic authentication.'],
      focus: 'Document ingestion, chunking, embeddings, vector retrieval, namespace separation, and access-control design.'
    },
    'project-voice': {
      title: 'Voice Note to Email Automation',
      stack: 'n8n · OpenAI Whisper · Claude · Google Drive · Gmail',
      problem: 'Voice notes contain useful context, but turning them into polished communication and CRM notes takes manual effort.',
      build: ['Watch a designated Drive location for new audio files.', 'Transcribe the recording with speech-to-text.', 'Transform the transcript into a draft aligned with the intended writing style.', 'Return a structured email draft and CRM summary.', 'Keep review and sending separate so a person can check the content first.'],
      focus: 'Speech-to-text, LLM transformation, structured outputs, orchestration, and human review.'
    },
    'project-ghl': {
      title: 'GoHighLevel Client Acquisition System',
      stack: 'GoHighLevel · Native Workflows · CRM Pipeline · Email · SMS',
      problem: 'A client acquisition process needs consistent lead response, follow-up, and safeguards when a prospect books or replies.',
      build: ['Organize leads in a six-stage acquisition pipeline.', 'Use structured service-interest fields for predictable branching.', 'Centralize reusable values such as business names and booking links.', 'Separate immediate response, cold nurture, and booking cleanup into distinct workflows.', 'Use engagement-based branches and stop-on-response behavior.', 'Remove booked contacts from nurture through a dedicated booking-triggered workflow.'],
      focus: 'Workflow separation, reusable configuration, conditional messaging, lifecycle safeguards, and maintainability.'
    }
  };
  const dialog = document.getElementById('project-dialog');
  const closeButton = dialog?.querySelector('.dialog-close');
  document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', event => {
    const item = projects[link.dataset.project];
    if (!item || !dialog) return;
    event.preventDefault();
    document.getElementById('dialog-title').textContent = item.title;
    document.getElementById('dialog-stack').textContent = item.stack;
    const body = document.getElementById('dialog-body');
    body.replaceChildren();
    const problemHeading = document.createElement('h3'); problemHeading.textContent = 'The problem'; body.append(problemHeading);
    const problem = document.createElement('p'); problem.textContent = item.problem; body.append(problem);
    const buildHeading = document.createElement('h3'); buildHeading.textContent = 'The build'; body.append(buildHeading);
    const list = document.createElement('ul'); item.build.forEach(point => { const li = document.createElement('li'); li.textContent = point; list.append(li); }); body.append(list);
    const focusHeading = document.createElement('h3'); focusHeading.textContent = 'Engineering focus'; body.append(focusHeading);
    const focus = document.createElement('p'); focus.textContent = item.focus; body.append(focus);
    dialog.showModal();
  }));
  closeButton?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
