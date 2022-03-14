const Header = ({ name, profileUrl }) => {
  return (
    <header>
      <div>To Do App</div>
      <div className="profile">
        <span>{name}</span>
        <img src={profileUrl} alt="" />
      </div>
    </header>
  );
};

export default Header;
