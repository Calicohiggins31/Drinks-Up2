/**
 * Single source for the privacy policy: shown in the app (Settings → Privacy policy)
 * and exported to docs/privacy-policy.md with `npm run privacy:md` for the store listings.
 *
 * Before publishing: replace the [BRACKETED] placeholders and have it reviewed.
 * When location or analytics features ship, update the "Location" and "Analytics"
 * sections BEFORE releasing that version.
 */
export const PRIVACY_EFFECTIVE_DATE = '[EFFECTIVE DATE]';
export const PRIVACY_CONTACT = '[CONTACT EMAIL]';
export const PRIVACY_OWNER = '[COMPANY OR OWNER NAME]';

export type PolicySection = { heading: string; body: string[] };

export const PRIVACY_POLICY: PolicySection[] = [
  {
    heading: 'Who we are',
    body: [
      `Drinks Up is operated by ${PRIVACY_OWNER}. If you have questions about this policy or your data, contact us at ${PRIVACY_CONTACT}.`,
    ],
  },
  {
    heading: 'Age requirement',
    body: [
      'Drinks Up is only for people aged 21 or older. When you first open the app we ask for your date of birth. We use it only to check your age on your phone. We do not store or send your date of birth; we only remember on your phone whether you passed the check.',
      'We do not knowingly collect information from anyone under 21. If you believe someone under 21 has created an account, contact us and we will delete it.',
    ],
  },
  {
    heading: 'Information stored only on your phone',
    body: [
      'Without an account, everything stays on your device: the ingredients in your bar, your favourite drinks, and your unit preference (oz or ml). We cannot see this information. Deleting the app deletes it.',
    ],
  },
  {
    heading: 'Information we collect if you create an account',
    body: [
      'An account is optional and free. It is required to create your own recipes, and lets you back up your favourites and use them on other devices.',
      'When you create an account we collect your name, email address, city and state, and a password (stored securely by our provider; we cannot see it).',
      'While you are signed in we store the recipes you create, any ingredients you add yourself, and your favourite drinks, so they can be backed up and synced.',
      'We use this information to run your account, sync your data, respond to you, and understand at a city/state level where the app is used. We do not sell your personal information.',
    ],
  },
  {
    heading: 'Location',
    body: [
      'This version of Drinks Up does not access your location. When you tap "Find a liquor store near me", the app opens your maps app (Apple Maps or Google Maps) with a search. That maps app may use your location under its own privacy policy; Drinks Up does not receive it.',
      'If a future version offers an in-app list of nearby stores, it will ask for your approximate (not precise) location only when you tap that button and only while the app is open. We will update this policy before that version is released.',
    ],
  },
  {
    heading: 'Analytics',
    body: [
      'This version of Drinks Up does not use advertising or analytics tracking. If we later count which recipes are viewed, we will only keep anonymous totals grouped by broad area, never linked to your name or email, and we will update this policy first.',
    ],
  },
  {
    heading: 'Service providers',
    body: [
      'Account data is stored with Supabase, our database and sign-in provider, on servers that may be located in the United States. Supabase processes it only on our behalf.',
    ],
  },
  {
    heading: 'Keeping and deleting your data',
    body: [
      'We keep your account data until you delete your account. You can delete your account and all of its data at any time in the app (Saved → Account → Delete account), or by emailing us. Data on your phone is removed when you delete the app.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'Depending on where you live (for example California), you may have the right to know what personal information we hold about you, to get a copy, to correct it, or to delete it. Contact us at the email above and we will respond within the time required by law.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'Data sent between the app and our servers is encrypted. Each account can only read its own data. No system is perfectly secure, but we take reasonable steps to protect your information.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'If we change this policy we will update the date below and, for significant changes, tell you in the app.',
      `Effective date: ${PRIVACY_EFFECTIVE_DATE}`,
    ],
  },
];

export function privacyPolicyMarkdown(): string {
  return [
    '# Drinks Up Privacy Policy',
    '',
    ...PRIVACY_POLICY.flatMap((s) => [`## ${s.heading}`, '', ...s.body.flatMap((p) => [p, ''])]),
  ].join('\n');
}
