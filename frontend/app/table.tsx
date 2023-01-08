
interface repo {
  _id: string;
  repoName: string;
  description: string | undefined;
  createdAt: string;
  updatedAt: string;
  language: string;
  size: number;
  url: string;
  dbEntryCreationTime: string;
  __v: number;
}

async function getRepoData() {
  const result = await fetch("http://127.0.0.1:8080/");
  const repoData = await result.json();
  let gitRepos: Array<repo> = [];
  for (let repo of repoData) {
    gitRepos.push(repo);
  }
  return gitRepos;
}

export default async function Table() {
  const repos = await getRepoData();
  return (
    <div>
      <table className="table shadow-lg bg-white table-responsive text-center">
        <thead className="border-grey-200 border-b-2 text-xl">
          <tr>
            <th>Repository Name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Size (kb)</th>
          </tr>
        </thead>
        <tbody>
          {repos.map(function (item: repo, i) {
            return (
              <tr key={i} className="text-lg">
                <td><a href={item.url} style={{color: 'blue', textDecoration:'underline'}}>{item.repoName}</a></td>
                <td>{item.description?.slice(0, 30) + "..."}</td>
                <td>{item.language}</td>
                <td>{item.createdAt.slice(0, 10)}</td>
                <td>{item.updatedAt.slice(0, 10)}</td>
                <td>{item.size.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
