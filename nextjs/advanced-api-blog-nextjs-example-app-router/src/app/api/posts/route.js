import {postData} from '@/data/index.js';
import {NextResponse} from 'next/server';
import validation from '@/data/validation';

export async function GET(req) {
  try {
    const postList = await postData.getAllPosts();
    return NextResponse.json({postList}, {status: 200});
  } catch (e) {
    return NextResponse.json({error: e}, {status: 500});
  }
}

export async function POST(req) {
  if (!req.body.stream) {
    return NextResponse.json(
      {error: 'There are no fields in the request body'},
      {status: 400}
    );
  } else {
    let reqBody = await req.json();
    if (!reqBody || Object.keys(reqBody).length === 0) {
      return NextResponse.json(
        {error: 'There are no fields in the request body'},
        {status: 400}
      );
    }
    try {
      reqBody.title = validation.checkString(reqBody.title, 'Title');
      reqBody.body = validation.checkString(reqBody.body, 'Body');
      reqBody.posterId = validation.checkId(reqBody.posterId, 'Poster ID');
      if (reqBody.tags) {
        reqBody.tags = validation.checkStringArray(reqBody.tags, 'Tags');
      }
    } catch (e) {
      return NextResponse.json({error: e}, {status: 400});
    }

    try {
      const {title, body, tags, posterId} = reqBody;
      const newPost = await postData.addPost(title, body, posterId, tags);
      return NextResponse.json(newPost, {status: 200});
    } catch (e) {
      return NextResponse.json({error: e}, {status: 500});
    }
  }
}
