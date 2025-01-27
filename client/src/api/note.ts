import axios from "./axios";
import { NoteData } from "../interfaces/NoteData";

export const createNoteRequest = (note: NoteData, id_goal: string) =>
  axios.post(`/goals/${id_goal}/notes`, note);

export const getNotesRequest = (id_goal: string) =>
  axios.get(`/goals/${id_goal}/notes`);

export const deleteNoteRequest = (id_note: string, id_goal: string) =>
  axios.delete(`/goals/${id_goal}/notes/${id_note}`);
