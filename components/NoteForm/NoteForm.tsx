"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";
import css from "./NoteForm.module.css";
import { NoteTag } from "@/types/note";

const TAG_OPTIONS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  async function formAction(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NoteTag;

    await createNote({ title, content, tag });

    clearDraft();
    await queryClient.invalidateQueries({ queryKey: ["notes"] });
    router.push("/notes/filter/all");
  }

  function handleCancel() {
    router.back();
  }

  return (
    <form className={css.form} action={formAction}>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor="title">
          Title
        </label>
        <input
          className={css.input}
          id="title"
          name="title"
          type="text"
          placeholder="Note title"
          defaultValue={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor="content">
          Content
        </label>
        <textarea
          className={css.textarea}
          id="content"
          name="content"
          placeholder="Note content"
          defaultValue={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          rows={6}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor="tag">
          Tag
        </label>
        <select
          className={css.select}
          id="tag"
          name="tag"
          defaultValue={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
        >
          {TAG_OPTIONS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
