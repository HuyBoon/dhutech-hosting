import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { mkdirSync, existsSync } from 'fs';
import path from 'path';
import simpleGit from 'simple-git';

interface DeployRequestBody {
    git_repo: string;
    branch: string;
    web_name: string;
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as DeployRequestBody;
        const { git_repo, branch, web_name } = body;

        if (!git_repo || !branch || !web_name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const deployRoot = path.resolve('./deployments');
        const deployDir = path.join(deployRoot, web_name);

        if (!existsSync(deployRoot)) {
            mkdirSync(deployRoot);
        }

        const git = simpleGit();

        if (existsSync(deployDir)) {
            const project = simpleGit(deployDir);
            await project.fetch();
            await project.checkout(branch);
            await project.pull('origin', branch);
        } else {
            await git.clone(git_repo, deployDir);
            const project = simpleGit(deployDir);
            await project.checkout(branch);
        }

        return await new Promise<Response>((resolve) => {
            exec(`cd ${deployDir} && npm install && npm run build`, (error, stdout, stderr) => {
                if (error) {
                    console.error('Build error:', stderr);
                    resolve(
                        NextResponse.json({ error: 'Build failed', details: stderr }, { status: 500 })
                    );
                } else {
                    resolve(
                        NextResponse.json({
                            message: `Deployment for ${web_name} completed successfully.`,
                            output: stdout,
                        })
                    );
                }
            });
        });
    } catch (err: any) {
        console.error('Deploy error:', err.message);
        return NextResponse.json({ error: 'Deployment failed', details: err.message }, { status: 500 });
    }
}
