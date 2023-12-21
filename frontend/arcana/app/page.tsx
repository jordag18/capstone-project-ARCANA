'use client';
import React from 'react';
import { useRouter } from 'next/navigation'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import NavBar from './components/navbar';
import { Footer } from './components/footer';




export default function Home() {
  const router = useRouter();
  return (
  <>
    <NavBar/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <Container className='d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle rounded' style={{ backgroundColor:'#dfe1e2', width: '800px', height: '500px'}}>
            <Stack gap={2} className=" p-4 mx-8 d-flex align-self-center justify-content-sm-center ">
              <Button className='p-3' variant="secondary" style={{ color: 'white' }}> Start New Project </Button>
              <Button className='p-3' variant="secondary" style={{ color: 'white' }}> Open Existing Project</Button>
            </Stack>
          </Container>
        </div>
    </main>
    <Footer/>
  </>
  )
}
