import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo } from "../AllApis";

export const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, task }: { todoId: string; task: string;}) =>
      editTodo(todoId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] });
    },
  });
};
