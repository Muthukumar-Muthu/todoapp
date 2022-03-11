const Form = ({ text, setText, submitHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <input
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

export default Form;
