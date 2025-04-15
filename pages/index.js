
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, ShoppingCart, MessageSquare } from 'lucide-react';
import Papa from 'papaparse';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => setProducts(results.data),
      });
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = () => {
    window.open('https://www.mercadopago.com.ar/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Ameri Store</h1>

      <div className="max-w-xl mx-auto mb-8">
        <label className="block mb-2 font-medium">Cargar productos desde Excel (CSV)</label>
        <Input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
      </div>

      <div className="text-center mb-8">
        <Button onClick={handleCheckout} className="flex gap-2 items-center bg-green-600 hover:bg-green-700">
          <ShoppingCart size={20} /> Comprar ({cart.length})
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <Card key={index} className="shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.Nombre}</h2>
              <p className="text-gray-700 mb-2">{product.Descripcion}</p>
              <p className="font-bold text-green-600 mb-2">${product.Precio}</p>
              <Button onClick={() => addToCart(product)} className="w-full bg-blue-600 hover:bg-blue-700">
                Agregar al carrito
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <a
          href="https://wa.me/5493816783419"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          <MessageSquare size={18} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
