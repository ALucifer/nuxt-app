const isAuthenticated = () => {
  return false;
};

export default function useAuth() {
  return { isAuthenticated };
}
