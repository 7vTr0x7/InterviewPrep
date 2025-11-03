import React, { useState } from "react";

const chechData = [
  {
    id: 1,
    label: "Parent 1",
    children: [
      {
        id: 11,
        label: "Child 1.1",
        children: [
          { id: 111, label: "Subchild 1.1.1" },
          { id: 112, label: "Subchild 1.1.2" },
        ],
      },
      {
        id: 12,
        label: "Child 1.2",
      },
    ],
  },
  {
    id: 2,
    label: "Parent 2",
    children: [
      { id: 21, label: "Child 2.1" },
      { id: 22, label: "Child 2.2" },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleChange = (isCheck, box) => {
    setChecked((prev) => {
      let newState = { ...prev, [box.id]: isCheck };

      if (box.children) {
        const updateChild = (node) => {
          node.children.forEach((child) => {
            newState[child.id] = isCheck;
            if (child.children) {
              updateChild(child);
            }
          });
        };

        updateChild(box);
      }
      const verifyCheck = (node) => {
        if (!node.children) return newState[node.id] || false;
        const allChecked = node.children.every((child) => verifyCheck(child));
        newState[node.id] = allChecked;
        return allChecked;
      };
      chechData.forEach((node) => verifyCheck(node));

      return newState;
    });
  };

  return (
    <div>
      {data.map((box) => (
        <div key={box.id}>
          <input
            type="checkbox"
            checked={checked[box.id] || false}
            onChange={(e) => handleChange(e.target.checked, box)}
          />
          <label>{box.label}</label>
          <div style={{ marginLeft: "20px" }}>
            {box.children && (
              <CheckBoxes
                data={box.children}
                checked={checked}
                setChecked={setChecked}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [checked, setChecked] = useState({});

  return (
    <div>
      <CheckBoxes data={chechData} checked={checked} setChecked={setChecked} />
    </div>
  );
};

export default App;
