// import '@/styles/globals.css'
// import { ConvexProvider, ConvexReactClient } from 'convex/react'

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

// export default function App({ Component, pageProps }) {
//   return (
//     <ConvexProvider client={convex}>
//       <Component {...pageProps} />
//     </ConvexProvider>
//   )
// } 

import '@/styles/globals.css'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function App({ Component, pageProps }) {
  return (
    <ConvexProvider client={convex}>
      <Component {...pageProps} />
    </ConvexProvider>
  )
}

// pages/_app.tsx
// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
// import { ConvexProvider, ConvexReactClient } from 'convex/react';
// // import { api } from '../convex/_generated/api';
// import AuthRedirect from '@/components/authRedirect';

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <ConvexProvider client={convex}>
//       <AuthRedirect>
//         <Component {...pageProps} />
//       </AuthRedirect>
//     </ConvexProvider>
//   );
// }
