import { server } from '../config/index';
import nearByCities from 'nearby-cities';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({ exploreData, cardsData, citiesArr }) {
  console.log(citiesArr);
  return (
    <div className=''>
      <Head>
        <title>Airbnb</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div
            className='grid grid-cols-1 sm:grid-cols-2 
          lg:grid-cols-3 xl:grid-cols-4'
          >
            {citiesArr?.map((item, i) => (
              <SmallCard key={i} {...item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3'>
            {cardsData?.map((item, i) => (
              <MediumCard key={i} {...item} />
            ))}
          </div>
        </section>

        <LargeCard
          img='https://links.papareact.com/4cj'
          title='The Great Outdoors'
          description='Wishlists curated by Airbnb.'
          buttonText='Get Inspired'
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const exploreData = await fetch('https://jsonkeeper.com/b/4G1G').then(res =>
    res.json()
  );

  const cardsData = await fetch('https://jsonkeeper.com/b/VHHT').then(res =>
    res.json()
  );

  const { countryCode, lat, lon, city } = await fetch(
    'http://ip-api.com/json',
    {
      method: 'GET'
    }
  ).then(res => res.json());

  let cities = nearByCities({ latitude: lat, longitude: lon })
    .filter(
      ({ population, country, name }) =>
        population > 80000 && country === countryCode && name !== city
    )
    .slice(0, 8);

  const citiesArr = await Promise.all(
    cities.map(async city => {
      const img = await fetch(
        `https://serpapi.com/search.json?q=${encodeURI(
          city.name
        )}&tbm=isch&ijn=0&api_key=${process.env.serp_api_key}`
      )
        .then(res => res.json())
        .then(img => img?.images_results[0]?.thumbnail);

      return { img, ...city };
    })
  );

  return {
    props: {
      exploreData,
      cardsData,
      citiesArr
    }
  };
}
