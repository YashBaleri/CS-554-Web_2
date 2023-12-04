import {userData} from '@/data/index.js';
import {NextResponse} from 'next/server';
import validation from '@/data/validation';
export async function GET(req) {
  try {
    const userList = await userData.getAllUsers();
    return NextResponse.json({userList}, {status: 200});
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
      reqBody.firstName = validation.checkString(
        reqBody.firstName,
        'First Name'
      );
      reqBody.lastName = validation.checkString(reqBody.lastName, 'Last Name');
    } catch (e) {
      return NextResponse.json({error: e}, {status: 400});
    }

    try {
      const newUser = await userData.addUser(
        reqBody.firstName,
        reqBody.lastName
      );
      return NextResponse.json(newUser, {status: 200});
    } catch (e) {
      return NextResponse.json({error: e}, {status: 500});
    }
  }
}
