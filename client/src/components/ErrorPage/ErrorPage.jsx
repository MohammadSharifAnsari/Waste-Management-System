function ErrorPage({ errorStatus = "", errorMsg = "" }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
        <h2 className="text-[200px] leading-tight font-mono text-gray-400 drop-shadow-xl cursor-default">
          {errorStatus || "404"}
        </h2>
        <div className="flex items-center gap-4 cursor-default">
          <p className="text-3xl font-mono text-gray-600 text-center ">
            {errorMsg || "Page Not Found"}
          </p>
          <svg
            className="hover:fill-yellow-400 hover:scale-105 transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={34}
            height={34}
            color={"#4b5563"}
            fill={"none"}
          >
            <path
              d="M17.854 12.16C17.471 12.6105 16.7631 12.6138 16.3165 12.1671L11.8329 7.68351C11.3862 7.23686 11.3895 6.529 11.84 6.14596L13.071 5.09939C13.9559 4.34704 15.0349 3.84824 16.2044 3.6509L16.9294 3.52858C17.614 3.41306 18.3339 3.65221 18.8475 4.16577L19.8342 5.15255C20.3478 5.66611 20.5869 6.38601 20.4714 7.07063L20.3491 7.79559C20.1518 8.9651 19.653 10.0441 18.9006 10.929L17.854 12.16Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M19.5 4.5L21.5 2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 21.5L4.5 19.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.14596 11.84C6.52901 11.3895 7.23686 11.3862 7.68351 11.8329L12.1671 16.3165C12.6138 16.7631 12.6105 17.471 12.16 17.854L10.929 18.9006C10.0441 19.653 8.9651 20.1518 7.79559 20.3491L7.07063 20.4714C6.38601 20.5869 5.66611 20.3478 5.15255 19.8342L4.16577 18.8475C3.65221 18.3339 3.41306 17.614 3.52858 16.9294L3.6509 16.2044C3.84824 15.0349 4.34704 13.9559 5.09939 13.071L6.14596 11.84Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8.5 12.5L10.5 10.5M11.5 15.5L13.5 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <button className="bg-white shadow-sm mt-5 hover:bg-gray-200 text-center px-4 py-2 rounded hover:scale-105 transition-all duration-300">
          Return to Home
        </button>
      </div>
    </>
  );
}

export default ErrorPage;