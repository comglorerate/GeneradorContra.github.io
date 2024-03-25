document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resetBtn = document.getElementById('reset-btn'); // Nuevo botón de reset
    const lengthInput = document.getElementById('password-length');
    const lengthRange = document.getElementById('password-length-range');
    const includeLetterCheckbox = document.getElementById('include-letter');
    const includeUppercaseCheckbox = document.getElementById('include-uppercase');
    const includeLowercaseCheckbox = document.getElementById('include-lowercase');
    const includeNumberCheckbox = document.getElementById('include-number');
    const includeSymbolCheckbox = document.getElementById('include-symbol');
    const passwordStrengthText = document.getElementById('password-strength');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    let isDarkMode = false;

    darkModeBtn.addEventListener('click', function() {
        // Cambiar el modo y aplicar los estilos correspondientes
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
    // Manejar el cambio en las opciones de contraseña
    function handlePasswordOptionsChange() {
        const letterChecked = includeLetterCheckbox.checked;
        const uppercaseChecked = includeUppercaseCheckbox.checked;
        const lowercaseChecked = includeLowercaseCheckbox.checked;

        if (letterChecked && !uppercaseChecked && !lowercaseChecked) {
            alert("Debe seleccionar al menos una opción entre mayúsculas y minúsculas.");
        }
    }

    // Manejar el cambio en la opción "letra"
    includeLetterCheckbox.addEventListener('change', function() {
        if (!includeLetterCheckbox.checked) {
            // Si se desmarca la opción "letra", deshabilitar las opciones "mayúscula" y "minúscula"
            includeUppercaseCheckbox.checked = false;
            includeLowercaseCheckbox.checked = false;
            includeUppercaseCheckbox.disabled = true;
            includeLowercaseCheckbox.disabled = true;
        } else {
            // Si se marca la opción "letra", habilitar las opciones "mayúscula" y "minúscula"
            includeUppercaseCheckbox.disabled = false;
            includeLowercaseCheckbox.disabled = false;
        }

        // Verificar las opciones de contraseña al cambiar
        handlePasswordOptionsChange();
    });

    // Manejar el cambio en las opciones de mayúsculas y minúsculas
    includeUppercaseCheckbox.addEventListener('change', handlePasswordOptionsChange);
    includeLowercaseCheckbox.addEventListener('change', handlePasswordOptionsChange);

    // Manejar la generación de contraseña
    generateBtn.addEventListener('click', function() {
        const passwordLength = parseInt(lengthInput.value);
        const includeLetter = includeLetterCheckbox.checked;
        const includeUppercase = includeUppercaseCheckbox.checked && includeLetter;
        const includeLowercase = includeLowercaseCheckbox.checked && includeLetter;
        const includeNumber = includeNumberCheckbox.checked;
        const includeSymbol = includeSymbolCheckbox.checked;

        // Verificar las condiciones antes de generar la contraseña
        if (includeLetter && !includeUppercase && !includeLowercase) {
            alert("Debe seleccionar al menos una opción entre mayúsculas y minúsculas.");
            // Limpiar el input de contraseña
            passwordInput.value = "";
            return; // Detener la generación de contraseña si no se cumplen las condiciones
        }

        // Verificar si al menos una opción está seleccionada
        if (!(includeLetter || includeNumber || includeSymbol)) {
            alert("Por favor, seleccione al menos una opción para generar la contraseña.");
            return;
        }

        // Generar la contraseña si se cumplen todas las condiciones
        const password = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumber, includeSymbol);
        passwordInput.value = password;

        // Actualizar la solidez de la contraseña
        updatePasswordStrength(passwordLength);
    });

 // Función para actualizar la solidez de la contraseña
function updatePasswordStrength(length) {
    if (length >= 1 && length <= 6) {
        passwordStrengthText.textContent = "Poco segura";
        passwordStrengthText.className = "password-strength poco-segura";
    } else if (length >= 7 && length <= 10) {
        passwordStrengthText.textContent = "Adecuada";
        passwordStrengthText.className = "password-strength adecuada";
    } else if (length >= 11 && length <= 15) {
        passwordStrengthText.textContent = "Segura";
        passwordStrengthText.className = "password-strength segura";
    } else if (length >= 16 && length <= 50) {
        passwordStrengthText.textContent = "Muy segura";
        passwordStrengthText.className = "password-strength muy-segura";
    }
}

    // Definir la longitud predeterminada de la contraseña
    const defaultPasswordLength = 12;
    // Actualizar la solidez de la contraseña predeterminada
    updatePasswordStrength(defaultPasswordLength);
    // Copiar la contraseña al hacer clic en el botón
    copyBtn.addEventListener('click', function() {
        passwordInput.select();
        document.execCommand('copy');
        // Deseleccionar el input después de copiar
        window.getSelection().removeAllRanges();
    });
     // Borrar la contraseña al hacer clic en el botón de reset
     resetBtn.addEventListener('click', function() {
        passwordInput.value = '';
    });

    // Actualizar la solidez de la contraseña cuando se cambia la longitud mediante la barra deslizante
    lengthRange.addEventListener('input', function() {
        const value = parseInt(lengthRange.value);
        lengthInput.value = value;
        updatePasswordStrength(value);
    });

    // Actualizar la solidez de la contraseña cuando se cambia la longitud mediante el input numérico
    lengthInput.addEventListener('input', function() {
        const value = parseInt(lengthInput.value);
        if (value >= parseInt(lengthRange.min) && value <= parseInt(lengthRange.max)) {
            lengthRange.value = value;
            updatePasswordStrength(value);
        }
    });

    // Actualizar el valor del input numérico cuando se desliza la barra
    lengthRange.addEventListener('input', function() {
        lengthInput.value = lengthRange.value;
    });

    // Generar la contraseña cuando se cambia el valor del input numérico
    lengthInput.addEventListener('input', function() {
        const value = parseInt(lengthInput.value);
        if (value >= parseInt(lengthRange.min) && value <= parseInt(lengthRange.max)) {
            lengthRange.value = value;
        }
    });

    includeLetterCheckbox.addEventListener('change', function() {
        if (!includeLetterCheckbox.checked) {
            // Si se desmarca la opción "letra", deshabilitar las opciones "mayúscula" y "minúscula"
            includeUppercaseCheckbox.checked = false;
            includeLowercaseCheckbox.checked = false;
            includeUppercaseCheckbox.disabled = true;
            includeLowercaseCheckbox.disabled = true;
        } else {
            // Si se marca la opción "letra", habilitar las opciones "mayúscula" y "minúscula"
            includeUppercaseCheckbox.disabled = false;
            includeLowercaseCheckbox.disabled = false;
        }
    });

    function generatePassword(length, includeUppercase, includeLowercase, includeNumber, includeSymbol) {
        let charset = "";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeNumber) charset += "0123456789";
        if (includeSymbol) charset += "!@#$%^&*()_-+=";

        let password = "";
        for (let i = 0; i < length; ++i) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
});

// En tu archivo JavaScript principal (main.js)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        // Registro exitoso
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // Error en el registro
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  