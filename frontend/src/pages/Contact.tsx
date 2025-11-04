import ContactForm from "../components/ui/ContactCard";

function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
                Get in Touch
            </h1>
            <ContactForm />
        </div>
    );
}

export default ContactPage;
