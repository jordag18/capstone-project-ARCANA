import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export function SyncRequestTable() {
  return (
    <>
      <div>
        <p>
          For a given sync request, accept the projects that you want to sync.{" "}
          <br />
          Projects that already exist on your computer will be greyed out and
          cannot be synced.
        </p>
      </div>

      <Container>
        <Table responsive hover bordered>
          <thead>
            <tr>
              <th className="text-center"> IP Address </th>
              <th className="text-center"> Projects </th>
              <th className="text-center"> Actions </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-center align-middle"> 10.0.1.1 </td>
              <td>
                <Form>
                  <Form></Form>
                  <Form.Check
                    type="checkbox"
                    label="MyProject 1"
                    id="myProject1"
                  />
                  <Form.Check
                    type="checkbox"
                    label="MyProject 2"
                    id="myProject2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="OtherProject"
                    id="OtherProject"
                  />

                  <Form.Check
                    type="checkbox"
                    label="ProjectA"
                    id="ProjectA"
                    disabled // Add disabled attribute here
                  />
                </Form>
              </td>
              <td
                className="mx-auto p-2 align-middle"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <button
                  className="btn btn-outline-primary align-middle"
                  style={{ marginBottom: "3px", width: "100%" }}>
                  Accept
                </button>
                <button
                  className="btn btn-outline-danger align-middle"
                  style={{ marginTop: "3px", width: "100%" }}>
                  Reject
                </button>
              </td>
            </tr>

            <tr>
              <td className="text-center align-middle"> 10.0.1.1 </td>
              <td>
                <Form>
                  <Form.Check
                    type="checkbox"
                    label="ProjectA"
                    id="myProjectA"
                  />
                  <Form.Check type="checkbox" label="ProjectB" id="ProjectB" />
                  <Form.Check type="checkbox" label="ProjectC" id="ProjectC" />

                  <Form.Check
                    type="checkbox"
                    label="ProjectA"
                    id="ProjectA"
                    disabled // Add disabled attribute here
                  />
                </Form>
              </td>
              <td
                className="mx-auto p-2 align-middle"
                style={{
                  display: "d-flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <button
                  className="btn btn-outline-secondary"
                  style={{ marginBottom: "3px", width: "100%" }}>
                  Acknowledge
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
