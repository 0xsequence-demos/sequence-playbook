import UserAuthenticationBook from "~/content/books/user-authentication";

const Books: Record<
  string,
  ({ children }: { children: React.ReactNode }) => React.ReactNode
> = {
  "user-authentication": UserAuthenticationBook,
};

export default Books;
