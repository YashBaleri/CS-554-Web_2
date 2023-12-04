import {postData} from '@/data/index.js';
import validation from '@/data/validation';
import Link from 'next/link';
export default async function PostById({params}) {
  try {
    const data = await getData(params.id);
    return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.body}</p>
        {data.tags.length > 0 ? (
          <div>
            <h2>Tags:</h2>
            <ul>
              {data.tags &&
                data.tags.map((tag) => {
                  return (
                    <li key={tag}>
                      <Link href={`/posts/tag/${tag}`}>{tag}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          <div></div>
        )}
        <br />
        <br />
        <cite>
          By: {data.poster.firstName} {data.poster.lastName}
          <br />
          Post ID: {data._id.toString()}
        </cite>
      </div>
    );
  } catch (e) {
    console.log(e);
    return <div>{e}</div>;
  }

  async function getData(id) {
    id = await validation.checkId(id, 'ID URL Param');
    const post = await postData.getPostById(id);
    return post;
  }
}
