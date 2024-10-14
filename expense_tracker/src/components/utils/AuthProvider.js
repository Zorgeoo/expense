"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "../library/axios";

const AuthContext = createContext();
const authPaths = ["/LogIn", "/SignUp"];
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null); //user medeelel aguulsn bol nevtersen.
  const [isReady, setIsReady] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password }); //response-d postolson huseltiinhee hariug hadgalna /token,user medeeleltei irne/
      localStorage.setItem("token", res.data.token); //Localstorage deer token-r SETelne./browser deer hadgalagdsn/
      toast.success(res.data.message);
      setUser(res.data.user); //Res-s irsen useriin mdeellee user stated hadgalna.
      router.replace("/");
    } catch (error) {
      toast.error(error.res?.data?.message || "Тийм бүртгэл алга");
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post("/auth/register", {
        //ene path-ruu edgeer medeeleltei REQ ilgeene
        name,
        email,
        password,
      });
      router.push("/LogIn"); //REQ buren yvj duussani daraa login hesegruu yvulna
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const logOut = async () => {
    try {
      localStorage.removeItem("token"); //token-oo localstorage dotroos ustgana.

      toast.success("Амжилттай гарлаашдээ хө");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Гарч чадсангүй ээ чаавас");
    }
  };

  //Bagsh
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsReady(false);

        const token = localStorage.getItem("token"); //Local storage-s tokenoo avna.

        if (!token) return; //token bhgui bol duusgana.

        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`, //Hervee token baival user ooriin mdeellee avna. buh huseltuud headers deer tokenoo yvuulna.
          },
        });

        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        toast.error("Гарчдаг байшд кк");
      } finally {
        setIsReady(true);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (authPaths.includes(pathname)) return;

    if (!isReady) return;

    if (!user) router.replace("/LogIn");
  }, [pathname, user, isReady]);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ login, register, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
