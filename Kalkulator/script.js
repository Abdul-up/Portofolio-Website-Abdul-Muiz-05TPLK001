const result = document.querySelector('#result');
const calc = document.querySelector('#calculator');
const buttons = calc.querySelectorAll('button');

let currentInput = ''; // Angka atau simbol yang sedang dimasukkan
let calculation = ''; // Menyimpan seluruh ekspresi matematika

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('id');
        const value = btn.getAttribute('value');

        if (id === 'number') {
            // Tambahkan angka ke input saat ini
            currentInput += value;
            result.textContent = currentInput;
        } else if (id === 'symbol') {
            // Simbol operasi matematika
            if (value === '=') {
                try {
                    // Eksekusi perhitungan dengan eval (hati-hati)
                    calculation += currentInput;
                    const output = eval(
                        calculation
                            .replace(/÷/g, '/')
                            .replace(/×/g, '*')
                            .replace(/−/g, '-')
                    );
                    result.textContent = output;
                    currentInput = output.toString();
                    calculation = '';
                } catch {
                    result.textContent = 'Error';
                    currentInput = '';
                    calculation = '';
                }
            } else {
                // Tambahkan simbol ke ekspresi
                calculation += `${currentInput} ${value} `;
                currentInput = '';
                result.textContent = value;
            }
        } else if (id === 'symbol2') {
            // Persentase
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                result.textContent = currentInput;
            }
        } else if (id === 'reset') {
            // Reset kalkulator
            currentInput = '';
            calculation = '';
            result.textContent = '0';
        }
    });
});
