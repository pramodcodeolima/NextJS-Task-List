import connectMongoDB from '@/libs/mongodb';
import Task from '@/models/task';
import { NextResponse } from 'next/server';


//Create Task
export async function POST(request) {
    try {
        const { task, description } = await request.json()
        await connectMongoDB();
        await Task.create({ task, description });
        return NextResponse.json({ message: 'Task Created'}, { status: 201 })
    } catch (error) {
        return NextResponse.json(error)
    }
}


//Show Tasks
export async function GET() {
    try {
        await connectMongoDB();
        const tasks = await Task.find();
        return NextResponse.json({tasks})
    } catch (error) {
        return NextResponse.json(error)
    }
}


//Delete Task
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id')
        await connectMongoDB();
        await Task.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Task Deleted'}, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}
