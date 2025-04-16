<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Crear roles primero
        $adminRole = Role::create(['name' => 'Admin']);
        $userRole = Role::create(['name' => 'Carrier']);

        // Crear usuario con rol
        User::create([
            'name' => 'Mantainer',
            'email' => 'mantainer@example.com',
            'password' => bcrypt('password'),
            'rol_id' => $adminRole->id,
        ]);
    }
}
