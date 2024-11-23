import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-4xl font-serif mb-8">About Interior Haven</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-accent">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with a passion for exceptional interior design, Interior Haven has become a trusted destination for those seeking to transform their living spaces. We carefully curate our collection to bring you the finest in home furnishings and decor.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-accent">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We believe that every home tells a story, and our mission is to help you tell yours through carefully selected pieces that reflect your personal style. Our commitment to quality, design, and customer satisfaction drives everything we do.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-accent">Quality & Craftsmanship</h2>
            <p className="text-gray-600 leading-relaxed">
              Each piece in our collection is chosen for its exceptional quality and craftsmanship. We work with skilled artisans and renowned manufacturers who share our dedication to creating furniture and decor that stands the test of time.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl">Curated Selection</h3>
              <p className="text-gray-600">Carefully chosen pieces for every style and space</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl">Expert Support</h3>
              <p className="text-gray-600">Dedicated team to assist with your design needs</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium materials and expert craftsmanship</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;