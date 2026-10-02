import './Portfolio.css';

// Vite's BASE_URL also supports deployments below a subdirectory.
const RESUME_URL = `${import.meta.env.BASE_URL}Niranjana_Adiga_G_Resume.pdf`;
const EMAIL = 'g.niranjana.adiga@gmail.com';

const SKILLS = [
  { title: 'React development', items: ['React', 'JavaScript', 'Redux Toolkit', 'React Router', 'REST APIs'] },
  { title: 'Forms and interfaces', items: ['Formik', 'Yup', 'Tailwind CSS', 'Material UI', 'Conditional validation'] },
  { title: 'Real-time workflows', items: ['WebSocket / Socket.IO', 'Live search results', 'Sync status', 'Import feedback'] },
  { title: 'Documents and languages', items: ['jsPDF', 'Custom TTF fonts', 'Multilingual UI', 'PDF / CSV / XLSX exports'] },
  { title: 'Accessibility and quality', items: ['Keyboard navigation', 'Screen-reader testing', 'Focus management', 'SonarQube'] },
  { title: 'Additional experience', items: ['TypeScript projects', 'PERN stack', 'Amazon S3', 'Vite', 'Claude / Codex'] },
];

const CASE_STUDIES = [
  {
    id: 'form-builder', number: '01', title: 'Configurable Intake Form Builder',
    status: 'Production Intake platform', tags: ['React', 'Formik', 'Yup'],
    description: 'Helped organizations build and publish their own intake forms using reusable sections, custom fields, and conditional rules.',
    highlights: ['AND/OR conditions nested up to 3 levels', 'Repeatable fields and multi-step forms', 'Multilingual forms and translation review'],
    problem: 'Organizations needed different questions, validation rules, and language options without a separate implementation for every form.',
    contribution: 'Built the drag-and-drop form and section editors, configurable field layouts, repeatable contact details, and the frontend rule evaluator. Added conditional visibility and required validation across fields and sections.',
    detail: 'The condition editor changes its operators by field type. The frontend evaluates nested groups as answers change, including rules used to validate internal reviewer fields before approval.',
    outcome: 'Organizations can configure, translate, publish, and share forms. Respondents see a multi-step form in their selected language, while reviewers have separate internal fields.',
    boundary: 'My work covered the frontend. Backend services store form configurations, generate translations, and process submissions.',
  },
  {
    id: 'conflict-review', number: '02', title: 'Real-time Conflict Review',
    status: 'Production Intake platform', tags: ['Socket.IO', 'Redux Toolkit', 'jsPDF'],
    description: 'Built a review interface that displays potential contact matches as a backend conflict check runs.',
    highlights: ['Streamed results with completion feedback', 'Character-level match highlighting', 'Multilingual PDF exports preserving highlights'],
    problem: 'Reviewers needed to inspect potential conflicts without waiting for the entire contact search to finish, and understand why each contact matched.',
    contribution: 'Integrated the API trigger and WebSocket updates, displayed incoming results and loading status, and rendered highlights using character indices. Added saved-result loading, rerun controls, and separate tables for related parties.',
    detail: 'The page handles live initial checks, API retrieval on later visits, and fresh WebSocket results after edits. PDF exports preserve highlighted matches, with custom TTF fonts supporting non-Latin text across 16 languages.',
    outcome: 'Reviewers can inspect partial results during a running check, revisit saved results with a timestamp, and download the conflict findings.',
    boundary: 'The backend performs matching and scoring. I implemented the frontend coordination, presentation, and PDF generation.',
  },
  {
    id: 'case-management', number: '03', title: 'Case Management Workspace',
    status: 'Trial use and active QA', tags: ['React', 'REST APIs', 'Configurable forms'],
    description: 'Developed a workspace for managing contacts, cases, documents, notes, and time entries using organization-specific configurations.',
    highlights: ['Contact and practice-area configuration', 'Permissions and configurable case scopes', 'Nested document browsing and file actions'],
    problem: 'Organizations needed flexible case workflows and control over which records each user could access.',
    contribution: 'Built template-based configuration screens, contact and case forms, access-scope controls, team management, notes, time-entry forms, and customizable dashboard tiles.',
    detail: 'The document browser displays a backend-provided hierarchy and supports uploads, nested folder creation, navigation, rename, delete, download, and move actions. Access configuration includes assignees, teams, clients, and individual cases.',
    outcome: 'The module is being used by trial users and tested by the QA team. It provides an in-app case-management option alongside Intake.',
    boundary: 'Backend services enforce access, store records, and connect to storage providers. My contribution is the frontend configuration and operational workflows.',
  },
];

const OTHER_WORK = [
  {
    title: 'Document Storage Application', status: 'Professional project',
    stack: 'PostgreSQL · Express · React · Node.js · Amazon S3',
    text: 'Developed the frontend and initial backend of a document-storage application using the PERN stack and Amazon S3.',
  },
  {
    title: 'Product Analysis Rebuild', status: 'Professional project',
    stack: 'React · JavaScript · Reusable components',
    text: 'Rebuilt an existing product-comparison application from scratch, replacing difficult-to-maintain UI code with reusable React components.',
  },
  {
    title: 'Advocacy Event Management', status: 'In development',
    stack: 'React · Swagger · Claude-assisted integration',
    text: 'Built static event-management screens and adapted the designs to the existing product. Guided AI-assisted API integration using Swagger documentation and personally tested workflow scenarios.',
  },
];

function Icon({ name, ...props }) {
  const paths = {
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    code: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{paths[name] || paths.arrow}</svg>;
}

function SectionHeading({ eyebrow, title, id, children }) {
  return <div className="pf-section-heading"><p className="pf-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2>{children && <p className="pf-section-intro">{children}</p>}</div>;
}

function ProjectCard({ project }) {
  return (
    <article className="pf-card pf-project" aria-labelledby={`${project.id}-title`}>
      <div className="pf-project-top"><span className="pf-project-number">{project.number}</span><span className="pf-label">{project.status}</span></div>
      <h3 id={`${project.id}-title`}>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="pf-highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
      <ul className="pf-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <details className="pf-case-details">
        <summary>Read case study<span className="pf-sr-only">: {project.title}</span></summary>
        <div className="pf-case-body">
          <h4>The problem</h4><p>{project.problem}</p>
          <h4>My contribution</h4><p>{project.contribution}</p>
          <h4>Implementation detail</h4><p>{project.detail}</p>
          <h4>Result and current status</h4><p>{project.outcome}</p>
          <p className="pf-boundary">{project.boundary}</p>
        </div>
      </details>
    </article>
  );
}

export default function Portfolio() {
  return (
    <div className="pf" id="top">
      <a className="pf-skip" href="#main-content">Skip to main content</a>
      <header className="pf-header">
        <div className="pf-header-inner">
          <a className="pf-brand" href="#top" aria-label="Niranjana Adiga G, back to top">NG<span className="pf-brand-dot" aria-hidden="true">.</span></a>
          <nav className="pf-nav" aria-label="Main navigation">
            <a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="pf-hero" aria-labelledby="hero-title">
          <div className="pf-hero-grid" aria-hidden="true" />
          <div className="pf-container pf-hero-content">
            <p className="pf-status"><span aria-hidden="true" />Open to React frontend roles</p>
            <p className="pf-eyebrow">Niranjana Adiga G</p>
            <h1 id="hero-title">React interfaces for<br /><span>complex workflows.</span></h1>
            <p className="pf-hero-description">I build configurable forms, real-time review tools, and accessible business applications. My work includes a production legal-intake platform, multilingual PDF exports, and a case-management workspace.</p>
            <ul className="pf-facts" aria-label="Experience and location"><li><strong>3 years</strong> professional React</li><li><strong>5 years</strong> in IT</li><li><strong>India</strong> · Remote roles</li></ul>
            <div className="pf-actions">
              <a className="pf-button pf-button-primary" href="#work">Explore my work<Icon name="arrow" /></a>
              <a className="pf-button pf-button-secondary" href={RESUME_URL} download="Niranjana_Adiga_G_Resume.pdf">Download résumé<Icon name="download" /></a>
            </div>
            <a className="pf-hero-email" href={`mailto:${EMAIL}`}>{EMAIL}<Icon name="mail" /></a>
          </div>
        </section>

        <section className="pf-container pf-section" id="work" aria-labelledby="work-title">
          <SectionHeading eyebrow="Selected work" title="Inside the applications I build" id="work-title">Three examples from the same employer platform. These case studies describe my frontend contribution without exposing client data or proprietary source code.</SectionHeading>
          <div className="pf-project-grid">{CASE_STUDIES.map(project => <ProjectCard key={project.id} project={project} />)}</div>
          <div className="pf-other-work">
            <h3>Additional work at Orbio</h3>
            <div className="pf-other-grid">{OTHER_WORK.map(project => <article className="pf-card pf-other-card" key={project.title}><span className="pf-label">{project.status}</span><h4>{project.title}</h4><p>{project.text}</p><p className="pf-stack">{project.stack}</p></article>)}</div>
          </div>
        </section>

        <section className="pf-section pf-about" id="about" aria-labelledby="about-title">
          <div className="pf-container">
            <SectionHeading eyebrow="About and skills" title="Frontend ownership, from UI to release" id="about-title">I’m a Software Developer at Orbio Solutions, working remotely from Kundapura, Karnataka. I have been the sole frontend developer for a multi-module legal-services platform, building its account and main applications and adapting the UI as requirements evolve.</SectionHeading>
            <div className="pf-about-copy"><p>My work spans nested form rules, live WebSocket results, permission-aware interfaces, document management, and reporting. I also implement keyboard navigation, focus management, and high-contrast mode, and test workflows with a screen reader.</p><p>I use JavaScript and React professionally. I have built TypeScript applications outside production and delivered a PERN document-storage project. For newer work, I guide AI-assisted implementation and manually verify the resulting workflows.</p></div>
            <div className="pf-skills-grid">{SKILLS.map(group => <article className="pf-card pf-skill" key={group.title}><h3>{group.title}</h3><ul className="pf-tags">{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
          </div>
        </section>

        <section className="pf-container pf-section" id="experience" aria-labelledby="experience-title">
          <SectionHeading eyebrow="Career" title="Professional experience" id="experience-title" />
          <div className="pf-timeline">
            <article className="pf-experience"><p className="pf-date">September 2023 – Present</p><div><h3>Software Developer</h3><p className="pf-company">Orbio Solutions Pvt Ltd</p><ul className="pf-experience-list"><li>Own frontend implementation for production Intake workflows and Case Management in trial use and active QA.</li><li>Delivered the initial organization and user-management frontend within a one-month deadline, covering subscription and license workflows.</li><li>Developed regional authentication handoff, MFA screens, Stripe payment-result flows, integration settings, and a knowledge base.</li><li>Migrated the application from Create React App to Vite, configured build chunks, and manually tested features around production releases.</li></ul></div></article>
            <article className="pf-experience"><p className="pf-date">June 2021 – June 2023</p><div><h3>Sr Analyst / Software Engineer</h3><p className="pf-company">Capgemini Pvt Ltd</p></div></article>
          </div>
          <div className="pf-education"><div><h3>Education</h3><p>BE in Mechanical Engineering</p><p className="pf-muted">University Visvesvaraya College of Engineering, Bengaluru · 2020</p></div><div><h3>Certification</h3><p>Meta Front-End Developer</p><p className="pf-muted">Coursera · February 2023</p></div></div>
        </section>

        <section className="pf-container pf-section pf-contact" id="contact" aria-labelledby="contact-title">
          <div className="pf-contact-panel"><p className="pf-eyebrow">Let’s connect</p><h2 id="contact-title">Looking for a React frontend developer?</h2><p>I’m seeking frontend roles where I can contribute to complex React applications. Based in Karnataka, India.</p><div className="pf-actions"><a className="pf-button pf-button-primary" href={`mailto:${EMAIL}`}>Email me<Icon name="mail" /></a><a className="pf-button pf-button-secondary" href="https://www.linkedin.com/in/niranjana-adiga-g-a75663190/">LinkedIn<Icon name="arrow" /></a><a className="pf-button pf-button-secondary" href="https://github.com/GNAlearner">GitHub<Icon name="code" /></a></div><a className="pf-contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
        </section>
      </main>
      <footer className="pf-footer pf-container"><span>© {new Date().getFullYear()} Niranjana Adiga G</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
