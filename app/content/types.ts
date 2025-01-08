export type Book = {
  name: string;
  path: string;
  title: string;
  shortname?: string;

  image?: {
    src: string;
    alt?: string;
    width: number;
    height: number;
    className?: string;
  };
  description: string;
  content?: () => JSX.Element;
};

export type Topic = {
  name: string;
  title: string;
  path: string;
  icon: string;
  theme: {
    bgImage: string;
    bookColor: string;
  };
  description: string;
  books: Book[];
};
