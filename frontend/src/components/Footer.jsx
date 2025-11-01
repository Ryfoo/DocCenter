import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <nav>
                <h6 className="footer-title">Company</h6>
                <Link to="/about" className="link link-hover">About us</Link>
                <Link to="/contact" className="link link-hover">Contact</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <Link to="/terms" className="link link-hover">Terms of use</Link>
                <Link to="/privacy" className="link link-hover">Privacy policy</Link>
                <Link to="/cookies" className="link link-hover">Cookie policy</Link>
            </nav>
        </footer>
    );
}

export default Footer;
