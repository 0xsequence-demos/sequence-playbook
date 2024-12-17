import UserAuthenticationBook from "~/content/user-authentication/user-authentication";

const Books: Record<string, () => React.ReactNode> = {
  "user-authentication": UserAuthenticationBook,
};

export default Books;
