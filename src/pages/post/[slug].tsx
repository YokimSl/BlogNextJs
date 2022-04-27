import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return(
    <>
    <Header />
    <img src="/Banner.png" alt="imagem" className={styles.banner}/>
    <main className={commonStyles.container}>
      <div className={styles.post}>
        <div className={styles.postTop}>
          <h1>Algum tipo de exemplo</h1>
          <ul>
            <li>
              <FiCalendar />
              12 mar 2022
            </li>
            <li>
              <FiUser />
             Jhonnata
            </li>
            <li>
              <FiClock />
              5 minutos
            </li>
          </ul>
        </div>

        <article>
          <h2>Titulo seçao</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Libero eaque <strong>necessitatibus accusantium autem repudiandae</strong> sit, 
            dicta, <a href="#"> cupiditate sint id aliquam </a> in a voluptates fugiat ut 
            dolor beatae itaque eveniet at?

          </p>
        </article>

      </div>
    </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
