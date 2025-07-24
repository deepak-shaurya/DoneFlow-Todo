import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createList } from "../../Apis/AllApis"; // adjust path as needed
import { motion } from "framer-motion";
import { X } from "lucide-react"; // for close icon

interface Props {
  onClose: () => void;
}

const CreateListForm: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      onClose(); // close the form
    },
    onError: (err) => {
      console.error("Failed to create list:", err);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, description });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-[#0d0d0d] p-6 rounded-2xl w-[90%] max-w-md shadow-lg relative"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <X />
        </button>
        <h2 className="text-xl font-semibold text-center text-[#40A2E3] mb-4">Create New List</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">List Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#40A2E3] text-white font-semibold py-2 rounded-md hover:bg-[#378bcc] transition"
          >
            {isPending ? "Creating..." : "Create List"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateListForm;
