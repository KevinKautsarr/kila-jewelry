import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import ProductForm from "@/src/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground">Edit Produk</h1>
      <ProductForm
        mode="edit"
        initialValues={{
          id: product.id,
          name: product.name,
          price: String(product.price),
          description: product.description,
          category: product.category,
          image: product.image,
        }}
      />
    </div>
  );
}
