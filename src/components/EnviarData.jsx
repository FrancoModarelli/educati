
export default async function enviarData (url, data){
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const jsonResp = await resp.json();
    return jsonResp;
}

