import React from "react";

const Header = () => {
  return (
    <>
      <header className="py-10 px-5">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-semibold pb-6">TO-DO List</h1>
              <p className="text-xl">
                Plan better. Do more. Stay organized. <br />
                Track your tasks with ease and focus on what matters.{" "}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
