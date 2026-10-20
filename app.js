const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 651px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const filters = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-project]')];
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => {
    item.classList.toggle('active', item === filter);
    item.setAttribute('aria-pressed', String(item === filter));
  });
  let count = 0;
  projectCards.forEach(card => {
    const visible = filter.dataset.filter === 'all' || card.dataset.category.split(' ').includes(filter.dataset.filter);
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#work-count').textContent = `${String(count).padStart(2, '0')} ${count === 1 ? 'PROJECT' : 'PROJECTS'}`;
}));

const projects = {
  financial: {
    index: '01', category: 'FINANCE / MANAGEMENT REPORTING',
    title: 'A clearer view of business performance',
    intro: 'Connecting financial results to the operating questions behind them.',
    sections: [
      {title: 'The business question', text: 'What is driving performance, where is cash being absorbed, and which costs need management attention? A useful monthly report brings those questions into one view.'},
      {title: 'Scope of the work', list: ['Profit-and-loss reporting with month-to-month comparisons and variance commentary.', 'Cash-flow summaries that distinguish sales, customer collections, operating payments and financing.', 'Sales analysis by region and channel, supported by cost classifications and contribution analysis.']},
      {title: 'How I approach it', text: 'Reconcile the underlying records, use clear classifications and make the assumptions visible. Then connect the financial movement to production, distribution and staffing decisions.'},
      {title: 'What the work is designed to support', text: 'A focused management discussion about cash priorities, cost discipline and the next operating decisions. Financial figures and company records are not reproduced here.'}
    ]
  },
  distribution: {
    index: '02', category: 'OPERATIONS / BRANCH & DISTRIBUTION',
    title: 'Finding the signals in everyday orders',
    intro: 'Using order and stock records to identify where a closer operational review is needed.',
    sections: [
      {title: 'The business question', text: 'What can ordering intervals, customer activity and stock movements tell us about the health of a distribution network?'},
      {title: 'Scope of the work', list: ['Branch-level order histories and comparisons of the intervals between purchases.', 'Stock reconciliations connecting opening balances, receipts, transfers, sales and closing stock.', 'Customer account reviews that bring payment patterns and outstanding balances into the discussion.']},
      {title: 'How I approach it', text: 'Compare a branch with its own usual pattern, reconcile the stock movement and flag exceptions for follow-up. A change in ordering is a signal to investigate; the records alone do not establish its cause.'},
      {title: 'What the work is designed to support', text: 'More focused branch visits, clearer stock accountability and better informed customer conversations. Customer identities and transaction data remain confidential.'}
    ]
  },
  strategy: {
    index: '03', category: 'PLANNING / STRATEGY & FORECASTING',
    title: 'Giving a growth strategy financial shape',
    intro: 'Bringing the operational roadmap and the financial model into the same conversation.',
    sections: [
      {title: 'The business question', text: 'How do plans for capacity, distribution and new products translate into investment needs, cash requirements and operating priorities?'},
      {title: 'Scope of the work', list: ['Multi-year planning for a water business, connecting production capacity and market expansion.', 'Sales, staffing, distribution and capital-expenditure assumptions within financial projections.', 'Working-capital considerations, receivables policies and financing assumptions.']},
      {title: 'How I approach it', text: 'Start with the operating assumptions behind the forecast. Link major investments to capacity and demand, make financing needs explicit and distinguish a planned milestone from an achieved result.'},
      {title: 'What the work is designed to support', text: 'A strategy that management can review against practical milestones and financial constraints. Forecasts are planning tools; proposed expansion is not presented as completed investment.'}
    ]
  },
  quality: {
    index: '04', category: 'CONTROLS / QUALITY DOCUMENTATION',
    title: 'Making quality procedures usable',
    intro: 'Turning procedures into records and actions that people can use in daily operations.',
    sections: [
      {title: 'The business question', text: 'When an issue is identified, can the team record it clearly, assign responsibility and follow it through to closure?'},
      {title: 'Scope of the work', list: ['Product recall and withdrawal procedures supported by recall registers.', 'Non-conformity procedures and records for documenting issues and corrective action.', 'Practical inspection and shop-audit checklists, including stock accountability.']},
      {title: 'How I approach it', text: 'Keep the documentation clear, define the information each record must capture and make responsibilities easy to follow. Connect the written procedure to the way an issue is reported, addressed and reviewed.'},
      {title: 'What the work is designed to support', text: 'Consistent records, clearer follow-up and a more usable quality-management process. These examples describe documentation work and do not claim regulatory certification.'}
    ]
  }
};

const dialog = document.querySelector('#project-dialog');
let lastProjectTrigger;
function closeProject() { dialog.close(); }
projectCards.forEach(card => card.addEventListener('click', () => {
  const project = projects[card.dataset.project];
  lastProjectTrigger = card;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-index').textContent = project.index;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-intro').textContent = project.intro;
  const body = document.querySelector('#dialog-body');
  body.replaceChildren();
  project.sections.forEach(section => {
    const wrapper = document.createElement('section');
    const title = document.createElement('h3');
    title.textContent = section.title;
    wrapper.append(title);
    if (section.list) {
      const list = document.createElement('ul');
      section.list.forEach(text => {
        const item = document.createElement('li'); item.textContent = text; list.append(item);
      });
      wrapper.append(list);
    } else {
      const paragraph = document.createElement('p'); paragraph.textContent = section.text; wrapper.append(paragraph);
    }
    body.append(wrapper);
  });
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
  document.querySelector('.dialog-close').focus({preventScroll: true});
}));
document.querySelector('.dialog-close').addEventListener('click', closeProject);
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastProjectTrigger?.focus({preventScroll: true});
});
document.querySelector('.dialog-contact').addEventListener('click', () => {
  closeProject();
  requestAnimationFrame(() => document.querySelector('#contact').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));
});

document.querySelector('[data-copy-email]').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('ndererekamau@gmail.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Select the email address above to copy it, or click it to send an email.';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
