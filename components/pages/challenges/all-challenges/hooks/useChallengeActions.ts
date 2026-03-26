import { Challenge } from "@/types/challenge";

export function useChallengeActions() {
  const handleCreate = (data: Partial<Challenge>) => {
    console.log("Handle Create api", data);
    // TODO: replace with real API call
  };

  const handleEdit = (data: Partial<Challenge>) => {
    console.log("Handle Edit api", data);
    // TODO: replace with real API call
  };

  const handleDelete = (data: Challenge) => {
    console.log("Handle Delete api", data);
    // TODO: replace with real API call
  };

  return { handleCreate, handleEdit, handleDelete };
}
