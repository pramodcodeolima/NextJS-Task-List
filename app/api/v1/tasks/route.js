import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { task, description } = await request.json()
    await connectMongoDB();
    await Task.create({ task, description });
    return NextResponse.json({ message: 'Task Created'}, { status: 201 })
}
