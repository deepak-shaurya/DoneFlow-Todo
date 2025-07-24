import axios from "axios";
import type { AxiosResponse } from "axios";
import type { AuthBody, ListType, ListWithTodosType, TodoType, UserType } from "../Helpers/Types";

export const fatchAuthUser = async ():Promise<UserType | null >=>{
  try {
      const res : AxiosResponse<UserType> = await axios.get('/api/user/test', { withCredentials: true });
      const data = res.data;
      console.log(data , "from fatchAuthUser");
      
      return data;
  } catch (error) {
        console.error("Error fetching authenticated user:", error);
        return null
  }
}

export const fetchUserLists = async (): Promise<ListType[]> => {
  try {
    const res: AxiosResponse<{ lists: ListType[] }> = await axios.get('/api/list/getAll', { withCredentials: true });
    return res.data.lists;
  } catch (error) {
    console.error("Error fetching user lists:", error);
    throw error;
  }
};

export const authenticateUser = async ({body, endpoint}:{ body: AuthBody, endpoint:string }): Promise<UserType | null> => {
  try {
    const res: AxiosResponse<UserType> = await axios.post(endpoint , body, { withCredentials: true });
    if(res.status !== 200) {
      throw new Error("Authentication failed");
    }
    return res.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
}

export const createList = async ({name, description}:{name:string, description:string}): Promise<ListType> => {
  try {
    const res: AxiosResponse<ListType> = await axios.post('/api/list/create', {name, description}, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error creating list:", error);
    throw error;
  }
};

export const deleteList = async (listId: string): Promise<{ message: string; list: ListType }> => {
  try {
    const res: AxiosResponse<{ message: string; list: ListType }> = await axios.delete('/api/list/delete', { data: { listId }, withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error deleting list:", error);
    throw error;
  }
};

// Apis for List page and ToDo operations...

export const fetchTodosByListId = async (listId: string): Promise<ListWithTodosType | null> => {
  try {
    const res: AxiosResponse<{ list: ListWithTodosType }> = await axios.get(`/api/list/get/${listId}`, { withCredentials: true });
    if(!res){
      console.log("Fetched response:", res);
    }  
    return res.data.list;
  } catch (error) {
    console.error("Error fetching todos by list ID:", error);
    throw error;
  }
};

export const addTodoToList = async (listId: string, task : string): Promise<TodoType> => { 
  try {
    const res: AxiosResponse<TodoType> = await axios.post('/api/todo/add', { listId, task }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error adding todo to list:", error);
    throw error;
  }
}

export const deleteTodo = async (todoId: string, listId: string): Promise<{message: string; todo: TodoType; updatedList: ListWithTodosType }> => {
  try {
    const res: AxiosResponse<{message: string; todo: TodoType; updatedList: ListWithTodosType }> = await axios.delete('/api/todo/delete', { data: { todoId, listId }, withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }

};

export const toggleTodoCompletion = async (todoId: string): Promise<TodoType> => {
  try {
    const res: AxiosResponse<TodoType> = await axios.put('/api/todo/togglecompletion', { todoId }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error toggling todo completion:", error);
    throw error;
  }
};

export const editTodo = async (todoId: string, task: string): Promise<TodoType> => {
  try {
    const res: AxiosResponse<TodoType> = await axios.post('/api/todo/edit', { todoId, task }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error editing todo:", error);
    throw error;
  }
};
