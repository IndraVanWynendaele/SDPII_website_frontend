import {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  useEffect,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api";

const STATUS = "status";
const TYPE = "type";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [status, setStatus] = useState(localStorage.getItem(STATUS));
  const [type, setType] = useState(localStorage.getItem(TYPE));

  const { trigger: me } = useSWRMutation("me", api.checkMe);

  const dataFetch = async () => {
    try {
      const data = await me();
      setReady(true);
      if (data.status === 200) {
        setIsAuthed(true);
      } else {
        setIsAuthed(false);
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const {
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation("auth/login", api.post);

  const {
    isMutating: logoutLoading,
    error: logoutError,
    trigger: doLogout,
  } = useSWRMutation("auth/logout", api.post);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation("auth/sign-up", api.post);

  const {
    isMutating: editLoading,
    error: editError,
    trigger: doEdit,
  } = useSWRMutation("me", api.patch);

  const setSession = useCallback((status, type) => {
    setStatus(status);
    setType(type);

    localStorage.setItem(STATUS, status);
    localStorage.setItem(TYPE, type);
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const gebruiker = await doLogin({
          email,
          password,
        });

        if (gebruiker.status === 200) {
          setSession(gebruiker.status, gebruiker.data.type);
          await dataFetch();
          return true;
        }

        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession]
  );

  const logout = useCallback(async () => {
    setStatus(null);
    setType(null);
    setIsAuthed(false);
    const data = await doLogout();
    localStorage.removeItem(STATUS);
    localStorage.removeItem(TYPE);
  }, []);

  function setItemWithExpiration(key, value, expirationMinutes) {
    localStorage.removeItem(key);
    const expirationTime = new Date().getTime() + expirationMinutes * 60 * 1000;

    const item = {
      value: value,
      expirationTime: expirationTime,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  const sign_up = useCallback(
    async (data) => {
      try {
        await doRegister(data);
        setItemWithExpiration("sign_up", true, 2);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession]
  );

  const edit = useCallback(
    async (data) => {
      try {
        await doEdit(data);
        setItemWithExpiration("edit", true, 2);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession]
  );

  const value = useMemo(
    () => ({
      type,
      status,
      loginError,
      logoutError,
      registerError,
      editError,
      error: loginError || logoutError || registerError || editError,
      ready,
      loginLoading,
      logoutLoading,
      registerLoading,
      editLoading,
      loading: loginLoading || logoutLoading || registerLoading || editLoading,
      isAuthed,
      login,
      logout,
      sign_up,
      edit,
      setItemWithExpiration,
    }),
    [
      type,
      status,
      loginError,
      logoutError,
      registerError,
      editLoading,
      ready,
      loginLoading,
      logoutLoading,
      registerLoading,
      editLoading,
      isAuthed,
      login,
      logout,
      sign_up,
      edit,
      setItemWithExpiration,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
