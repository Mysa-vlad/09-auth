import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { Note } from "../../types/note";
import type { AxiosResponse } from "axios";
import type { User } from "../../types/user";
import type {
  FetchNotesParams,
  FetchNotesResponse,
  CheckSessionResponse,
} from "./clientApi";

export async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
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
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const response = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

// export async function checkSession(): Promise<CheckSessionResponse> {
//   const cookieStore = await cookies();
//   const response = await nextServer.get<CheckSessionResponse>("/auth/session", {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return response.data;
// }
export async function checkSession(): Promise<AxiosResponse<CheckSessionResponse>> {
  const cookieStore = await cookies();
  const response = await nextServer.get<CheckSessionResponse>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response; 
}