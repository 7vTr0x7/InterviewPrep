import React from "react";
import { use } from "react";
import { useState } from "react";

const fileExplorerData = [
  {
    id: 1,
    name: "Documents",
    type: "folder",
    children: [
      {
        id: 11,
        name: "Projects",
        type: "folder",
        children: [
          {
            id: 111,
            name: "ReactNotes.txt",
            type: "file",
          },
          {
            id: 112,
            name: "Resume.docx",
            type: "file",
          },
        ],
      },
      {
        id: 12,
        name: "Invoices",
        type: "folder",
        children: [
          {
            id: 121,
            name: "Invoice_Jan.pdf",
            type: "file",
          },
          {
            id: 122,
            name: "Invoice_Feb.pdf",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Pictures",
    type: "folder",
    children: [
      {
        id: 21,
        name: "Vacation",
        type: "folder",
        children: [
          { id: 211, name: "Beach.png", type: "file" },
          { id: 212, name: "Mountain.jpg", type: "file" },
        ],
      },
      {
        id: 22,
        name: "Profile.jpg",
        type: "file",
      },
    ],
  },
  {
    id: 3,
    name: "Music",
    type: "folder",
    children: [
      { id: 31, name: "song1.mp3", type: "file" },
      { id: 32, name: "song2.mp3", type: "file" },
    ],
  },
];

const FileExplorer = ({ data, addHandler }) => {
  const [Open, setOpen] = useState({});
  const handleOpen = (e, node) => {
    e.stopPropagation();
    setOpen((prev) => ({ ...prev, [node.id]: !prev[node.id] }));
  };
  return (
    <div>
      {data.map((node, index) => (
        <div key={node.id}>
          <span
            onClick={(e) => handleOpen(e, node)}
            style={{ cursor: "pointer" }}>
            {node.type === "folder" ? "📁" : "📄"}
          </span>
          <span>{node.name}</span>
          {node.type === "folder" && (
            <>
              <span onClick={() => addHandler(node, "folder")}> {"📁"} + </span>
              <span onClick={() => addHandler(node, "file")}> {"📄"} + </span>
            </>
          )}
          <div style={{ marginLeft: "10px" }}>
            {Open[node.id] && node.children && (
              <FileExplorer data={node.children} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(fileExplorerData);

  const addHandler = (parent, type) => {
    const name = prompt("enter name");
    const updateNode = (list) => {
      return list.map((node) => {
        if (node.id === parent.id) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: Math.random(), name, type, children: [] },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }

        return node;
      });
    };

    setData((prev) => updateNode(prev));
  };

  return (
    <div>
      <FileExplorer data={data} addHandler={addHandler} />
    </div>
  );
};

export default App;
