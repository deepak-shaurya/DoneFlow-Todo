import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodoToList } from "../AllApis"; // adjust path as needed

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, task }: { listId: string; task: string }) =>
      addTodoToList(listId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] });
    },
  });
};
