import React from "react";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section
        className="w-full h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/src/assets/slide2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="bg-transparant bg-opacity-10 p-8 rounded-xl shadow-lg max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold mb-8">About Wedding Floor</h1> {/* Increased font size and made bolder */}
          <p className="text-xl leading-relaxed"> {/* Increased font size */}
            Welcome to <span className="font-semibold">Wedding Floor</span> – your one-stop solution for creating
            unforgettable wedding invitations. We specialize in crafting beautiful and customizable wedding cards to make your
            special day even more memorable. Whether you’re looking for traditional elegance or modern charm, we have something
            unique just for you.
          </p>
          <p className="text-xl leading-relaxed mt-6"> {/* Increased font size and margin */}
            At Wedding Floor, we believe that every love story is unique, and so should be your wedding invitation. With our
            easy-to-use card generator, you can customize designs to match your theme and preferences. Celebrate love with
            creativity, and let your invitation set the tone for your dream wedding.
          </p>
          <p className="text-xl leading-relaxed mt-6"> {/* Increased font size and margin */}
            Our dedicated team works tirelessly to ensure that your experience with us is nothing short of exceptional. Thank you
            for choosing Wedding Floor to be a part of your beautiful journey.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;