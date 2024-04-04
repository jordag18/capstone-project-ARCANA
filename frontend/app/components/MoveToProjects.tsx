'use client'
import React from 'react'
import Link from 'next/link'

interface MoveToProjectsProps {
    linkTo: string;
    buttonText: string;
  }

const MoveToNav: React.FC<MoveToProjectsProps> = ({ linkTo, buttonText }) => {
  return (
    <Link href={linkTo} >
        <button type='button' className='text-lg font-bold'>{buttonText}</button>
    </Link>
  )
}

export default MoveToNav