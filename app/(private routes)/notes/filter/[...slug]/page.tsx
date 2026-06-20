import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const res = await params;
  const tag = res.slug?.[0] || "all";

  return {
    title: tag,
    description: `Notes category ${tag}`,
    openGraph: {
      title: tag,
      description: `Notes category ${tag}`,
      url: `https://notehub.com/`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Preview Image",
        },
      ],
    },
  };
};
const NotesFilterPage = async ({ params }: Props) => {
  const res = await params;
  const tag = res.slug?.[0] || "all";

  const currentTag = tag === "all" ? undefined : (tag as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentTag],
    queryFn: () => fetchNotes({ tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesFilterPage;
