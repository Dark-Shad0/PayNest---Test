import { useRouter } from '@/hooks/useRouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { Help } from '@/pages/Help';

function App() {
  const { route, navigate } = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navbar route={route} navigate={navigate} />
      <main>
        {route === 'products' ? (
          <Products navigate={navigate} />
        ) : route === 'help' ? (
          <Help navigate={navigate} />
        ) : (
          <Home navigate={navigate} />
        )}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
