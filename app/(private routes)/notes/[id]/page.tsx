// import { fetchNoteById } from '../../../lib/api'
// import NoteDetailsClient from './NoteDetails.client'
// import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

// interface Props {
//   params: Promise<{ id: string }>
// }

// const NoteDetailsPage = async ({ params }: Props) => {
//   const { id } = await params

//   const queryClient = new QueryClient()

//   queryClient.prefetchQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(id),
//   })

//   // const noteItem = await getNoteItem(id)

//   return (
//     <div>
//       <HydrationBoundary state={dehydrate(queryClient)}>
//         {/* <NoteDetailsPageClient noteId={id} /> */}
//         <NoteDetailsClient />
//       </HydrationBoundary>
//     </div>
//   )
// }
interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://notehub.com/notes/${id}`,
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
import { fetchNoteById } from "@/lib/api/serverApi";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const Notes = async () => {
  redirect("/notes/filter/all");
};

export default Notes;
