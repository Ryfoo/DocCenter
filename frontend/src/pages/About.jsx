import AboutCard from "../components/ui/AboutCard";

function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
                About Me
            </h1>
            <AboutCard />
        </div>
    );
}

export default AboutPage;
