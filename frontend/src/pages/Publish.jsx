import { useState } from "react";

function Publish() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, summary, content });
        alert("Post published (frontend only for now)!");
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Publish Your Work</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Short Summary"
                    className="border p-2 rounded"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <textarea
                    placeholder="Full Content"
                    className="border p-2 rounded h-40"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Publish;
