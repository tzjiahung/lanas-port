// Google Analytics (GA4) helpers. Every page view and click on the site goes through here.
//
// Page names in GA are fixed in PAGES below, so they stay the same when page copy or browser
// tab titles change. Only edit a name here if you want GA to start reporting it differently.

export const PAGES = {
  home:           { path: '/',              title: 'Home' },
  'shopback-nma': { path: '/shopback-nma',  title: 'Case: ShopBack NMA' },
  fitback:        { path: '/fitback',       title: 'Case: Cathay FitBack' },
  'oec-fin':      { path: '/oec-fin',       title: 'Case: OEC Finance' },
  'oec-typo':     { path: '/oec-typo',      title: 'Case: OEC Typography' },
  oclock:         { path: '/oclock',        title: "Case: O'Clock Green" },
  fooma:          { path: '/fooma',         title: 'Case: FooMa' },
  ucarer:         { path: '/ucarer',        title: 'Case: Ucarer' },
  'home-v1':      { path: '/home-v1',       title: 'Home (old)' },
}

function gtag(...args) {
  if (typeof window.gtag === 'function') window.gtag(...args)
}

// Sends one page view. The site switches pages by #hash, which GA4 drops from URLs, so each page
// gets a clean virtual path instead (e.g. /shopback-nma). `set` makes every later event on the page
// (clicks, scrolls, GA's own automatic events) carry the same page name and path.
export function trackPageView(view) {
  const page = PAGES[view] || PAGES.home
  const fields = { page_title: page.title, page_location: window.location.origin + page.path }
  gtag('set', fields)
  gtag('event', 'page_view', fields)
}

// One custom event for all clicks. `target` is a stable id (not the visible text, so renaming a
// title does not split the data), `section` says where on the page it was clicked.
export function trackClick(target, section, extra) {
  gtag('event', 'ui_click', { button_label: target, section, ...extra })
}

// Anything that is not a page view or a click, e.g. the old home page's first scroll inside a card.
export function trackEvent(name, params) {
  gtag('event', name, params)
}
