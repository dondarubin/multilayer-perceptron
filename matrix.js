class Matrix {
    constructor(numRows, numCols) {
        this.rows = numRows;
        this.cols = numCols;
        this.values = [];

        for (let row = 0; row < this.rows; row++) {
            this.values[row] = []
            for (let col = 0; col < this.cols; col++) {
                this.values[row][col] = 0;
            }
        }
    }

    randomize() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.values[row][col] = Math.random() * 2 - 1;
            }
        }
        return this;
    }

    add(obj) {
        // Прибавить к матрице вторую матрицу или число
        if (obj instanceof Matrix) {
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.values[row][col] += obj.values[row][col];
                }
            }
        } else {
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.values[row][col] += obj;
                }
            }
        }
    }

    static subtract(a, b) {
        // Вычисление разницы двух матриц
        let result = new Matrix(a.rows, a.cols);

        for (let row = 0; row < result.rows; row++) {
            for (let col = 0; col < result.cols; col++) {
                result.values[row][col] = a.values[row][col] - b.values[row][col];
            }
        }

        return result;
    }

    multiply(obj) {
        if (obj instanceof Matrix) {
            if (this.rows !== obj.rows || this.cols !== obj.cols) {
                throw Error('Incompatible matrices for element-wise multiplication')
            }
            // Умножение матрицы на матрицу
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.values[row][col] *= obj.values[row][col];
                }
            }
        } else {
            // Умножение матрицы на число
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.values[row][col] *= obj;
                }
            }
        }
        return this;
    }

    static multiply(a, b) {
        // Умножение матрицы на матрицу
        if (a.cols !== b.rows) {
            throw Error('COLS of 1 matrix must match ROWS of 2 matrix!')
        }

        let result = new Matrix(a.rows, b.cols)
        for (let row = 0; row < result.rows; row++) {
            for (let col = 0; col < result.cols; col++) {
                let sum = 0;
                for (let i = 0; i < a.cols; i++) {
                    sum += a.values[row][i] * b.values[i][col]
                }
                result.values[row][col] = sum;
            }
        }
        return result;
    }

    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows);

        for (let row = 0; row < matrix.rows; row++) {
            for (let col = 0; col < matrix.cols; col++) {
                result.values[col][row] = matrix.values[row][col];
            }
        }
        return result;
    }

    static map(matrix, func) {
        // Приминить ко всем элементам матрицы переданную функцию
        let result = new Matrix(matrix.rows, matrix.cols);

        for (let row = 0; row < matrix.rows; row++) {
            for (let col = 0; col < matrix.cols; col++) {
                let val = matrix.values[row][col];
                result.values[row][col] = func(val);
            }
        }
        return result;
    }

    map(func) {
        // Приминить ко всем элементам матрицы переданную функцию
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let val = this.values[row][col];
                this.values[row][col] = func(val, row, col);
            }
        }
    }

    static fromArray(inputArray) {
        // Из массива в одномерную матрицу
        if (!inputArray instanceof Array) {
            throw Error('Cannot create Matrix from non-Array type!');
        }
        let result = new Matrix(inputArray.length, 1);
        for (let i = 0; i < inputArray.length; i++) {
            result.values[i][0] = inputArray[i];
        }
        return result;
    }

    toArray() {
        // Преобразование в массив
        let arr = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                arr.push(this.values[row][col]);
            }
        }
        return arr;
    }

    print() {
        console.table(this.values)
    }

}

module.exports = {
    Matrix
}