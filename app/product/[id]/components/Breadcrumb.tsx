import Link from "next/link";

interface BreadcrumbProps {
  category: string;
  title: string;
}

export function Breadcrumb({ category, title }: BreadcrumbProps) {
  const apiToDisplayMap: { [key: string]: string } = {
    electronics: "Electronics",
    jewelery: "Jewelry",
    "men's clothing": "Clothing",
    "women's clothing": "Women's Clothing",
  };

  const displayCategory = apiToDisplayMap[category.toLowerCase()] || category;

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-blue-600 cursor-pointer">
        Home
      </Link>
      <span className="mx-2">›</span>
      <Link
        href={`/?category=${encodeURIComponent(displayCategory)}`}
        className="hover:text-blue-600 cursor-pointer"
      >
        {displayCategory === category ? (
          <span className="capitalize">{category}</span>
        ) : (
          displayCategory
        )}
      </Link>
      <span className="mx-2">›</span>
      <span className="text-gray-900">
        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
      </span>
    </nav>
  );
}
