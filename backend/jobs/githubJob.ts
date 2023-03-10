import sanitizedConfig from '../config/config'
import { Octokit, App } from "octokit";
import { Worker, Queue } from 'bullmq';
import mongoose from 'mongoose';
import { gitRepo } from '../models/gitRepos'

export const myQueue = new Queue('myQueue', {
    connection: {
        host: sanitizedConfig.REDIS_HOST,
        port: sanitizedConfig.REDIS_PORT
    }
});

export function githubJob() {

    myQueue.add(
        'githubJob',
        { foo: 'bar' },
        {
            repeat: {
                every: 60000,
            },
        },
    );

    async function clearCollections() {
        const collections = mongoose.connection.collections;

        await Promise.all(Object.values(collections).map(async (collection) => {
            await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
        }));
    }

    const worker = new Worker('myQueue', async job => {

        if (job.name === 'githubJob') {
            const octokit = new Octokit({
                auth: sanitizedConfig.GITHUB_TOKEN
            })

            const gitResponse = await octokit.request('GET /users/jeremychow99/repos?sort=pushed&type=all', {
                username: 'jeremychow99',
            })


            clearCollections()
            let i = 0
            for (let repo of gitResponse.data) {
                
                const doc = new gitRepo(
                    {   
                        repoNumber: i,
                        repoName: repo.name,
                        description: repo.description,
                        createdAt: repo.created_at,
                        updatedAt: repo.pushed_at,
                        language: repo.language,
                        topics: repo.topics,
                        size: repo.size,
                        url: repo.html_url,
                        dbEntryCreationTime: new Date()
                    }
                )
                i += 1
                doc.save()
            }
        }
    }, {
        connection: {
            host: sanitizedConfig.REDIS_HOST,
            port: sanitizedConfig.REDIS_PORT
        }
    })

}