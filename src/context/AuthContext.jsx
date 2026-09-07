import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const USERS_KEY = "shoppy-users";
const SESSION_KEY = "shoppy-session";

const AuthContext = createContext();

function readUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage failures.
  }
}

function readSession() {
  try {
    return localStorage.getItem(SESSION_KEY) || "";
  } catch {
    return "";
  }
}

function writeSession(userId) {
  try {
    if (!userId) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }

    localStorage.setItem(SESSION_KEY, userId);
  } catch {
    // Ignore storage failures.
  }
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function findUserByEmail(users, email) {
  const normalized = normalizeEmail(email);
  return users.find((user) => user.email === normalized) || null;
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readUsers());
  const [currentUserId, setCurrentUserId] = useState(() => readSession());

  const currentUser = useMemo(
    () => users.find((user) => user.id === currentUserId) || null,
    [users, currentUserId]
  );

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers);
    writeUsers(nextUsers);
  };

  const setSession = (userId) => {
    setCurrentUserId(userId || "");
    writeSession(userId || "");
  };

  const signup = ({ name, email, password }) => {
    const trimmedName = String(name || "").trim();
    const normalizedEmail = normalizeEmail(email);
    const nextPassword = String(password || "");

    if (trimmedName.length < 2) {
      throw new Error("Please enter your full name.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      throw new Error("Please enter a valid email address.");
    }

    if (nextPassword.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const existing = findUserByEmail(users, normalizedEmail);

    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const user = {
      id: crypto.randomUUID(),
      name: trimmedName,
      email: normalizedEmail,
      password: nextPassword,
      createdAt: new Date().toISOString(),
    };

    persistUsers([...users, user]);
    setSession(user.id);

    return user;
  };

  const login = ({ email, password }) => {
    const user = findUserByEmail(users, email);

    if (!user || user.password !== String(password || "")) {
      throw new Error("Invalid email or password.");
    }

    setSession(user.id);
    return user;
  };

  const logout = () => {
    setSession("");
  };

  const requestPasswordReset = (email) => {
    const user = findUserByEmail(users, email);

    if (!user) {
      throw new Error("No account found with that email.");
    }

    return user.email;
  };

  const resetPassword = ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const nextPassword = String(password || "");

    if (nextPassword.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const user = findUserByEmail(users, normalizedEmail);

    if (!user) {
      throw new Error("No account found with that email.");
    }

    persistUsers(
      users.map((item) =>
        item.id === user.id
          ? { ...item, password: nextPassword }
          : item
      )
    );

    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAuthenticated: Boolean(currentUser),
        signup,
        login,
        logout,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
