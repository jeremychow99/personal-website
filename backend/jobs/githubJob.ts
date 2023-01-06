import sanitizedConfig from '../config/config'
import { Octokit, App } from "octokit";
import { Worker, Queue } from 'bullmq';
import mongoose from 'mongoose';
import { User } from '../models/addData'

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

            const gitResponse = await octokit.request('GET /users/jeremychow99/repos{?type,sort,direction,per_page,page}', {
                username: 'jeremychow99'
            })


            clearCollections()

            for (let repo of gitResponse.data) {
                console.log(repo.name)
                const doc = new User(
                    {
                        title: repo.name,
                        createdAt: new Date()
                    }
                )
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