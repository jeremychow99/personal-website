import { gitRepo } from '../models/gitRepos'

const getRepoData = async () => {
    const repoData = gitRepo.find()
    console.log('working')
    return repoData
}

export default getRepoData