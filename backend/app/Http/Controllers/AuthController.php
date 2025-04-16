<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
            'email' => 'required|email',
        ], [
            'email.required' => 'El campo correo es obligatorio.',
            'email.email' => 'El correo no tiene el formato correcto.',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }

        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Datos de acceso incorrectos. Por favor, verifica tus credenciales.'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->respondWithToken($token);
    }

    public function unauthorized()
    {
        return redirect(route('login'));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'email' => 'required|string|email|max:255|unique:users,email',
        ], [
            'name.required' => 'El campo nombre es obligatorio.',
            'name.string' => 'El campo nombre debe ser una cadena de caracteres.',
            'password.required' => 'El campo contraseña es obligatorio.',
            'password.string' => 'El campo contraseña debe ser una cadena de caracteres.',
            'password.min' => 'El campo contraseña debe tener al menos 6 caracteres.',
            'email.required' => 'El campo correo es obligatorio.',
            'email.string' => 'El campo correo debe ser una cadena de caracteres.',
            'email.email' => 'El correo no tiene el formato correcto.',
            'email.max' => 'El campo correo no debe tener más de 255 caracteres.',
            'email.unique' => 'El correo ya está registrado.',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'rol_id' => 2,
            ]);
            if (!$user) {
                return response()->json(['error' => 'Ha ocurrido un error inesperado. Por favor, intente nuevamente.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            return response()->json(['user' => $user], Response::HTTP_CREATED);
        }
        return response()->json(['error' => 'El correo ya está en uso.'], Response::HTTP_CONFLICT);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }
    
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
    
        try {
            $token = JWTAuth::getToken(); // Obtiene el token actual
            if (!$token) {
                return response()->json(['error' => 'Token no encontrado'], Response::HTTP_BAD_REQUEST);
            }
    
            // Invalida el token actual
            JWTAuth::invalidate($token);
    
            return response()->json(['message' => 'Sesión cerrada correctamente'], Response::HTTP_OK);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo cerrar la sesión'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
    public function refresh()
    {
        try {
            $token = JWTAuth::getToken(); // Obtiene el token actual
            if (!$token) {
                return response()->json(['error' => 'Token no encontrado'], Response::HTTP_BAD_REQUEST);
            }
            $nuevo_token = auth()->refresh();
            // Invalida el token actual
            JWTAuth::invalidate($token);
            return $this->respondWithToken($nuevo_token);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo cerrar la sesión'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ], Response::HTTP_OK);
    }

}
