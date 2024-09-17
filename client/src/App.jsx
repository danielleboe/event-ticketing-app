// import './App.css';
// import { Outlet } from 'react-router-dom';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <div className="flex-column justify-center align-center min-100-vh bg-primary">
//         <Outlet />
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      {/* <Route path="/event" element={<Event />} />
      <Route path="/cart" element={<Event />} />
      <Route path="/checkout" element={<Event />} />
      <Route path="/confirmation" element={<Event />} /> */}

    </Routes>
  );
}

export default App;
