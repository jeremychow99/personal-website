import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RepoTable from "../components/repoTable";

interface repo {
  _id: String;
  repoName: string;
  description: String | undefined;
  createdAt: String;
  updatedAt: String;
  language: String;
  size: Number;
  url: String;
  dbEntryCreationTime: String;
  __v: Number;
}

const Home: NextPage = (props) => {
  const objArr: any = Object.values(props)[0];
  const testing = objArr.map(
    function(){
      console.log('test')
    }
  )

  return (
    <div>
      <div>
        {objArr.map(function(item:repo, i){
          return <h1 key={i}>{item.repoName}</h1>
        })}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch("http://127.0.0.1:8080/");
  const repoData = await result.json();
  let gitRepos: Array<repo> = [];
  for (let repo of repoData) {
    gitRepos.push(repo);
  }
  return {
    props: {
      gitRepos,
    },
  };
};
