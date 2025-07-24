import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoCompletion } from "../AllApis";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) =>
      toggleTodoCompletion(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] });
    },
  });
};
