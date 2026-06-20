"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api/clientApi";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import css from "../../NotesPage.module.css";
import Link from "next/link";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [prevTag, setPrevTag] = useState<string>(tag);
  if (tag !== prevTag) {
    setPage(1);
    setPrevTag(tag);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const currentTag = tag === "all" ? undefined : (tag as NoteTag);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", currentTag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        tag: currentTag,
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

        <Link href="/notes/action/create" className={css.button}>
          Create Note +
        </Link>
      </div>

      <h2>Notes {tag !== "all" ? `- ${tag}` : ""}</h2>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes. Please try again.</p>}

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          pageCount={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {/* {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )} */}
    </div>
  );
}
