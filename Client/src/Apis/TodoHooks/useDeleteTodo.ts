import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../AllApis";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, listId }: { todoId: string; listId: string }) =>
      deleteTodo(todoId, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] });
    },
  });
};
