import React, { useState, useEffect } from "react";

export default function Edit({ currentItem, onUpdate }) {
    const [form, setForm] = useState(currentItem);

    useEffect(() => {
        setForm(currentItem);
    }, [currentItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(form);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                name="nama"
                placeholder="Nama"
                value={form.nama}
                onChange={handleChange}
                required
                className="mr-2 p-2 border"
            />
            <input
                type="text"
                name="kategori"
                placeholder="Kategori"
                value={form.kategori}
                onChange={handleChange}
                required
                className="mr-2 p-2 border"
            />
            <input
                type="text"
                name="stok"
                placeholder="Stok"
                value={form.stok}
                onChange={handleChange}
                required
                className="mr-2 p-2 border"
            />
            <button type="submit" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                Update
            </button>
        </form>
    );
}
