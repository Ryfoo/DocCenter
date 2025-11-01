function ContactForm() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
                    Contact Us
                </h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Subject"
                            className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            placeholder="Your Message"
                            rows="5"
                            className="textarea textarea-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-[#2f43c8]"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;
