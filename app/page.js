'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

export default function Home() {
	const [todos, settodos] = useState([]);
	const [name, setName] = useState('');

	// Fetch all todos
	useEffect(() => {
		fetch('/api/todos')
			.then(res => res.json())
			.then(data => {
				settodos(data);
			});
	}, []);

	useEffect(() => {
		console.log(todos);
	}, [todos]);

	const fetchTodo = () => {
		fetch('/api/todos')
			.then(res => res.json())
			.then(data => {
				settodos(data);
			});
	};

	// Create a new todo
	const createtodo = async () => {
		const res = await fetch('/api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name
			})
		});
		const newtodo = await res.json();
		fetchTodo();
	};

	// Update a todo
	const updatetodo = async id => {
		const res = await fetch('/api/todos', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});
		const updatedtodo = await res.json();
		fetchTodo();
	};

	// Delete a todo
	const deletetodo = async id => {
		await fetch(`/api/todos`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id
			})
		});
		fetchTodo();
	};

	return (
		<div className="flex flex-col gap-10 max-w-[500px]">
			<h1 className="text-center mt-6">CRUD Todo in Next.js</h1>
			<form onSubmit={e => e.preventDefault()} className="flex gap-3">
				<Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
				<Button variant="outline" onClick={createtodo}>
					Create Todo
				</Button>
			</form>

			<ul className="flex flex-col gap-2">
				{todos.map(todo => (
					<li key={todo.id} className="flex justify-between items-center gap-10">
						{todo.name}
						<div className="flex gap-3">
							<Button variant="outline" onClick={() => updatetodo(todo.id)}>
								{todo.isCompleted ? 'Completed' : 'Mark as complete'}
							</Button>
							<Button variant="destructive" onClick={() => deletetodo(todo.id)}>
								Delete
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
