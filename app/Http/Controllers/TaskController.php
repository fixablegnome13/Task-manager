<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return TaskResource::collection(Task::where('user_id', $user->id)
            ->orWhere('assign_to', $user->id)
            ->with('assignedUser')  // Load the assigned user relationship
            ->orderBy('created_at', 'desc')
            ->paginate(3));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskStoreRequest $request)
    {

        $data = $request->validated();

        $task = Task::create($data);

        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $task->user_id) {
            return abort(403, 'Unauthorized action');
        }
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskUpdateRequest $request, Task $task)
    {
        $data = $request->validated();

        $task->update($data);

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $task->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        $task->delete();

        return response('', 204);
    }
}
