import Navbar from "@/components/Navbar";

export default function Portfolio() {
  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-japan text-primary text-center">
          My Projects
        </h1>
        {/* Buraya proje kartları gelecek */}
      </div>
    </div>
  );
}
