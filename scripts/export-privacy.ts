import { writeFileSync } from 'node:fs';
import { privacyPolicyMarkdown } from '../src/content/privacyPolicy';

writeFileSync('docs/privacy-policy.md', privacyPolicyMarkdown());
console.log('Wrote docs/privacy-policy.md');
