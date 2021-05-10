import React from 'react';
import { fold, initial, pending, RemoteData } from '@devexperts/remote-data-ts';


import { Cat, getCats } from '../services/catsService';
import { categories, catImage, catItemContainer, catList, catArticle, h2Titles } from './catsStyles.css'


interface CatsListProps {
  cats: Cat[];
}

const Loading = () => <h2 className={h2Titles}>Loading ...</h2>;

const Initial = () => <h2 className={h2Titles}>Welcome ...</h2>;

const Error = ({ msg }: { msg: string }) => <h2 className={h2Titles}>{msg}</h2>

function CatsList({ cats }: CatsListProps) {
  return (
    <ul className={catList}>
      {cats.map(cat => (
        <li key={cat.id} className={catItemContainer}>
          <article className={catArticle}>
            <img
              className={catImage}
              src={cat.url}
              alt="Awesome cat"
              loading="lazy"
            />
            <p className={categories}>Category: {cat.categories[0].name} 😸</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

const CatsList3 = fold<Error, Cat[], JSX.Element>(
  () => <Initial />,
  () => <Loading/>,
  err => <Error msg={err.message} />,
  cats => <CatsList cats={cats} />
);

function Cats() {
  const [cats, setCats] = React.useState<RemoteData<Error, Cat[]>>(initial);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCats(pending);
      getCats().then(setCats).catch(setCats);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return CatsList3(cats);
}

export default Cats;
