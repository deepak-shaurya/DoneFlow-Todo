import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../AllApis";

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ( listId : string ) =>
      deleteList(listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });
};
