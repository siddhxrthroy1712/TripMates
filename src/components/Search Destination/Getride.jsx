import React from "react";
import Navigation from "./Navigation";
import SearchForm from "./Form";
import Footer from "./Footer";

const Getride = () => {
  return (
    <div className="flex flex-col min-h-screen bg-purple-900">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <SearchForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Getride;
