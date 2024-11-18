import { TOPICS } from "../content/topics";

export function getLoaderBookData({
  topic,
  book,
}: {
  topic?: string;
  book?: string;
}) {
  if (topic && book) {
    try {
      const parentTopic = TOPICS.find((d) => d.name === topic);

      const data = parentTopic?.books?.find((b) => b.name === book);

      if (!data || !parentTopic) {
        throw new Error();
      }

      return {
        book: data,
        topic: parentTopic,
      };
    } catch {
      throw new Response("Not Found", { status: 404 });
    }
  }

  throw new Response("Not Found", { status: 404 });
}
