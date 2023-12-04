import {userData} from '@/data/index.js';
import validation from '@/data/validation';

export default async function UserById({params}) {
  try {
    const data = await getData(params.id);

    return (
      <div>
        <h1>
          {data.firstName} {data.lastName}
        </h1>
        <div>User ID: {data._id.toString()}</div>
      </div>
    );
  } catch (e) {
    console.log(e);
    return <div>{e}</div>;
  }

  async function getData(id) {
    id = await validation.checkId(id, 'ID URL Param');
    const user = await userData.getUserById(id);
    return user;
  }
}
