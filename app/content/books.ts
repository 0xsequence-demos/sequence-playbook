import UserAuthenticationBook from "~/content/books/user-authentication";

const Books: Record<string, () => React.ReactNode> = {
  "user-authentication": UserAuthenticationBook,
};

export default Books;
