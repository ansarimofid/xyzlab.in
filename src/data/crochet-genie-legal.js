// Legal pages for Crochet Genie, rendered by src/pages/crochet-genie/[pageName].astro.
//
// Each entry becomes /crochet-genie/<key>. Sections carry an `id` so support can
// link to a single clause, e.g. /crochet-genie/privacy#importing.
//
// Anything still unresolved is marked with <span class="legal-todo">TODO: …</span>
// so it renders visibly and greps cleanly. Do not ship with TODOs on the page.

// NOTE: supplied as "corchet…", not "crochet…". Kept exactly as given rather than
// guessed at — if it is a typo, fix it here and both pages update.
const SUPPORT_EMAIL = 'corchetgeniesupport@gmail.com';

const mailto = `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`;

const LAST_UPDATED = '26 August 2026';

export const legalPages = {
  terms: {
    title: 'Terms of Use',
    metaTitle: 'Crochet Genie — Terms of Use',
    metaDescription:
      'The terms you agree to when you use Crochet Genie: what you may do with the app, what you promise about the patterns you import, and what we do not promise back.',
    lastUpdated: LAST_UPDATED,
    supportEmail: SUPPORT_EMAIL,
    sibling: { href: '/crochet-genie/privacy', label: 'Privacy Policy' },
    lede: `Crochet Genie is an iOS app for following crochet patterns and importing
      the ones you already own. These are the terms you agree to when you use it.`,
    sections: [
      {
        id: 'short-version',
        heading: 'The short version',
        body: `
          <p>Crochet Genie helps you follow crochet patterns and turn patterns you
          already own into something you can count your way through. Use it for
          that, be decent about other people's work, and we will get along.</p>
        `,
      },
      {
        id: 'who-we-are',
        heading: 'Who we are',
        body: `
          <p>Crochet Genie is made by
          <span class="legal-todo">TODO: legal entity or trading name, and postal
          address. Apple requires this too.</span></p>
          <p>Write to us at ${mailto}.</p>
        `,
      },
      {
        id: 'using-the-app',
        heading: 'Using the app',
        body: `
          <p>Use Crochet Genie for your own crochet, personal or commercial. What you
          make is yours; we claim nothing over it.</p>
          <p>Do not use the app to break the law, to interfere with the service, or to
          extract our pattern data in bulk.</p>
        `,
      },
      {
        id: 'your-account',
        heading: 'Your account',
        body: `
          <p>Most of Crochet Genie works without an account. You can sign in with
          Apple, and if you do, that sign-in stays on your device. The
          <a href="/crochet-genie/privacy#signing-in">Privacy Policy</a> explains
          exactly what that means.</p>
          <p>You can clear your account and your projects from Settings inside the
          app. It is immediate and it cannot be undone.</p>
        `,
      },
      {
        id: 'patterns-you-import',
        heading: 'Patterns you import',
        body: `
          <p>When you import a pattern you are telling us you have the right to — you
          wrote it, you bought it, or it was given away freely. We do not check this
          and we cannot.</p>
          <p>You keep whatever rights you had. We use what you upload only to produce
          your imported pattern. We do not publish it, sell it, or show it to anyone
          else. The <a href="/crochet-genie/privacy#importing">Privacy Policy</a> sets
          out where your upload actually goes, and it does leave your phone — read it
          before you import anything you would not want a third party to read.</p>
          <p>If you are a designer and something of yours has been imported in a way
          you object to, write to ${mailto} and we will act.</p>
        `,
      },
      {
        id: 'patterns-we-provide',
        heading: 'Patterns we provide',
        body: `
          <p>The patterns that ship with the app are ours. Make from them freely,
          including to sell what you make. Do not redistribute the pattern text or the
          photographs themselves.</p>
        `,
      },
      {
        id: 'limits',
        heading: 'Limits',
        body: `
          <p>Importing costs us money per pattern, so we limit how many imports a
          person can run, and we may change that limit without notice.</p>
        `,
      },
      {
        id: 'videos-and-youtube',
        heading: 'Videos, and YouTube',
        body: `
          <p>Some parts of Crochet Genie show crochet tutorial videos. They play
          through YouTube's own embedded player, and the films belong to the people
          who made them.</p>
          <blockquote>
            <p>By using Crochet Genie you also agree to be bound by the YouTube Terms
            of Service, which you can read at
            <a href="https://www.youtube.com/t/terms" rel="noopener" target="_blank">https://www.youtube.com/t/terms</a>.</p>
          </blockquote>
          <p>YouTube is Google's service, not ours. What it does with your viewing is
          covered by
          <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">Google's privacy policy</a>,
          and by our <a href="/crochet-genie/privacy#videos">Privacy Policy</a>.</p>
        `,
      },
      {
        id: 'ai-accuracy',
        heading: 'AI, and what it gets wrong',
        body: `
          <p>Importing a pattern uses an AI model to read it. It will sometimes be
          wrong — a miscounted round, a misread abbreviation, a stitch that is not
          what the original said.</p>
          <p>Check an imported pattern against your original before you rely on it,
          especially for anything with a fit or a safety consideration. An imported
          pattern is a convenience. We do not guarantee it matches the source.</p>
        `,
      },
      {
        id: 'no-promises',
        heading: 'What we do not promise',
        body: `
          <p>The app is provided as it is. We do not promise uninterrupted
          availability or freedom from faults.</p>
          <p>To the extent the law allows, we are not liable for indirect or
          consequential loss. Nothing here limits liability for death or personal
          injury caused by negligence, for fraud, or for anything else that cannot
          lawfully be limited.</p>
          <p><span class="legal-todo">TODO: have this paragraph checked once
          governing law is chosen — the enforceable wording differs by
          jurisdiction.</span></p>
        `,
      },
      {
        id: 'changes',
        heading: 'Changes',
        body: `
          <p>We update these terms from time to time; the date at the top says when.
          If a change is significant we will say so in the app.</p>
        `,
      },
      {
        id: 'governing-law',
        heading: 'Governing law',
        body: `
          <p><span class="legal-todo">TODO: governing law and jurisdiction. Likely
          India if you operate from there — it changes the liability wording
          above.</span></p>
        `,
      },
      {
        id: 'contact',
        heading: 'Contact',
        body: `<p>${mailto}</p>`,
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    metaTitle: 'Crochet Genie — Privacy Policy',
    metaDescription:
      'Crochet Genie has no analytics, no advertising, no tracking and no third-party SDKs. Your projects never leave your phone. Patterns you import do — here is exactly where they go.',
    lastUpdated: LAST_UPDATED,
    supportEmail: SUPPORT_EMAIL,
    sibling: { href: '/crochet-genie/terms', label: 'Terms of Use' },
    lede: `What Crochet Genie collects, what it does not, and the one thing that
      leaves your phone.`,
    sections: [
      {
        id: 'short-version',
        heading: 'The short version',
        body: `
          <p>Crochet Genie has no analytics, no advertising, no tracking and no
          third-party SDKs of any kind. Your projects never leave your phone. Signing
          in never leaves your phone either.</p>
          <p>One thing does leave: a pattern you ask us to import. That part is
          explained in full <a href="#importing">below</a>.</p>
        `,
      },
      {
        id: 'on-your-device',
        heading: 'What stays on your device',
        body: `
          <p>Your projects, your round counts, your streak and your saved patterns are
          stored on your phone and are never sent anywhere. There is no account
          server, no sync, and no backup held by us.</p>
        `,
      },
      {
        id: 'signing-in',
        heading: 'Signing in',
        body: `
          <p>You can sign in with Apple. Apple gives the app your name and your email
          address — or Apple's private relay address, if you chose to hide your
          email.</p>
          <p><strong>That information does not leave your device.</strong> It is
          written to your device's Keychain so the app can greet you and keep your
          work together. We have no copy of it, because we have no server that stores
          accounts.</p>
          <p>Sign in with Apple is the only way to sign in. There is no Google
          sign-in, no password, and no emailed link.</p>
          <p>To end the relationship entirely: clear your data in Settings inside the
          app, then revoke the app under iOS Settings → your name → Sign in with
          Apple.</p>
        `,
      },
      {
        id: 'importing',
        heading: 'Importing a pattern',
        body: `
          <p>This is the part worth reading properly.</p>
          <p>When you import, the PDF, photograph or web address you provide is sent
          to our import service at <code>api.crochetgenie.app</code> (hosted on
          Render), and from there to a third-party AI provider — currently
          <strong>Google (Gemini)</strong> — which reads it and returns a structured
          pattern. We can switch that provider to Anthropic (Claude); if we do, we
          will update this page.</p>
          <p>So, plainly: <strong>a document you upload leaves your phone and is read
          by a company that is not us.</strong> If it contains anything personal, that
          goes with it.</p>
          <p>We do not store your upload. It is held in a temporary file for the
          length of the request and is gone when the request finishes. We do not write
          it to a database or to object storage, and we do not log its contents.</p>
          <p>What the AI provider does with it is governed by that provider's own
          terms, not ours.
          <span class="legal-todo">TODO: confirm which Google Gemini API terms your
          key is under — the paid and free tiers differ on whether prompts may be
          retained or used to improve models — and state the answer here. This is the
          single most important gap on this page, and the one claim a user could hold
          you to.</span></p>
        `,
      },
      {
        id: 'videos',
        heading: 'Videos',
        body: `
          <p>Tutorial videos play through YouTube's privacy-enhanced player
          (<code>youtube-nocookie.com</code>), which is the mode Google provides for
          embedding without the standard viewing cookies.</p>
          <p>Video thumbnails load from YouTube's image servers
          (<code>i.ytimg.com</code>) whenever a list of videos appears — before you
          play anything. Google therefore receives your IP address and browser details
          at that moment, whether or not you watch. We do not control what Google does
          with that.</p>
          <p>Google's privacy policy:
          <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">https://policies.google.com/privacy</a>.</p>
          <p>We do not ask for, and never receive, access to your YouTube account.
          Nothing in Crochet Genie signs you in to Google or reads anything from your
          Google account, so there is no permission of ours for you to revoke there.</p>
        `,
      },
      {
        id: 'pattern-photographs',
        heading: 'Pattern photographs',
        body: `
          <p>Photographs on our patterns are served from object storage in Paris,
          France (Scaleway). Requesting one reveals your IP address to that host, as
          requesting any image on the internet does.</p>
        `,
      },
      {
        id: 'what-we-do-not-do',
        heading: 'What we do not do',
        body: `
          <ul>
            <li><strong>No analytics or telemetry.</strong> The app has no
            third-party packages at all — not Firebase, not Clarity, not Sentry,
            none.</li>
            <li><strong>No advertising</strong>, and no advertising identifier.</li>
            <li><strong>No tracking</strong> across other apps or websites.</li>
            <li><strong>No selling or sharing</strong> of personal data.</li>
            <li><strong>No marketing email.</strong> We have no email list.</li>
          </ul>
        `,
      },
      {
        id: 'deleting-everything',
        heading: 'Deleting everything',
        body: `
          <p>Settings → "Delete account and everything in it" clears your projects and
          signs you out. Because nothing is held on our servers, that is genuinely
          everything.</p>
          <p>You can also write to ${mailto}.</p>
        `,
      },
      {
        id: 'your-rights',
        heading: 'Your rights',
        body: `
          <p>Depending on where you live, you may have the right to see, correct,
          export or delete the data we hold about you. In practice we hold almost
          none — but write to ${mailto} and we will respond within
          <span class="legal-todo">TODO: confirm the response window you want to
          commit to. 30 days is the usual undertaking.</span></p>
        `,
      },
      {
        id: 'children',
        heading: 'Children',
        body: `
          <p>Crochet Genie is not directed at children under 13, and we do not
          knowingly collect their data.</p>
        `,
      },
      {
        id: 'contact',
        heading: 'Contact',
        body: `<p>${mailto}</p>`,
      },
    ],
  },
};
