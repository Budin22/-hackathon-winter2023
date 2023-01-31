import React, { useEffect, useState } from "react";
import axios from "axios";

type Project = {
  projectName: string;
  date: string;
  author: string;
};

function App() {
  const [text, setText] = useState<string>("");
  const [projectList, setProjectList] = useState<Array<Project>>([]);

  useEffect(() => {
    const projects = axios
      .get("http://localhost:7070/project")
      .then((res) => res.data)
      .then((data) => setProjectList(data));
  }, []);

  const addProject = () => {};

  return (
    <>
      <div>
        <input type="text" value={text} />
        <button onClick={addProject}>Submit</button>
      </div>
      <div>
        {!!projectList.length &&
          projectList.map((item) => {
            return (
              <div>
                <h4>{item.projectName}</h4>
                <h4>{item.date}</h4>
                <h4>{item.author}</h4>
                <h4>Progress</h4>
                <button>remove</button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
