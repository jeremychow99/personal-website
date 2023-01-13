import "@fortawesome/fontawesome-svg-core/styles.css";
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import { faFileDownload, faDownload } from "@fortawesome/free-solid-svg-icons";

interface repo {
  _id: string;
  repoName: string;
  description: string | undefined;
  createdAt: string;
  updatedAt: string;
  language: string;
  topics: Array<string>;
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
  const topicList = ["firebase", "kubernetes", "vite"]
  const repos = await getRepoData();
  console.log(repos)
  return (
    <div>
      <table
        className="table shadow-lg bg-white table-responsive text-center"
        style={{
          borderCollapse: "separate",
          borderSpacing: "15px 10px",
        }}
      >
        <thead className="border-grey-200 border-b-2 text-xl">
          <tr>
            <td>Repository Name</td>
            <td>Description</td>
            <td>tools</td>
            <td>Updated</td>
            <td>Size(kb)</td>
            <td>Download</td>
          </tr>
        </thead>
        <tbody>
          {repos.map(function (item: repo, i) {
            return (
              <tr key={item._id} className="text-lg">
                <td>
                  <a
                    href={item.url}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    {item.repoName}
                  </a>
                </td>
                <td>{item.description?.slice(0, 30) + "..."}</td>
                <td>
                    {item.topics.map((topic, index) => {
                      let postfix =  topicList.includes(topic) ? "-plain.svg" : "-original.svg"
                      return <img className="inline px-0.5" src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/" + topic + "/" + topic + postfix} style={{height: '30px', width: '30px'}} />
                    })}
                </td>
                <td>{item.updatedAt.slice(0, 10)}</td>
                <td>{item.size.toString()}</td>
                <td>
                  <a
                    href={
                      "https://api.github.com/repos/jeremychow99/" +
                      item.repoName +
                      "/zipball/"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      style={{ fontSize: 20, color: "black" }}
                    />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
