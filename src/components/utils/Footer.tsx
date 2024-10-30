export function Footer() {
  const version = __APP_VERSION__;
  return (
    <div className="flex w-full h-10 items-center justify-center text-gray-500">
      <span>
        Created by Bertrand Baudeur - pizza-party-maker v{version} -{" "}
        <a
          href="https://github.com/Baudeur/pizza-party-maker"
          className="text-gray-500 underline hover:text-gray-600"
        >
          Github
        </a>
      </span>
    </div>
  );
}
