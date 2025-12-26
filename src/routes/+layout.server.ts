import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import type { LayoutServerLoad } from './$types';

function countSubdirectories(path: string): number {
	try {
		const entries = readdirSync(path);
		return entries.filter(entry => {
			const fullPath = join(path, entry);
			try {
				return statSync(fullPath).isDirectory();
			} catch {
				return false;
			}
		}).length;
	} catch {
		return 0;
	}
}

export const load: LayoutServerLoad = async () => {
	const basePath = 'src/routes/kb';

	const counts = {
		vulnerabilities: countSubdirectories(join(basePath, 'security/vulnerabilities')),
		vibeTools: countSubdirectories(join(basePath, 'vibe-coding-tools')),
		stacks: countSubdirectories(join(basePath, 'security/stacks')),
		checklists: countSubdirectories(join(basePath, 'security/checklists')),
		prompts: countSubdirectories(join(basePath, 'prompts'))
	};

	return { counts };
};
