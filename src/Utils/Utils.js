export const pausar = async (secs) => {
    return new Promise(resolve => setTimeout(resolve, secs*1000));
}