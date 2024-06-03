// app/restaurant/[name]/page.js
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

export default async function Restaurant({ params }) {
  const { name } = params;
  const filePath = path.join(process.cwd(), 'public', 'data', 'restaurants.json');
  const jsonData = await fs.readFile(filePath);
  const restaurants = JSON.parse(jsonData);

  const restaurant = restaurants.find(
    r => r.name.toLowerCase().replace(/\s+/g, '-') === name
  );

  if (!restaurant) {
    notFound();
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>Address: {restaurant.address}</p>
      <p>Cuisine: {restaurant.cuisine}</p>
      <p>Price: {restaurant.price}</p>
    </div>
  );
}
