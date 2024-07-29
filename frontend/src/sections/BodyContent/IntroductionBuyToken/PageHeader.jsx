const PageHeader = ({ pageTitle }) => {
  return (
    <h2 className="flex justify-start text-white lg:text-[55px] text-[32px] font-bold mb-3">
      {pageTitle && pageTitle}
    </h2>
  );
};

export default PageHeader;
