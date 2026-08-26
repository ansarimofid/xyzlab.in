// Legal pages for Crochet Genie, rendered by src/pages/crochet-genie/[pageName].astro.
//
// Each entry becomes /crochet-genie/<key>. Sections carry an `id` so support can
// link to a single clause, e.g. /crochet-genie/privacy#importing.
//
// Anything unresolved is marked with <span class="legal-todo">TODO: …</span> so it
// renders visibly and greps cleanly. There are none right now — keep it that way.

// Single source for the company details — both pages render them from here.
const SUPPORT_EMAIL = 'crochetgeniesupport@gmail.com';
const COMPANY = 'Mockey Pvt. Ltd.';
const COMPANY_ADDRESS = 'E 173, Galaxy Apartment, PAC, Moradabad, Uttar Pradesh 244001, India';
// Person named for personal-data questions, as India's DPDP Act expects.
const DATA_CONTACT = 'Pranay Agarwal';
const DATA_CONTACT_ROLE = 'Founder';

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
          <p>Crochet Genie is made by <strong>${COMPANY}</strong>, registered at
          ${COMPANY_ADDRESS}.</p>
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
          <p>To the extent Indian law allows, we are not liable for indirect or
          consequential loss — time you spent, yarn you bought, or a piece that did
          not come out the way you wanted.</p>
          <p>Nothing here limits liability that cannot lawfully be limited,
          including for death or personal injury caused by our negligence, and for
          fraud. Nothing here takes away rights you have as a consumer under Indian
          law.</p>
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
          <p>These terms are governed by the laws of India.</p>
          <p>If we ever have a disagreement we cannot settle between ourselves, it
          goes to the courts of Moradabad, Uttar Pradesh.</p>
        `,
      },
      {
        id: 'contact',
        heading: 'Contact',
        body: `
          <p>${COMPANY}<br />${COMPANY_ADDRESS}</p>
          <p>${mailto}</p>
        `,
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    metaTitle: 'Crochet Genie — Privacy Policy',
    metaDescription:
      'Crochet Genie has no analytics, no crash reporting, no advertising and no tracking. Your projects stay on your phone. Patterns you import go to our service and on to the Google Gemini API — here is exactly what happens.',
    lastUpdated: LAST_UPDATED,
    supportEmail: SUPPORT_EMAIL,
    sibling: { href: '/crochet-genie/terms', label: 'Terms of Use' },
    lede: `What Crochet Genie collects, what it does not, and what leaves your
      phone when you import a pattern.`,
    sections: [
      {
        id: 'short-version',
        heading: 'The short version',
        body: `
          <p>Crochet Genie has no analytics, no crash reporting, no advertising, no
          tracking and no third-party SDKs of any kind. Your projects, counts and
          patterns live on your phone and nowhere else. You have no account on any
          server of ours, because we do not run one.</p>
          <p>Two things do leave your phone. A pattern you ask us to
          <a href="#importing">import</a>, and — while you are signed in — an
          anonymous identifier that stops one person running thousands of imports.
          Both are explained in full below.</p>
        `,
      },
      {
        id: 'on-your-device',
        heading: 'What stays on your device',
        body: `
          <p>These live only on your phone, in the app's own storage:</p>
          <ul>
            <li>your projects, and the row and round counts inside them</li>
            <li>patterns you have saved</li>
            <li>patterns you have imported, and their thumbnails</li>
            <li>your streak</li>
            <li>every preference and setting</li>
          </ul>
          <p>None of it is sent anywhere. There is no cloud sync and no account on
          any server of ours.</p>
          <p>Signing in is not a backup. If you lose the phone, that work is gone —
          we never had a copy of it to give back to you.</p>
        `,
      },
      {
        id: 'signing-in',
        heading: 'Signing in',
        body: `
          <p>You can sign in with Apple. It is the only way to sign in — no Google
          sign-in, no password, no emailed link — and most of the app works without
          signing in at all.</p>
          <p>Apple hands the app two different things, and they are worth separating.</p>
          <p><strong>Your name and email address</strong> — or Apple's private relay
          address, if you chose to hide your email — go into your device's Keychain
          and <strong>stay there</strong>. We have no copy, because we have no server
          that stores accounts.</p>
          <p><strong>A subject identifier</strong>, which is an opaque string Apple
          uses to mean "you" to this app and to no other app. While you are signed in,
          import requests carry it in a header called <code>X-User</code>. We use it
          for exactly one thing: counting imports, so a single person cannot exhaust
          the service for everyone else. It is not stored on our server. It is never
          used for advertising, and never to follow you anywhere.</p>
          <p><a href="#deleting-everything">Deleting everything</a> explains how to
          undo all of this.</p>
        `,
      },
      {
        id: 'importing',
        heading: 'Importing a pattern',
        body: `
          <p>This is the part worth reading properly.</p>
          <p>There are three ways to import, and all three send something to our
          import service at <code>crochet-genie.xyzlab.in</code>:</p>
          <ul>
            <li><strong>A PDF.</strong> The file is uploaded.</li>
            <li><strong>A web link.</strong> The address you paste is sent, and the
            page at the other end is fetched and read.</li>
            <li><strong>A photo from your library.</strong> The image is uploaded.
            It might be a picture of a written pattern, which gets transcribed — or a
            picture of a finished object, for which an original pattern is
            designed.</li>
          </ul>
          <p>Our service forwards what you sent to the <strong>Google Gemini
          API</strong>, which reads it and returns a structured pattern. We can switch
          that to Anthropic (Claude) instead; if we do, we will update this page
          first.</p>
          <p>So, plainly: <strong>what you upload leaves your phone and is read by a
          company that is not us.</strong> If your PDF or your photograph has anything
          personal in it, that goes too.</p>
          <p>Our own service keeps nothing. There is no database and no user record.
          Your upload is held for the length of one request and discarded when the
          request finishes, and we never log what was in it.</p>
          <p>What happens at Google's end is governed by Google's terms, not ours.
          We use the <strong>paid</strong> Gemini API. Google's terms for paid
          services say that Google does not use what we send it — your pattern, any
          file you upload with it, and the pattern it returns — to improve Google's
          products, and that it handles all of it as a data processor working on our
          instructions rather than for its own purposes.</p>
          <p>Google does log the request for a limited period, to detect and prevent
          abuse of its service and to make any disclosure the law requires of it.
          Google says that logged data may be stored or cached in any country where
          it or its agents have facilities, so your upload may rest briefly on a
          machine outside India.</p>
          <p>Google's free tier works differently, and we want you to know the
          difference: there, uploads are used to improve Google's products, and
          Google's terms say human reviewers may read and annotate them. We are not
          on the free tier, and we would update this page before moving to it.</p>
          <p>Google's terms for the Gemini API:
          <a href="https://ai.google.dev/gemini-api/terms" rel="noopener" target="_blank">https://ai.google.dev/gemini-api/terms</a>.</p>
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
          <p>Photographs on our patterns load from <code>assets.xyzlab.in</code>,
          which is object storage at Scaleway in Paris, France. Requesting one reveals
          your IP address to that host, as requesting any image on the internet
          does.</p>
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
            <li><strong>No crash reporting.</strong> If the app falls over, your
            phone does not tell us about it.</li>
            <li><strong>No advertising</strong>, and no advertising identifier.</li>
            <li><strong>No tracking</strong> across other apps or websites.</li>
            <li><strong>No selling or sharing</strong> of your data with anyone
            beyond the services named on this page.</li>
            <li><strong>No marketing email.</strong> We have no email list.</li>
          </ul>
        `,
      },
      {
        id: 'deleting-everything',
        heading: 'Deleting everything',
        body: `
          <p>Settings → "Delete account and everything in it" removes all of this
          from the device: every project and the counts inside it, every imported
          pattern and its thumbnail, every saved pattern, and every preference. It
          signs you out at the same time.</p>
          <p>Because no account record exists on any server of ours, that is the
          entire deletion. There is nothing held elsewhere for us to go and remove.</p>
          <p>One thing is separate, and only you can do it: revoking the app's Sign in
          with Apple access, under iOS Settings → Apple Account → Sign in with
          Apple.</p>
          <p>You can also write to ${mailto}.</p>
        `,
      },
      {
        id: 'your-rights',
        heading: 'Your rights',
        body: `
          <p>Depending on where you live, you may have the right to see, correct,
          export or delete the data we hold about you. In practice we hold almost
          none — but write to ${mailto} and we will answer within 30 days.</p>
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
        body: `
          <p>Crochet Genie is run by <strong>${COMPANY}</strong>, ${COMPANY_ADDRESS}.
          We are the ones deciding what happens to your personal data, which under
          Indian law makes us the data fiduciary for it.</p>
          <p>India's Digital Personal Data Protection Act asks us to name the person
          who answers questions about your personal data. That is
          <strong>${DATA_CONTACT}</strong>, ${DATA_CONTACT_ROLE}, reachable at
          ${mailto}.</p>
        `,
      },
    ],
  },
};
