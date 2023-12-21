import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'ARCANA-Manage-Events',
    description: '',
}

export default function ManageEventsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <body>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
            </main>
        </body>
    );
  }
