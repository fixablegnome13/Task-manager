<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'status_id' => $this->status_id,
            'assign_to' => $this->assign_to,
            'description' => $this->description,
            'deadline' => (new \DateTime($this->deadline))->format('Y-m-d'),
            'priority' => $this->priority,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'assigned_user_name' => $this->assignedUser ? $this->assignedUser->name : 'Unassigned',
        ];
    }
}
