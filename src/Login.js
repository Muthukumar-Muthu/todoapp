import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const Login = ({ setUser }) => {
  async function login() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider);
      console.log(getAuth().currentUser);
      setUser(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <span onClick={login} className="login">
        Login With Google
      </span>
    </div>
  );
};
export default Login;
