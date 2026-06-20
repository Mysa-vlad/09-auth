"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";

// 1. Явно описуємо інтерфейс для порожніх пропсів компонента
type NotePreviewClientProps = Record<string, never>;

// 2. Застосовуємо тип NotePreviewClientProps до функціонального компонента
export default function NotePreviewClient({}: NotePreviewClientProps) {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false, // 3. ВИПРАВЛЕНО: Явно виставлено у false для уникнення зайвих запитів
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div>
        {isLoading && <p>Loading note details...</p>}
        {isError && <p>Error loading note details.</p>}

        {note && (
          <div>
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
            >
              ✕ Close
            </button>

            <article>
              <h1 style={{ marginTop: "20px" }}>{note.title}</h1>
              <p style={{ color: "#666", fontSize: "14px" }}>Tag: {note.tag}</p>
              <hr />
              <div style={{ marginTop: "15px", whiteSpace: "pre-wrap" }}>
                {note.content}
              </div>
            </article>
          </div>
        )}
      </div>
    </Modal>
  );
}
