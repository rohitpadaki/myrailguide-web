function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <svg
        className="h-64 w-64 text-white"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" />{" "}
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />{" "}
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />{" "}
        <path d="M10 12l4 4m0 -4l-4 4" />
      </svg>
      <h1 className="font-extrabold text-5xl text-white">
        404 - Page Not Found
      </h1>
    </div>
  );
}

export default NotFound;
