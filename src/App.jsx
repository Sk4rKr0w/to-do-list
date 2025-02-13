import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem("tasks");
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [input, setInput] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(items));
        } else {
            localStorage.removeItem("tasks");
        }
    }, [items]);

    const addTask = () => {
        if (input.trim() !== "") {
            if (editId !== null) {
                setItems(
                    items.map((item) =>
                        item.id === editId ? { ...item, text: input } : item
                    )
                );
                setEditId(null);
            } else {
                setItems([...items, { id: Date.now(), text: input }]);
            }
            setInput("");
        }
    };

    const removeTask = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const editTask = (id, text) => {
        setEditId(id);
        setInput(text);
    };

    return (
        <div className="flex flex-col gap-5 bg-[#1E1E1E] p-6 rounded-xl font-custom max-w-xl">
            <h1 className="text-3xl font-bold text-[#E0E0E0]">
                To-Do List 📄✏
            </h1>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={input}
                    placeholder="Things to do..."
                    onChange={(e) => setInput(e.target.value)}
                    className="py-2 px-4 bg-white rounded-lg flex-1"
                />
                <button
                    onClick={addTask}
                    disabled={input.trim() === ""}
                    className={`px-5 py-2 rounded-xl cursor-pointer transition ${
                        input.trim() !== ""
                            ? "bg-gray-300 hover:bg-gray-500 hover:text-white"
                            : "bg-gray-200 cursor-not-allowed"
                    }`}
                >
                    {editId !== null ? "Update" : "Add"}
                </button>
            </div>
            <ul className="mt-3 space-y-2">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center text-[#121212] bg-gray-300 px-4 py-2 rounded-md"
                    >
                        <p className="text-sm font-semibold truncate flex-1 text-left w-40 md:w-xl">
                            {item.text}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => editTask(item.id, item.text)}
                                className="cursor-pointer hover:bg-black transition rounded-lg p-1"
                            >
                                ✏
                            </button>
                            <button
                                onClick={() => removeTask(item.id)}
                                className="cursor-pointer hover:bg-black transition rounded-lg p-1"
                            >
                                ❌
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
