import { LoaderFunctionArgs } from "react-router";
import { Platform } from "~/components/platforms/Platforms";

export type BookInfo = {
  name: string;
  path: string;
  title: string;
  shortname?: string;

  image?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
  };
  platforms: Platform;
  description: string;
};
export type Book = {
  info: BookInfo;
  component?: () => JSX.Element;
  dependencies: any[];
  loader?: (context?: LoaderFunctionArgs) => Record<string, any>;
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
