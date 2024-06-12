import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";


// Update Task
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { task, description } = await request.json();
        await connectMongoDB();
        await Task.findByIdAndUpdate(id, { task, description });
        return NextResponse.json({ message: 'Task Updated'}, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
    
}


//Get Task on ID
export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const task = await Task.findOne({ _id: id });
    return NextResponse.json({ task }, { status: 200 })
}