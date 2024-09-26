import footerBg from "../assets/footerbg.jpg";
import Container from "../Components/ui/Container";
const Footer = () => {
  return (
    <Container>
      <footer
        className="text-white p-2 mb-[100px]"
        style={{ background: `url(${footerBg})` }}
      >
        <h2>© {new Date().getFullYear()} All rights reserved Qualitex.</h2>
      </footer>
    </Container>
  );
};

export default Footer;
