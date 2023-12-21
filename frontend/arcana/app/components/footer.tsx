
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Footer = () => {
    return (
      <footer
        className="p-2 mx-auto fixed-bottom"
        style={{ backgroundColor: "#71767a" }}>
        <div className="container-fluid mx-auto">
          <Row className="h-full align-items-center">
            {/* Left Column: Align content to the start and bottom */}
            <Col className="flex flex-col justify-end">
              <p className="text-start text-white fw-light m-0 fs-6">
                Advanced Resiliency Chronicling for Analysis in Network Assessments [ARCANA]
              </p>
            </Col>

            {/* Center Column: Align content to the center and bottom */}
            <Col className="flex flex-col justify-end items-center">
              <p className="text-center text-white fw-light m-0 fs-6">
                Team 1: Cui-Bono
              </p>
            </Col>

            {/* Right Column: Align content to the end and bottom, prevent wrapping */}
            <Col className="flex flex-col justify-end items-end">
              <p className="text-end text-white fw-light m-0 whitespace-nowrap lh-sm fs-6">
                Data Analysis Center&apos;s Cyber Experimentation & Analysis Divison [DAC-CEAD]
              </p>
            </Col>
          </Row>
        </div>
      </footer>
    );
  };

  export default Footer;




