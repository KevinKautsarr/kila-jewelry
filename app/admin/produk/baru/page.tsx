import ProductForm from "@/src/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground">Tambah Produk</h1>
      <ProductForm mode="create" />
    </div>
  );
}
