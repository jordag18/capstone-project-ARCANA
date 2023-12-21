import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Link from "next/link";

export function StartUpPrompt() {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <Container className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded bg-light" style={{ width: '800px', height: '500px' }}>
        <Stack gap={2} className="p-4 mx-8 d-flex align-self-center justify-content-sm-center">

            <Button className="p-3" variant="secondary">
              <Link href="/dashboard" className="text-decoration-none text-reset">
                Open Existing Project
              </Link>
            </Button>


            <Button className="p-3" variant="secondary">
              <Link href="/dashboard" className="text-decoration-none text-reset">
                Start New Project
              </Link>
            </Button>

        </Stack>
      </Container>
    </div>
  );
}
export default StartUpPrompt;
