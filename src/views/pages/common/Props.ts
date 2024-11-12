export type CommonPageProps = {
  label: string;
  setCurrentPageName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setCurrentPageDescription: React.Dispatch<React.SetStateAction<string>>;
};
