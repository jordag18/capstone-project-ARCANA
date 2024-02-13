import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ARCANA-Projects-Menu',
    description: '',
}

export default function ManageProjectsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              {children}
          </main>
      </>
    );
  }