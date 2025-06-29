import Image from "next/image";

interface ProductImageProps {
  image: string;
  title: string;
}

export function ProductImage({ image, title }: ProductImageProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="aspect-auto relative mb-4 flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width = {330}
          height = {430}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
