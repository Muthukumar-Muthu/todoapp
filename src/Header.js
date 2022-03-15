const Header = ({ name, profileUrl, signOutHandler }) => {
  return (
    <header>
      <button className="sign-out" onClick={signOutHandler}>
        Sign Out
      </button>
      <div>To Do App</div>
      <div className="profile">
        <span>{name}</span>
        <img src={profileUrl} alt="" />
      </div>
    </header>
  );
};

export default Header;
