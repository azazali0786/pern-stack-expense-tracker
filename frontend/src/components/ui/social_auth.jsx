import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebaseConfig";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import api from "../../libs/apiCall";
import { Button } from "./button";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";

export const SocialAuth = ({ isLoading, setLoading }) => {
  const [user] = useAuthState(auth);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const setCredentials = useStore((state) => state.setCredentials);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setSelectedProvider("google");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    setSelectedProvider("github");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      toast.error("GitHub login failed");
    }
  };

  useEffect(() => {
  if (!user || !selectedProvider) return;

  const saveUserToDb = async () => {
    try {
      setLoading(true);

      const userData = {
        name: user.displayName,
        email: user.email,
        provider: selectedProvider,
        uid: user.uid,
      };

      const { data: res } = await api.post("/auth/sign-in", userData);

      if (res?.user) {
        toast.success(res?.message);
        const userInfo = { ...res.user, token: res.token };
        localStorage.setItem("user", JSON.stringify(userInfo));

        setCredentials(userInfo);

        // ✅ Redirect Works Now
        navigate("/overview", { replace: true });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  saveUserToDb();
}, [user, selectedProvider, navigate]);


  return (
    <div className="flex items-center gap-2">
      <Button
        // onClick={signInWithGoogle} 
        disabled={isLoading}
        variant="outline"
        className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
        type="button"
      >
        <FcGoogle className="mr-2 size-5" />
        Continue with Google
      </Button>

      {/* If you want GitHub enable this */}
      {/* <Button
        onClick={signInWithGithub}
        disabled={isLoading}
        variant="outline"
        className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
        type="button"
      >
        <FaGithub className="mr-2 size-4" />
        GitHub
      </Button> */}
    </div>
  );
};
