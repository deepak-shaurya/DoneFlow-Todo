import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useDeleteList } from "../../Apis/ListHooks/DeleteList"; // update path if needed

type Props = {
  id: string;
  name: string;
  description: string;
  todos: string[];
};

const ListCard = ({ id, name, description, todos }: Props) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const { mutate: deleteList, isPending } = useDeleteList();

  const shortDesc =
    description.length > 250 ? description.slice(0, 250) + "..." : description;

  const handleClick = () => {
    navigate(`/todo-list/${id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigate
    deleteList(id);
  };

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigate
    setShowOptions(prev => !prev);
  };

  return (
    <div
      onClick={handleClick}
      className="relative group w-full max-w-2xl bg-gray-700 rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.02] hover:shadow-purple-600/30 duration-300 cursor-pointer"
    >
      {/* 3-dot icon */}
      <div className="absolute top-4 right-4 z-10">
        <button onClick={toggleOptions} className="text-white hover:text-purple-400">
          <HiDotsVertical size={20} />
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-2 w-36 bg-gray-800 shadow-md rounded-lg z-20 py-2">
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
            >
              <MdDelete className="mr-2" />
              {isPending ? "Deleting..." : "Delete List"}
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{shortDesc}</p>

      <div className="flex items-center gap-2 text-purple-400 text-sm">
        <FaClipboardList className="text-lg animate-pulse" />
        <span>{todos.length} {todos.length === 1 ? "task" : "tasks"}</span>
        <MdOutlineArrowForwardIos className="text-purple-500 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );
};

export default ListCard;
