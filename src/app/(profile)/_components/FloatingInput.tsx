'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  text?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  name,
  type = 'text',
  required = false,
  value = '',
  onChange,
  error,
  text,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

/**
 * useCallback est un hook de React qui permet de mémoriser une fonction afin d'éviter de la recréer à chaque fois que le composant est ré-render. Cela peut améliorer les performances en réduisant le nombre de fois où une fonction est créée.

Dans le code donné, useCallback est utilisé pour mémoriser les fonctions handleFocus, handleBlur et togglePasswordVisibility. Cela signifie que ces fonctions ne seront créées qu'une seule fois, lors du premier rendu du composant, et seront réutilisées à chaque fois que le composant est ré-render.

Voici un exemple de code qui illustre l'utilité de useCallback :

```javascript
import { useState, useCallback } from 'react';

function Compteur() {
  const [compteur, setCompteur] = useState(0);

  // Sans useCallback, cette fonction serait recréée à chaque fois que le composant est ré-render
  const handleIncrement = useCallback(() => {
    setCompteur(compteur + 1);
  }, [compteur]); // La fonction dépend de la valeur de compteur

  return (
    <div>
      <p>Compteur : {compteur}</p>
      <button onClick={handleIncrement}>Incrémenter</button>
    </div>
  );
}
```

Dans cet exemple, la fonction handleIncrement est mémorisée avec useCallback. Cela signifie que la fonction ne sera recréée que lorsque la valeur de compteur change. Si nous n'utilisions pas useCallback, la fonction serait recréée à chaque fois que le composant est ré-render, ce qui pourrait entraîner des problèmes de performances.
 */
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <>
      <div className="relative mb-4">
        <input
          ref={inputRef}
          type={inputType}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=" "
          className={`block w-full px-4 py-3 text-sm text-black bg-transparent border rounded-lg focus:outline-none focus:ring-2 peer transition-all duration-300 ease-in-out
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-[#D9D9D9] focus:ring-first_violet focus:border-first_violet'}
            ${isFocused ? 'border-first_violet' : ''}
          `}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        <label
          htmlFor={name}
          className={`absolute text-base duration-300 transform -translate-y-4 scale-75 top-0 left-4 origin-[0] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4 transition-all cursor-text
            ${value || isFocused ? 'scale-75 -translate-y-4 text-first_violet bg-white' : 'text-gray-500'}
          `}
        >
          {label}
          {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
        </label>
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-500" id={`${name}-error`}>{error}</p>
        )}
      </div>
      {text && (
        <p className='text-sm text-balance md:text-nowrap'>{text}</p>
      )}
    </>
  );
};

export default FloatingInput;