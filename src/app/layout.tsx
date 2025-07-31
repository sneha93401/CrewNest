// import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
// import { Inter } from 'next/font/google';
// import { PropsWithChildren } from 'react';

// import { ConvexClientProvider } from '@/components/convex-client-provider';
// import { JotaiProvider } from '@/components/jotai-provider';
// import { ModalProvider } from '@/components/model-provider';
// import { Toaster } from '@/components/ui/sonner';
// import { NuqsAdapter } from 'nuqs/adapters/next/app'



// import './globals.css';

// const inter = Inter({
//   subsets: ['latin'],
// });


// const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         <ConvexAuthNextjsServerProvider>
//           <ConvexClientProvider>
//             <JotaiProvider>
//               <Toaster theme="light" richColors closeButton /> 
//               <ModalProvider />
//              <NuqsAdapter> {children}</NuqsAdapter>
//             </JotaiProvider>
//           </ConvexClientProvider>
//         </ConvexAuthNextjsServerProvider>
//       </body>
//     </html>
//   );
// };

// export default RootLayout;

import { ClerkProvider } from '@clerk/nextjs'; // ✅ Add this line
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { ConvexClientProvider } from '@/components/convex-client-provider';
import { JotaiProvider } from '@/components/jotai-provider';
import { ModalProvider } from '@/components/model-provider';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';
import AuthRedirect from '@/components/authRedirect';

const inter = Inter({
  subsets: ['latin'],
});

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ClerkProvider> 
          <ConvexAuthNextjsServerProvider>
            <ConvexClientProvider>
              <JotaiProvider>
                <AuthRedirect>
                <Toaster theme="light" richColors closeButton />
                <ModalProvider />
                <NuqsAdapter>{children}</NuqsAdapter>
                </AuthRedirect>
              </JotaiProvider>
            </ConvexClientProvider>
          </ConvexAuthNextjsServerProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
