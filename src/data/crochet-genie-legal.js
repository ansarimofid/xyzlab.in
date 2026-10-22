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

// Each page is dated independently; they do not change together.
const TERMS_LAST_UPDATED = '22 October 2026';
const PRIVACY_LAST_UPDATED = '22 October 2026';
const CREDITS_LAST_UPDATED = '26 August 2026';

export const legalPages = {
  terms: {
    title: 'Terms of Use',
    metaTitle: 'Crochet Genie — Terms of Use',
    metaDescription:
      'The terms you agree to when you use Crochet Genie: what you may do with the app, what you promise about the patterns you import, and what we do not promise back.',
    lastUpdated: TERMS_LAST_UPDATED,
    supportEmail: SUPPORT_EMAIL,
    siblings: [
      { href: '/crochet-genie/privacy', label: 'Privacy Policy' },
      { href: '/crochet-genie/credits', label: 'Credits' },
    ],
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
          Apple or with Google, and if you do, that sign-in stays on your device. The
          <a href="/crochet-genie/privacy#signing-in">Privacy Policy</a> explains
          exactly what that means. You do need to be signed in before buying
          <a href="#genie-plus">Genie+</a>.</p>
          <p>You can clear your account and your projects from Settings → Danger
          zone inside the app. It is immediate and it cannot be undone.</p>
        `,
      },
      {
        id: 'genie-plus',
        heading: 'Genie+ and subscriptions',
        body: `
          <p>Genie+ is our paid plan. It removes the limits of the free plan: one
          pattern import a calendar month, three unfinished projects at a time, and
          three saved patterns.</p>
          <p>There are three ways to buy it, all through the App Store:</p>
          <ul>
            <li><strong>Yearly</strong> — $19.99 a year in the US, starting with a
            three-day free trial.</li>
            <li><strong>Monthly</strong> — $2.99 a month in the US, starting with a
            three-day free trial.</li>
            <li><strong>Genie+ Lifetime</strong> — $49.99, a one-off purchase. It
            does not renew.</li>
          </ul>
          <p>Prices differ by country. The app shows you the price that applies to
          you before you buy. You need to be signed in to buy.</p>
          <p>Payment is charged to your Apple Account when you confirm the purchase,
          or when the free trial ends.</p>
          <p>A subscription renews automatically unless you cancel it at least 24
          hours before the current period ends. Your account is charged for the
          renewal within the 24 hours before the period ends.</p>
          <p>The free trial runs three days, and there is one per eligible Apple
          Account. Where it applies, any unused part of a trial is forfeited when
          you buy a subscription.</p>
          <p>Manage or cancel in iOS Settings → your name → Subscriptions. Deleting
          the app does not cancel a subscription.</p>
          <p>Refunds are Apple's to give, not ours. Ask at
          <a href="https://reportaproblem.apple.com" rel="noopener" target="_blank">reportaproblem.apple.com</a>.</p>
          <p>We may change what the free plan includes, and what Genie+ includes.</p>
          <p>Apple's
          <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener" target="_blank">Licensed Application End User License Agreement</a>
          applies to Crochet Genie alongside these terms.</p>
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
          <p>The free plan has limits — on imports, on unfinished projects, and on
          saved patterns. <a href="#genie-plus">Genie+</a> removes them.</p>
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
      'Crochet Genie uses Google Analytics for Firebase and PostHog to learn which features people use — never for advertising. Your projects stay on your phone. Patterns you import go to our service and on to the Google Gemini API — here is exactly what happens.',
    lastUpdated: PRIVACY_LAST_UPDATED,
    supportEmail: SUPPORT_EMAIL,
    siblings: [
      { href: '/crochet-genie/terms', label: 'Terms of Use' },
      { href: '/crochet-genie/credits', label: 'Credits' },
    ],
    lede: `What Crochet Genie collects, what it does not, and what leaves your
      phone when you import a pattern.`,
    sections: [
      {
        id: 'short-version',
        heading: 'The short version',
        body: `
          <p>Crochet Genie uses two analytics services to learn which features
          people use: Google Analytics (through Firebase) and PostHog. Neither is
          used for advertising, and neither tracks you across other apps or websites.
          Your projects never leave your phone. Your name and email never leave it
          either.</p>
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
          <p>You can sign in with Apple or with Google. Most of the app works
          without signing in at all, though you do need an account before buying
          <a href="#genie-plus">Genie+</a>.</p>
          <p><strong>Sign in with Apple.</strong> Apple hands the app two different
          things, and they are worth separating.</p>
          <p>Your name and email address — or Apple's private relay address, if you
          chose to hide your email — go into your device's Keychain and
          <strong>stay there</strong>. We have no copy, because we have no server
          that stores accounts.</p>
          <p>Apple also gives an account identifier: an opaque string it uses to mean
          "you" to this app and to no other app.</p>
          <p><strong>Sign in with Google.</strong> The sign-in itself happens on
          Google's own web page rather than on a screen of ours, so your Google
          password never passes through the app.</p>
          <p>We ask Google for three things and nothing more —
          <code>openid</code>, <code>email</code> and <code>profile</code> — which
          gives the app your name, your email address and Google's opaque account ID
          for you (its "sub"). We do not ask for, and cannot reach, your Gmail, your
          Drive, your contacts, your photos or your YouTube account.</p>
          <p>Those three go into your device's Keychain exactly as the Apple ones do,
          and stay there. We have no copy.</p>
          <p>You can revoke the app's access whenever you like, at
          <a href="https://myaccount.google.com/" rel="noopener" target="_blank">myaccount.google.com</a>
          → Security → Your connections to third-party apps &amp; services.</p>
          <p><strong>The account identifier, whichever you signed in with.</strong>
          While you are signed in, import requests carry that opaque ID — Apple's or
          Google's — in a header called <code>X-User</code>. We use it for exactly
          one thing: counting imports, so a single person cannot exhaust the service
          for everyone else. It is not stored on our server. It is never used for
          advertising, and never to follow you anywhere.</p>
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
        id: 'genie-plus',
        heading: 'Genie+ purchases',
        body: `
          <p>Genie+ is sold through the App Store. There is a yearly subscription
          ($19.99 a year in the US) and a monthly one ($2.99 a month in the US),
          each starting with a three-day free trial, and Genie+ Lifetime ($49.99),
          a one-off purchase that never renews. Prices differ by country, and the
          app shows you yours before you buy.</p>
          <p>The free plan allows one pattern import a calendar month, three
          unfinished projects at a time, and three saved patterns. Genie+ removes
          all three limits. You need to be signed in before you can buy.</p>
          <p><strong>We never see your payment details.</strong> Apple takes the
          payment. No card number, no billing address, nothing of that kind passes
          through the app or reaches us. Whether you hold Genie+ is checked on the
          device itself, through Apple's StoreKit.</p>
          <p>"Restore Purchases" sits on the paywall and in Settings, for a new
          device or a reinstall.</p>
          <p>Our analytics record that the paywall was shown and which plan was
          picked. They never record anything about the payment.</p>
          <p>To manage or cancel a subscription: iOS Settings → your name →
          Subscriptions.</p>
        `,
      },
      {
        id: 'counting-by-voice',
        heading: 'Counting by voice',
        body: `
          <p>Counting by voice is optional, and off until you turn it on. When it is
          on and a round counter is open, the app listens for two words: "next" and
          "back". Nothing else.</p>
          <p><strong>All of it happens on your device.</strong> Speech recognition
          runs locally — SpeechAnalyzer on iOS 26, and Apple's on-device recogniser
          before that. No audio is recorded. No transcript is kept. Nothing is sent
          to us, to Apple, or to anyone else.</p>
          <p>You can withdraw microphone access at any time in iOS Settings →
          Crochet Genie.</p>
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
          <p>Watching a video here never signs you in to Google. The player does
          not know who you are, and we do not ask for or receive access to your
          YouTube account.</p>
          <p>If you chose <a href="#signing-in">Sign in with Google</a>, that signs
          you in to Crochet Genie and nothing else. It gives us no access to YouTube
          — not your history, not your subscriptions, not your comments — and it is
          not connected to the player in any way.</p>
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
        id: 'analytics',
        heading: 'Analytics',
        body: `
          <p>We use two services to understand how the app is used, so we can fix
          what is confusing and build what is missing.</p>
          <p><strong>Google Analytics for Firebase</strong> records app events, such
          as "a pattern was saved", "the Row Counter was opened", "an import failed"
          or "the Genie+ screen was shown". Each event carries only fixed labels and
          counts: which plan was picked, how many stitches were counted in a sitting,
          how long a tutorial video played. Events never contain your name, your
          email address, the text of a pattern, or any photo or file you import.
          Google works out an approximate location (country or region) from your IP
          address. Each install gets a random app ID. It is not linked to your
          account, and we do not use the advertising identifier (IDFA).</p>
          <p><strong>PostHog</strong> records session replays: a moving picture of
          the screens you move through and where you tap, so we can see where people
          get stuck. Every piece of text and every image is masked before anything is
          sent, so a replay shows the shape of the screen, not what was on it.
          Network requests are not recorded. Each install gets a random ID, which is
          not linked to your account.</p>
          <p>Neither service is used for advertising, and neither data set is sold or
          shared with anyone else. We do not show the App Tracking Transparency
          prompt because we do not track you as Apple defines it.</p>
          <p>Retention: Google Analytics keeps event data for 14 months and PostHog
          keeps replays for 30 days.</p>
          <p>Google's privacy policy:
          <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">https://policies.google.com/privacy</a><br />
          PostHog's privacy policy:
          <a href="https://posthog.com/privacy" rel="noopener" target="_blank">https://posthog.com/privacy</a></p>
        `,
      },
      {
        id: 'what-we-do-not-do',
        heading: 'What we do not do',
        body: `
          <ul>
            <li><strong>No advertising analytics.</strong> Our analytics
            (<a href="#analytics">see above</a>) count how features are used. They
            are never used for ads, never linked to your account, and never contain
            your patterns, photos or contact details.</li>
            <li><strong>No advertising.</strong> The app does not access the
            advertising identifier.</li>
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
          <p>Settings → Danger zone → "Delete account and everything in it"
          removes all of this from the device: every project and the counts inside
          it, every imported pattern and its thumbnail, every saved pattern, and
          every preference. It signs you out at the same time.</p>
          <p>Analytics data is tied to a random ID on this install, not to you.
          Deleting the app ends collection and the ID with it. If you want that data
          removed sooner, write to us at the address below.</p>
          <p>Because no account record exists on any server of ours, that is the
          entire deletion. There is nothing held elsewhere for us to go and remove.</p>
          <p>One thing is separate, and only you can do it: revoking the app's
          sign-in access.</p>
          <p>For Apple, that is iOS Settings → Apple Account → Sign in with Apple.
          For Google, it is
          <a href="https://myaccount.google.com/" rel="noopener" target="_blank">myaccount.google.com</a>
          → Security → Your connections to third-party apps &amp; services.</p>
          <p>You can also write to ${mailto}.</p>
        `,
      },
      {
        id: 'your-rights',
        heading: 'Your rights',
        body: `
          <p>Depending on where you live, you may have the right to see, correct,
          export or delete the data we hold about you. In practice we hold very
          little: anonymous usage events and masked session replays, described under
          <a href="#analytics">Analytics</a> — but write to ${mailto} and we will
          answer within 30 days.</p>
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

  credits: {
    title: 'Credits',
    metaTitle: 'Crochet Genie — Credits',
    metaDescription:
      'Attribution for the open-source icons and typefaces Crochet Genie uses, for the tutorial films, and for the patterns in the catalogue.',
    lastUpdated: CREDITS_LAST_UPDATED,
    supportEmail: SUPPORT_EMAIL,
    siblings: [
      { href: '/crochet-genie/terms', label: 'Terms of Use' },
      { href: '/crochet-genie/privacy', label: 'Privacy Policy' },
    ],
    lede: `Crochet Genie is built on other people's work. This page credits it and
      records the licences that work is used under.`,
    sections: [
      {
        id: 'icons',
        heading: 'Icons',
        body: `
          <p><strong>Phosphor Icons</strong> — the tab bar glyphs.<br />
          Copyright (c) 2023 Phosphor Icons. Used under the MIT License.<br />
          <a href="https://phosphoricons.com" rel="noopener" target="_blank">phosphoricons.com</a></p>
          <details class="legal-licence">
            <summary>Full MIT License text</summary>
            <p>Copyright (c) 2023 Phosphor Icons</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining
            a copy of this software and associated documentation files (the
            "Software"), to deal in the Software without restriction, including
            without limitation the rights to use, copy, modify, merge, publish,
            distribute, sublicense, and/or sell copies of the Software, and to permit
            persons to whom the Software is furnished to do so, subject to the
            following conditions:</p>
            <p>The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
            IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
            CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
            TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
            SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          </details>
          <p><strong>Solar Icon Set</strong> by 480 Design — the play button.<br />
          Used under the Creative Commons Attribution 4.0 International licence
          (CC BY 4.0).<br />
          <a href="https://github.com/480-Design/Solar-Icon-Set" rel="noopener" target="_blank">github.com/480-Design/Solar-Icon-Set</a>
          · <a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">Licence</a></p>
        `,
      },
      {
        id: 'typefaces',
        heading: 'Typefaces',
        body: `
          <p>All four are used under the
          <a href="https://openfontlicense.org/open-font-license-official-text/" rel="noopener" target="_blank">SIL Open Font License, Version 1.1</a>.</p>
          <ul>
            <li><strong>Fraunces</strong> — Copyright 2018 The Fraunces Project
            Authors
            (<a href="https://github.com/undercasetype/Fraunces" rel="noopener" target="_blank">github.com/undercasetype/Fraunces</a>)</li>
            <li><strong>Hanken Grotesk</strong> — Copyright 2021 The Hanken Grotesk
            Project Authors
            (<a href="https://github.com/marcologous/hanken-grotesk" rel="noopener" target="_blank">github.com/marcologous/hanken-grotesk</a>)</li>
            <li><strong>DM Mono</strong> — Copyright 2020 The DM Mono Project Authors
            (<a href="https://github.com/googlefonts/dm-mono" rel="noopener" target="_blank">github.com/googlefonts/dm-mono</a>)</li>
            <li><strong>Grand Hotel</strong> — Copyright (c) 2012 Brian J.
            Bonislawsky and Jim Lyles, DBA Astigmatic (AOETI), with Reserved Font
            Name "Grand Hotel"</li>
          </ul>
        `,
      },
      {
        id: 'films',
        heading: 'Films',
        body: `
          <p>Tutorial films play through YouTube's embedded player. Each film is the
          work of the channel that made it and belongs to that channel. We do not
          own, host, or claim any rights in them.</p>
          <p>Use of the player is subject to the
          <a href="https://www.youtube.com/t/terms" rel="noopener" target="_blank">YouTube Terms of Service</a>.</p>
        `,
      },
      {
        id: 'patterns',
        heading: 'Patterns',
        body: `
          <p>Every pattern in the Crochet Genie catalogue is our own original work.
          None of it is adapted from another designer's pattern.</p>
        `,
      },
      {
        id: 'contact',
        heading: 'Corrections',
        body: `
          <p>If something here is attributed wrongly, or is missing, tell us at
          ${mailto} and we will fix it.</p>
        `,
      },
    ],
  },
};
