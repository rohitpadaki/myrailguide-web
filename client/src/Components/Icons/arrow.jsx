function Arrow(props) {
  const tempClass = "h-8 w-8 " + props.color;
  return (
    <svg
      className={tempClass}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

export default Arrow;
