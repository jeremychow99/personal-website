import { NextComponentType } from "next";
const Skills: NextComponentType = () => {
  // should create skill badges myself instead of depending on shields.io so that even if the site is down the badges still render, but too lazy to do
  const skillArr = [
    "https://img.shields.io/badge/Python-0078D7?style=for-the-badge&logo=python&logoColor=white&color=black&",
    "https://img.shields.io/badge/TypeScript-0078D7?style=for-the-badge&logo=typescript&logoColor=white&color=black&",
    "https://img.shields.io/badge/JavaScript-0078D7?style=for-the-badge&logo=javascript&logoColor=white&color=black&",
    "https://img.shields.io/badge/Vue-0078D7?style=for-the-badge&logo=vuedotjs&logoColor=white&color=black&",
    "https://img.shields.io/badge/Express-0078D7?style=for-the-badge&logo=express&logoColor=white&color=black&",
    "https://img.shields.io/badge/Docker-0078D7?style=for-the-badge&logo=docker&logoColor=white&color=black&",
    "https://img.shields.io/badge/Kubernetes-0078D7?style=for-the-badge&logo=kubernetes&logoColor=white&color=black",
    "https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white&color=black",
    "https://img.shields.io/badge/Redis-0078D7?style=for-the-badge&logo=redis&logoColor=white&color=black&",
  ];
  return (
    <div>
      {skillArr.map((skill, i) => {
        return <img key={i} src={skill}></img>;
      })}
    </div>
  );
};

export default Skills;
