const Close = () => {
  return (
    <svg
      className="hover:bg-neutral-100 rounded-[50%] hover:fill-red-600"
      xmlns="http://www.w3.org/2000/svg"
      height="47"
      width="47"
    >
      <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
    </svg>
  );
};

const Menu = ({ className }) => {
  return (
    <svg
      className={className}
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="2" rx="1" fill="white" />
      <rect y="16" width="22" height="2" rx="1" fill="white" />
      <rect y="8" width="22" height="2" rx="1" fill="white" />
    </svg>
  );
};

export { Close, Menu };
