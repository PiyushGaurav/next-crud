import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

let todos = [
	{
		id: '1',
		name: 'Work on UI',
		isCompleted: true
	},
	{
		id: '2',
		name: 'Api Integration',
		isCompleted: false
	}
];

export async function GET(req, res) {
	try {
		return NextResponse.json(todos, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
	}
}

export async function POST(req, res) {
	try {
		const { name } = await req.json();
		let newtodo = { id: uuid(), isCompleted: false, name };
		todos.push(newtodo);
		return NextResponse.json(newtodo, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
	}
}

export async function PUT(req, res) {
	try {
		const { id } = await req.json();
		const index = todos.findIndex(todo => todo.id === id);
		if (index > -1) {
			todos[index] = {
				...todos[index],
				isCompleted: !todos[index].isCompleted
			};
			return NextResponse.json(todos[index], { status: 200 });
		} else {
			return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
	}
}

export async function DELETE(req, res) {
	try {
		const { id } = await req.json();
		todos = todos.filter(todo => todo.id !== id);
		return NextResponse.json({ message: `Todo ${id} deleted` }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
	}
}
