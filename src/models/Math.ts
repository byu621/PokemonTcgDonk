const factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

export function combination(n: number, k: number) {
    return factorials[n] / (factorials[k] * factorials[n - k]);
}