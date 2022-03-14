import { useState } from "react";
export const EditForm = ({ setEdit, inputValue, saveTask, id }) => {
  const [text, setText] = useState(inputValue);
  function submitHandler(e) {
    e.preventDefault();
    console.log(text, id);

    saveTask(text, id);
    setEdit((p) => !p);
  }
  const styleObject = {
    backgroundColor: "white",
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        style={styleObject}
        type="text"
        name=""
        className="input"
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="false"
        spellCheck="false"
        placeholder="Add Task"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};
