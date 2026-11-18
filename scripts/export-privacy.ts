import { writeFileSync } from 'node:fs';
import { privacyPolicyHtml, privacyPolicyMarkdown } from '../src/content/privacyPolicy';

writeFileSync('docs/privacy-policy.md', privacyPolicyMarkdown());
writeFileSync('docs/privacy-policy.html', privacyPolicyHtml() + '\n');
console.log('Wrote docs/privacy-policy.md and docs/privacy-policy.html');
