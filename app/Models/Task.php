<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','assign_to','title', 'description', 'deadline', 'status_id', 'priority', 'created_at', 'updated_at'];

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assign_to');
    }
}
