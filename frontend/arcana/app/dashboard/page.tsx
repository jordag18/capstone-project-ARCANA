'use client';
import React from "react";
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import Container from 'react-bootstrap/Container';


export function DashBoardPage() {
    return (
        <div>
          <NavBar />
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
              <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <Container className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded bg-light" style={{ width: '800px', height: '500px' }}>

                </Container>
              </div>
            </div>
          <Footer />
        </div>
    );
}
export default DashBoardPage;

