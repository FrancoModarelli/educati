//tiempo de espera entre cada guardado en base
export default function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}