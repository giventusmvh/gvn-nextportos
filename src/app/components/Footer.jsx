const Footer = () => {
  return (
    <footer className="footer border-t border-[#33353F] text-white">
      <div className="container p-12 flex flex-col lg:flex-row justify-between items-center mx-auto">
        <span className="text-md lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
          Giventus Marco
        </span>
        <p className="text-md lg:text-2xltext-slate-400">
          @2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
