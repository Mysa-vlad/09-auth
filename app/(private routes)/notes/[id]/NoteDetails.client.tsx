"use client";
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// const NoteDetailsPageClient = ({noteId}:Props) => {
const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: noteItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div>Loading, please wait...</div>;
  }

  if (isError || !noteItem) {
    return <div>Something went wrong.</div>;
  }

  const created = noteItem.createdAt
    ? new Date(noteItem.createdAt).toLocaleString()
    : "";

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{noteItem.title}</h2>
        </div>
        <p className={css.tag}>{noteItem.tag}</p>
        <p className={css.content}>{noteItem.content}</p>
        <p className={css.date}>{created}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
