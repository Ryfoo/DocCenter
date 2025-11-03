import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import MyImage from "../../assets/Me.jpg"
function AboutCard() {
    return (
        <div className="flex justify-center mt-16">
            <div className="card w-96 bg-white dark:bg-gray-800 shadow-xl transition-colors duration-300">
                <figure className="-mt-16">
                    <img
                        src={MyImage}
                        alt="Profile"
                        className="rounded-full w-40 h-40 object-cover border-4 border-white dark:border-gray-700 mx-auto"
                    />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl text-gray-800 dark:text-gray-100">
                        Alaeddine Gadi
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        I am a passionate developer with a deep interest in **mathematics**, particularly in
                        analysis, topology, number theory and graph theory, which fuel my love for problem-solving and logical thinking.
                        Alongside, I enjoy exploring **low-level programming**, understanding how computers work at
                        the hardware level, and building efficient solutions from the ground up.
                    </p>
                    <div className="card-actions mt-4 space-x-4">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-circle hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://linkedin.com/in/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-circle hover:bg-blue-500 hover:text-white"
                        >
                            <FaLinkedin size={24} />
                        </a>
                        <a
                            href="https://facebook.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-circle hover:bg-blue-700 hover:text-white"
                        >
                            <FaFacebook size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutCard;
