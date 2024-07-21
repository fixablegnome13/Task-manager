<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TaskStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            $this->merge([
                'user_id' => $user->id
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:1000',
            'user_id' => 'exists:users,id',
            'assign_to' => 'exists:users,id',
            'status_id' => 'required',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date|after:today',
            'priority' => 'nullable|string|max:255',
        ];
    }
}
