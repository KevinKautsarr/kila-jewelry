"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/src/lib/categories";
import { createProduct, updateProduct } from "@/src/lib/actions/manageProduct";

interface ProductFormValues {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

export default function ProductForm({
  mode,
  initialValues,
}: {
  mode: "create" | "edit";
  initialValues?: ProductFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(
    initialValues ?? {
      id: "",
      name: "",
      price: "",
      description: "",
      category: categories[0].value,
      image: "",
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ProductFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const input = {
      name: values.name,
      price: Number(values.price),
      description: values.description,
      category: values.category,
      image: values.image,
    };

    const result =
      mode === "create"
        ? await createProduct({ id: values.id, ...input })
        : await updateProduct(values.id, input);

    if (!result.success) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/produk");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-6">
      {mode === "create" ? (
        <div>
          <label
            htmlFor="id"
            className="text-xs uppercase tracking-widest text-muted"
          >
            ID Produk (slug)
          </label>
          <input
            id="id"
            type="text"
            required
            placeholder="mis. kalung-aurora"
            value={values.id}
            onChange={(event) => handleChange("id", event.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          />
        </div>
      ) : (
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            ID Produk
          </p>
          <p className="mt-2 text-sm text-muted">{values.id}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Nama Produk
        </label>
        <input
          id="name"
          type="text"
          required
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="text-xs uppercase tracking-widest text-muted"
          >
            Harga (Rp)
          </label>
          <input
            id="price"
            type="number"
            required
            min={1}
            value={values.price}
            onChange={(event) => handleChange("price", event.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="text-xs uppercase tracking-widest text-muted"
          >
            Kategori
          </label>
          <select
            id="category"
            required
            value={values.category}
            onChange={(event) => handleChange("category", event.target.value)}
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          >
            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}
                className="bg-background"
              >
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="image"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Path Gambar
        </label>
        <input
          id="image"
          type="text"
          required
          placeholder="/products/kalung-aurora.png"
          value={values.image}
          onChange={(event) => handleChange("image", event.target.value)}
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Deskripsi
        </label>
        <textarea
          id="description"
          required
          rows={4}
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          className="mt-2 w-full resize-none border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Menyimpan..."
          : mode === "create"
            ? "Tambah Produk"
            : "Simpan Perubahan"}
      </button>
    </form>
  );
}
