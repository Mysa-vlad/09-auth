import { nextServer } from "./api";
import type { Note, NoteTag } from "../../types/note";
import type { User } from "../../types/user";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params;
  const queryParams: Record<string, string | number> = { page, perPage };

  if (search) {
    queryParams.search = search;
  }

  if (tag) {
    queryParams.tag = tag;
  }

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function register(data: RegisterRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: LoginRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export interface CheckSessionResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string
}

export async function checkSession(): Promise<CheckSessionResponse> {
  const response = await nextServer.get<CheckSessionResponse>("/auth/session");
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
}

export interface UpdateMeRequest {
  username?: string;
}

export async function updateMe(data: UpdateMeRequest): Promise<User> {
  const response = await nextServer.patch<User>("/users/me", data);
  return response.data;
}
