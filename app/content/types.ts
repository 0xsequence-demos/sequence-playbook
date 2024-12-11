export type Book = {
  name: string;
  path: string;
  title: string;
  shortname?: string;

  hero?: {
    image: string;
    alt?: string;
    width: number;
    height: number;
    className?: string;
  };
  description: string;
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
