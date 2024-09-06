import Container from "../Components/ui/Container";
import pdfHeader from '../../src/assets/pdfHeader.png'

const Navbar = () => {

  return (
    <Container>
    <img className="h-auto w-full" src={pdfHeader} alt="serbia-evisa-portal" />
    </Container>
  );
};

export default Navbar;