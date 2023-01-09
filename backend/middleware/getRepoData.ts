import { gitRepo } from '../models/gitRepos'

const getRepoData = async () => {
    const repoData = gitRepo.find().sort({repoNumber: 1})
    console.log('working')
    return repoData
}

export default getRepoData