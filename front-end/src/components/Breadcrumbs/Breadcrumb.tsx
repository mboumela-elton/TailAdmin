import Link from "next/link";
interface BreadcrumbProps {
  page1: string;
  page2: string;
}
const Breadcrumb = ({ page1, page2 }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {page2}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              {page1 + " /"}
            </Link>
          </li>
          <li className="font-medium text-primary">{page2}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
