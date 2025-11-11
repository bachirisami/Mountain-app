<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMountainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'height' => ['sometimes', 'integer', 'min:1'],
            'location' => ['sometimes', 'string', 'max:255'],
            'latitude' => ['sometimes', 'numeric'],
            'longitude' => ['sometimes', 'numeric'],
            'image_url' => ['sometimes', 'string', 'max:255'],
        ];
    }
}
